<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url3="/account"
      url4="/cart"
      url5="/login"
      url6="/"
      :productsearch="true"
    ></topnav>
    <!--<allcatrgories></allcatrgories>-->

    <div class="w3-row">
      <div class="showfilter">
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
            <h3>Filters</h3>

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
        <div v-for="offer in mapped" :key="offer.length" class="Scard">
          <div
            v-if="
              (list.active_offers[offer.index].category === category &&
                offer.value > discfilter) ||
              category === null
            "
          >
            <span>
              <div class="couponcard">
                <div class="w3-row">
                  <div class="w3-col imgcol">
                    <div
                      v-if="
                        list.active_offers[offer.index].category === 'Health'
                      "
                    >
                      <img
                        src="../../assets/health.jpg"
                        class="thumbnail"
                        alt=""
                      />
                    </div>
                    <div
                      v-else-if="
                        list.active_offers[offer.index].category === 'Fashion'
                      "
                    >
                      <img
                        src="../../assets/fashion.jpg"
                        class="thumbnail"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="w3-col contentcol" style="width: 80%">
                    <div class="card_remaining">
                      {{ list.active_offers[offer.index].quantity }} left!
                    </div>

                    <div class="card_item">
                      {{ offer.value }}% off on

                      <name>
                        {{ list.active_offers[offer.index].products[0] }}
                      </name>
                    </div>

                    <div class="w3-row">
                      <div class="w3-third">
                        <div class="card_leftcoupons">
                          {{ list.active_offers[offer.index].quantity }} Coupons
                          Left
                        </div>
                      </div>
                      <div class="w3-third">
                        <div class="card_validity">
                          valid till 4 jun 2021
                          <i class="fa fa-info-circle"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="reduce"></div>
    <sitefooter></sitefooter>
  </div>
</template>



<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
//import allcatrgories from "./allcategories.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: { topnav, Sitefooter },
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
    };
  },
  mounted() {
    this.getAllOffers();
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
    showFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = 0;
      document.getElementsByClassName("reduce")[0].style.display = "block";
    },
    closeFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = "-100%";
      document.getElementsByClassName("reduce")[0].style.display = "none";
    },
    searchCategory(category, index) {
      this.$router.push("/search?category=" + category);
      for (var i = 0; i < 20; i++) {
        if (index !== i) {
          document.getElementById("check" + i).checked = false;
        }
      }
    },
    priceFilter(discount, id) {
      this.discfilter = discount;
      for (var i = 1; i < 5; i++) {
        if (id !== i) {
          document.getElementById("disc" + i).checked = false;
        }
      }
    },
    getAllOffers() {
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
        });
    },
  },
};
</script>
<style scoped>
.botbtn {
  background: #008cff;
  width: fit-content;
  color: white;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 18px;
  float: right;
  border: none;
  margin: 20px;
  font-weight: 500;
}
.greyback {
  position: fixed;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  background: rgb(241, 248, 248);
  z-index: -100;
}
.domain {
  color: rgb(196, 196, 196);
  font-weight: 600;
  margin: 15px 5px 5px 5px;
  font-size: 15px;
  text-transform: uppercase;
}
.shopname {
  color: teal;
  font-weight: 700;
  font-size: 30px;
  line-height: 0.9;
}

.shoplocation {
  color: rgb(151, 151, 151);
  font-size: 18px;
}
.couponcard {
  width: 95%;
  padding: 20px;
  margin: 10px auto;
  border-bottom: 1px solid rgb(214, 214, 214);
}

.card_item {
  font-size: 20px;
  color: teal;
  float: left;
  margin-top: -5px;
  padding-left: 20px;
  width: fit-content;
  display: block;
  font-weight: 400;
}
.card_discount {
  padding: 20px;
  font-size: 20px;
  color: rgb(49, 49, 49);
}
.card_validity {
  padding: 25px;
  font-size: 14px;
  color: rgb(85, 85, 85);
}
.card_leftcoupons {
  padding: 20px;
  font-size: 18px;
  color: rgb(61, 61, 61);
}
.card_remaining {
  font-size: 15px;
  color: rgb(252, 88, 88);
  display: block;
  width: 100%;
  padding: 10px 20px;
}
.thumbnail {
  width: 100px;
  border-radius: 50%;
}
.imgcol {
  width: 12%;
}
.contentcol {
  width: 90%;
}
.closeFilter {
  position: absolute;
  top: -50px;
  left: 0;
  display: none;
  width: 100%;
  margin: 0;
  height: 50px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px 25px 0px 0px;
  border-bottom: 1px solid rgb(185, 185, 185);
}
.showfilter {
  display: none;
  margin-top: -30px;
  height: 50px;
  border-bottom: 1px solid rgb(185, 185, 185);
  width: 100%;
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
  }
  .closeFilter {
    display: block;
  }
}
</style>
