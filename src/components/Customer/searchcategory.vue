<template>
  <div>
    <topnav
      v-if="this.$session.get('user_type') !== 'seller'"
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :display_categories="true"
      :productsearch="true"
    ></topnav>
    <topnav
      v-if="this.$session.get('user_type') === 'seller'"
      link3="Account"
      link4="Dashboard"
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/account"
      url4="/verifycoupon"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :searchbar="true"
      :display_categories="true"
      :landing="true"
    ></topnav>
    <!--<allcatrgories></allcatrgories>-->
    <spinner v-if="loading"></spinner>
    <div class="w3-row">
      <div class="showfilter">
        <p style="padding: 10px; float: left">
          Search By :

          <router-link to="/search?alloffers=true"
            ><input type="radio" id="torad2" checked /> product
          </router-link>
          |
          <router-link to="/search_by_shop?category=all"
            ><input type="radio" id="torad1" /> shop
          </router-link>
        </p>
        <button class="showbtn" v-on:click="showFilter()">
          Filter <i class="fa fa-angle-down"></i>
        </button>
      </div>
      <div class="filter">
        <div class="closeFilter">
          <button v-on:click="closeFilter()" class="closebtn">close</button>
        </div>
        <div class="w3-col m2">
          <div class="w3-container" style="border-right: 2px solid #cccccc">
            <h3>
              Filters
              <button v-on:click="clearFilter()" class="clear">
                <u>clear filters</u>
              </button>
            </h3>

            <h5>Category</h5>

            <div
              style="display: block; line-height: 0.5"
              v-for="(items, index) in allcategories"
              :key="items"
            >
              <input
                v-if="items === category"
                style="margin: 3px"
                type="checkbox"
                checked="true"
                :id="'check' + index"
                v-on:click="searchCategory(items, index)"
              />
              <input
                v-else
                style="margin: 3px"
                type="checkbox"
                :id="'check' + index"
                v-on:click="searchCategory(items, index)"
              />
              <label :for="'check' + index"> {{ items }}</label>
            </div>
            <br />
            <h5>Search by :</h5>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="sby1"
                v-on:click="byFilter(1)"
              />
              <label for="sby1"> Product</label>
            </div>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="sby2"
                v-on:click="byFilter(2)"
              />
              <label for="sby2">Seller</label>
            </div>
            <br />
            <h5>Discount</h5>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="disc1"
                v-on:click="priceFilter(10, 1)"
              />
              <label for="disc1"> 10% or more</label>
            </div>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="disc2"
                v-on:click="priceFilter(25, 2)"
              />
              <label for="disc2"> 25% or more</label>
            </div>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="disc3"
                v-on:click="priceFilter(40, 3)"
              />
              <label for="disc3"> 40% or more</label>
            </div>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="disc4"
                v-on:click="priceFilter(50, 4)"
              />
              <label for="disc4"> 50% or more</label>
            </div>
          </div>
        </div>
      </div>
      <div class="w3-col m10" id="Sproducts">
        <div class="w3-container">
          <div class="w3-row">
            <div class="w3-col m4" v-for="offer in mapped" :key="offer.length">
              <div
                v-if="
                  (list.active_offers[offer.index].category === category &&
                    offer.value > discfilter) ||
                  (category === null && offer.value > discfilter)
                "
                class="Scard"
              >
                <div
                  v-if="
                    Math.floor(new Date().getTime() / 1000.0) <
                      list.active_offers[offer.index].validity[1] &&
                    Math.floor(new Date().getTime() / 1000.0) >
                      list.active_offers[offer.index].validity[0]
                  "
                  class="hovclass"
                >
                  <router-link
                    :to="{
                      path: '/seller',
                      query: {
                        seller: list.active_offers[offer.index].seller_email,
                      },
                    }"
                  >
                    <div class="couponhome">
                      <div class="c2-back">
                        <imgstore
                          :email="list.active_offers[offer.index].seller_email"
                        ></imgstore>
                      </div>
                      <div class="c2-left">
                        {{ list.active_offers[offer.index].quantity }} coupons
                        left
                      </div>
                      <div class="c2-off"></div>

                      <div class="c2-shop"><!--{{ shop_name }}--></div>
                    </div>
                    <div
                      class="l-offer"
                      v-if="
                        list.active_offers[offer.index].type === 'ITEM_DISCOUNT'
                      "
                    >
                      <nav
                        v-b-tooltip.hover
                        :title="list.active_offers[offer.index].products + ' '"
                      >
                        <span class="offno">{{ offer.value }}%</span> off on

                        <span
                          v-for="(prods, index3) in list.active_offers[
                            offer.index
                          ].products"
                          :key="prods.offer_text"
                        >
                          {{ list.active_offers[offer.index].products[index3] }}

                          <span
                            v-if="
                              index3 !=
                              Object.keys(
                                list.active_offers[offer.index].products
                              ).length -
                                1
                            "
                            >,
                          </span>
                        </span>
                      </nav>
                    </div>
                    <div class="l-offer" v-else>
                      <nav>
                        <span class="offno">{{ offer.value }}%</span> off on
                        Total Bill
                      </nav>
                    </div>
                    <div class="shopname">
                      {{ list.active_offers[offer.index].seller_display_name }}

                      <button class="vshop">View Shop</button>
                    </div>
                    <div class="c2-validity">
                      offer valid till
                      {{
                        moment(
                          list.active_offers[offer.index].validity[1] * 1000
                        ).format("DD-MM-YYYY")
                      }}
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="reduce"></div>
    <bottomnav></bottomnav>
    <sitefooter></sitefooter>
  </div>
</template>



<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
//import allcatrgories from "./allcategories.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Bottomnav from "./bottomnav.vue";
import Imgstore from "./imgstore.vue";
import Spinner from "./spinner.vue";
export default {
  components: { topnav, Sitefooter, Bottomnav, Imgstore, Spinner },
  props: {
    category: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      list: [],
      result: [],
      mapped: [],
      allcategories: [],
      discfilter: 0,
      loading: false,
    };
  },
  mounted() {
    this.getAllOffers();
    document.getElementById("sby1").checked = true;
    const offersurl = BASE_URL + "/categories";
    let JWTToken = this.$session.get("token");
    axios
      .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
      .then((response) => {
        this.allcategories = response.data.categories;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    clearFilter() {
      this.$router.push("/search?alloffers=true");
      this.$router.go();
    },
    showFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = "0";
      document.getElementsByClassName("closeFilter")[0].style.bottom = "60%";
      document.getElementsByClassName("reduce")[0].style.display = "block";
    },
    closeFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = "-100%";
      document.getElementsByClassName("closeFilter")[0].style.bottom = "-100%";
      document.getElementsByClassName("reduce")[0].style.display = "none";
    },
    searchCategory(category, index) {
      this.$router.push("/search?category=" + category);
      for (var i = 0; i < 20; i++) {
        if (index !== i) {
          document.getElementById("check" + i).checked = false;
        } else {
          document.getElementById("check" + i).checked = true;
        }
      }
    },
    priceFilter(discount, id) {
      this.discfilter = discount - 1;
      for (var i = 1; i < 5; i++) {
        if (id !== i) {
          document.getElementById("disc" + i).checked = false;
        } else {
          document.getElementById("disc" + i).checked = true;
        }
      }
    },
    byFilter(p) {
      if (this.category === null && p !== 1) {
        this.$router.push("/search_by_shop?category=all");
      } else {
        if (p === 2) {
          this.$router.push("/search_by_shop?category=" + this.category);
        } else if (p === 1) {
          document.getElementById("sby1").checked = true;
        }
      }
    },

    getAllOffers() {
      this.loading = true;
      const offersurl = BASE_URL + "/get_all_offers";
      let JWTToken = this.$session.get("token");
      axios
        .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.list = response.data;
          var discount = [];
          for (var i = 0; i < this.list.active_offers.length; i++) {
            discount[i] = this.list.active_offers[i].discount_percent;
          }
          // the array to be sorted

          // temporary array holds objects with position and sort-value
          var mapped = discount.map(function (el, i) {
            return { index: i, value: el };
          });

          // sorting the mapped array containing the reduced values
          mapped.sort(function (a, b) {
            return b.value - a.value;
          });

          // container for the resulting order
          var result = mapped.map(function (el) {
            return discount[el.index];
          });
          this.result = result;
          this.mapped = mapped;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style scoped>
.couponhome {
  position: relative;
  width: 90%;
  height: 220px;
  margin: 10px auto 0px auto;
  background: rgba(0, 0, 0, 0.082);
  overflow: hidden;
  border-radius: 12px;
}
.hovclass {
  border: none;
  transition: 0.4s ease-in-out;
  border-radius: 12px;
  padding-bottom: 10px;
  height: fit-content;
  margin: 10px 0px;
}
.hovclass:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.shopname {
  margin-left: 5%;
  margin-right: 5%;
  padding: 10px;
  font-size: 20px;
  color: rgb(92, 92, 92);
  text-transform: capitalize;
}
.l-offer {
  margin-left: 5%;
  margin-right: 5%;
  padding: 10px;
  font-size: 17px;
  text-transform: capitalize;
  background-color: rgba(175, 0, 0, 0);
  backdrop-filter: blur(0px);
  color: rgb(46, 46, 46);
  height: 50px;
  border-bottom: 2px solid rgb(212, 212, 212);
  white-space: nowrap;
  width: 90%; /* IE6 needs any width */
  overflow: hidden; /* "overflow" value must be different from  visible"*/
  -o-text-overflow: ellipsis; /* Opera < 11*/
  text-overflow: ellipsis; /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
}
.offno {
  font-size: 22px;
  font-weight: 700;
}
.vshop {
  font-size: 13px;
  color: #0077ff;
  background: none;
  text-transform: lowercase;
  font-weight: 600;
  border: 1px solid#0077ff;
  width: fit-content;
  border-radius: 3px;
  padding: 2px 14px;
  float: right;
  margin: 4px;
  transition: 0.4s ease-in-out;
}
.vshop:hover {
  color: white;
  background: #0077ff;
}
.c2-off {
  font-size: 22px;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  font-weight: 900;
  height: 80px;
  width: 100%;
  margin-top: 20px;
  display: block;
}
.c2-validity {
  margin-left: 5%;
  margin-right: 5%;
  padding: 10px;
  font-size: 14px;
  color: rgb(172, 172, 172);
  text-transform: lowercase;
  font-weight: 400;
  display: block;
}
.c2-shop {
  font-size: 17px;
  color: rgb(255, 255, 255);
  font-weight: 400;
  display: block;
  padding: 10px;
  border-bottom: none;
}
.c2-location {
  top: 5px;
  left: 5px;
  position: absolute;
  font-size: 11px;
  color: rgb(0, 0, 0);
  text-transform: lowercase;
  font-weight: 400;
  display: block;
  background: white;
  border: 2px solid rgb(0, 162, 255);
  padding: 2px 3px;
  border-radius: 9px;
}
.c2-left {
  font-size: 12px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 600;
  background: #0077ff;
  width: fit-content;
  border-radius: 0px 3px 3px 0px;
  padding: 2px 14px;
  float: left;
  margin: 20px 10px 10px -2px;
}
.c2-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 220px;
  z-index: -1;
  background: url("../../assets/dribbble-loader-green.gif");
  background-position: center;
  background-repeat: no-repeat;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}

.showfilter {
  display: none;
  margin-top: -30px;
  height: 50px;
  border-bottom: 1px solid rgb(185, 185, 185);
  width: 100%;
}
.closeFilter {
  display: none;
}
.showbtn {
  background: none;
  border: none;
  border-left: 1px solid rgb(185, 185, 185);
  height: 100%;
  width: fit-content;
  text-align: center;
  float: right;
  font-size: 15px;
  color: teal;
}
.closebtn {
  background: none;
  border: none;
  float: right;
  color: teal;
  font-size: 15px;
  text-transform: capitalize;
  height: 50px;
}
.reduce {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.425);
  z-index: 1999;
}
.clear {
  color: #008cff;
  border: none;
  font-size: 12px;
  padding: 2px 4px;
  background: none;
}

@media screen and (min-width: 600px) {
  .filter {
    position: -webkit-sticky;
    position: sticky;
    top: 40px;
    z-index: 0;
  }
}
@media screen and (max-width: 600px) {
  .showfilter {
    display: block;
  }
  .card_validity {
    padding: 0px 22px;
  }
  .mopad {
    margin: -20px !important;
  }
  .couponcard {
    width: 100%;
    padding: 10px;
    margin: 0px auto;
    border-bottom: 1px solid rgb(214, 214, 214);
  }
  .thumbnail {
    width: 80px;
    border-radius: 50%;
    margin-top: 30px;
  }
  .imgcol {
    width: 20%;
  }
  .contentcol {
    width: 8%;
  }
  .filter {
    width: 100%;
    position: fixed;
    background: white;
    height: 60%;
    bottom: -100%;
    transition: 0.5s;
    z-index: 2000;
    overflow-y: scroll;
    padding-bottom: 100px;
  }

  .closeFilter {
    display: block;
    position: fixed;
    bottom: -100%;
    left: 0;
    width: 100%;
    margin: 0;
    height: 50px;
    transition: 0.5s;
    background-color: rgb(255, 255, 255);
    border-radius: 25px 25px 0px 0px;
    border-bottom: 1px solid rgb(185, 185, 185);
  }
}
</style>
