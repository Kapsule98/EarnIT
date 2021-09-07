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

    <div class="w3-row">
      <div class="showfilter">
        <p style="padding: 10px; float: left">
          Search By :

          <router-link to="/search?alloffers=true"
            ><input type="radio" id="torad2" /> product
          </router-link>
          |
          <router-link to="/search_by_shop?category=all"
            ><input type="radio" id="torad1" checked /> shop
          </router-link>
        </p>
        <button class="showbtn" v-on:click="showFilter()">
          category <i class="fa fa-angle-down"></i>
        </button>
      </div>
      <div class="filter">
        <div class="closeFilter">
          <button v-on:click="closeFilter()" class="closebtn">close</button>
        </div>
        <div class="w3-col m2">
          <div class="w3-container" style="border-right: 2px solid #cccccc">
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
                v-on:click="searchShop(items, index)"
              />
              <input
                v-else
                style="margin: 3px"
                type="checkbox"
                :id="'check' + index"
                v-on:click="searchShop(items, index)"
              />
              <label :for="'check' + index"> {{ items }}</label>
            </div>
            <br />
            <h5>Search by</h5>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="sby1"
                v-on:click="byFilter(1, 1)"
              />
              <label for="sby1"> Product</label>
            </div>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="sby2"
                v-on:click="byFilter(2, 2)"
              />
              <label for="sby2">Shop</label>
            </div>
            <br />
          </div>
        </div>
      </div>
      <div class="w3-col m10" id="Sproducts">
        <div class="w3-container">
          <div class="w3-row">
            <div
              class="w3-col m4"
              v-for="shop in list.sellers"
              :key="shop.length"
            >
              <div class="Scard">
                <div class="hovclass">
                  <div class="couponhome">
                    <div class="c2-back">
                      <img
                        src="https://source.unsplash.com/random"
                        width="100%"
                      />
                    </div>
                  </div>
                  <div class="l-offer">
                    <nav>{{ shop.display_name }}</nav>
                  </div>
                  <div class="shopname">
                    <div
                      class="s-address"
                      v-b-tooltip.hover
                      :title="shop.address"
                    >
                      {{ shop.address }}
                    </div>
                    <router-link
                      :to="{
                        path: '/seller',
                        query: {
                          seller: shop.email,
                        },
                      }"
                    >
                      <button class="vshop">View Shop</button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <bottomnav></bottomnav>
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
import Bottomnav from "./bottomnav.vue";
export default {
  components: { topnav, Sitefooter, Bottomnav },
  props: {
    category: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      list: [],
      allcategories: [],
    };
  },
  mounted() {
    this.getShops();
    document.getElementById("sby2").checked = true;
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
      document.getElementsByClassName("filter")[0].style.bottom = "0";
      document.getElementsByClassName("reduce")[0].style.display = "block";
    },
    closeFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = "-100%";
      document.getElementsByClassName("reduce")[0].style.display = "none";
    },
    searchShop(category, index) {
      this.$router.push("/search_by_shop?category=" + category);
      this.$router.go();
      this.getShops();
      for (var i = 0; i < 20; i++) {
        if (index !== i) {
          document.getElementById("check" + i).checked = false;
        } else {
          document.getElementById("check" + i).checked = true;
        }
      }
    },
    byFilter(p) {
      if (this.category === "all" && p === 1) {
        this.$router.push("/search?alloffers=true");
      } else {
        if (p === 1) {
          this.$router.push("/search?category=" + this.category);
        } else if (p === 2) {
          document.getElementById("sby2").checked = true;
        }
      }
    },
    getShops() {
      const offersurl = BASE_URL + "/get_shops/" + this.category;
      axios
        .get(offersurl)
        .then((response) => {
          this.list = response.data;
          console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
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
  padding-bottom: 30px;
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
  font-size: 14px;
  color: rgb(92, 92, 92);
  text-transform: capitalize;
}
.s-address {
  float: left;
  max-width: 65%; /* IE6 needs any width */
  overflow: hidden; /* "overflow" value must be different from  visible"*/
  -o-text-overflow: ellipsis; /* Opera < 11*/
  text-overflow: ellipsis; /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
  height: 20px;
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
  margin: 0px;
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
  widows: 100%;
  height: 220px;
  z-index: -1;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
/*
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
}*/
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
  }
  .closeFilter {
    display: block;
  }
}
</style>
