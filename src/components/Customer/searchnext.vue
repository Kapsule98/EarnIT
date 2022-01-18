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
            <!-- <div>
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
            </div> -->
            <div style="display: none">
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
            </div>
            <br />
            <div>
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
            <br />
            <div>
              <h5>Price Range</h5>

              <div style="display: block; line-height: 0.5">
                <input
                  style="margin: 3px"
                  type="radio"
                  id="range1"
                  name="prfil"
                  v-on:click="RangeFilter(0, 500)"
                />
                <label for="range1">less than Rs 499 </label>
              </div>

              <div style="display: block; line-height: 0.5">
                <input
                  style="margin: 3px"
                  type="radio"
                  id="range2"
                  name="prfil"
                  v-on:click="RangeFilter(500, 1000)"
                />
                <label for="range2">Rs 500 to Rs 999</label>
              </div>
              <div style="display: block; line-height: 0.5">
                <input
                  style="margin: 3px"
                  type="radio"
                  id="range3"
                  name="prfil"
                  v-on:click="RangeFilter(1000, 5000)"
                />
                <label for="range3">Rs 1000 to Rs 4999</label>
              </div>
              <div style="display: block; line-height: 0.5">
                <input
                  style="margin: 3px"
                  type="radio"
                  id="range4"
                  name="prfil"
                  v-on:click="RangeFilter(5000, Number.MAX_SAFE_INTEGER)"
                />
                <label for="range4">more than Rs 5000</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w3-col m10" id="Sproducts">
        <h2 style="padding: 10px 20px; color: grey">
          <b-icon-search></b-icon-search> Results for "{{ value }}"
        </h2>
        <b-tabs content-class="mt-3">
          <b-tab title="Products">
            <div class="w3-container">
              <b-row>
                <h3>Products</h3>
                <hr />
                <br />
                <br />
                <div v-if="productEmpty">
                  <b-container style="margin-bottom: 100px">
                    <b-card>
                      <br /><br />
                      <center>
                        <h1 style="color: grey">
                          No product found for "{{ value }}"!
                        </h1>
                        <br /><br />
                      </center>
                    </b-card>
                  </b-container>
                </div>
                <template v-for="offer in productSearch">
                  <b-col
                    sm="3"
                    cols="6"
                    :key="offer.length"
                    v-if="
                      offer.offer_price > prange1 &&
                      offer.offer_price < prange2 &&
                      Math.floor(new Date().getTime() / 1000.0) <
                        offer.validity[1] &&
                      Math.floor(new Date().getTime() / 1000.0) >
                        offer.validity[0] &&
                      offer.quantity > 0
                    "
                  >
                    <div class="Scard">
                      <!--  -->
                      <router-link
                        :to="{
                          path: '/product_description',
                          query: {
                            seller: offer.seller_email,
                            offer_text: offer.offer_text,
                          },
                        }"
                      >
                        <div class="product_card">
                          <div>
                            <img
                              :src="offer.image_url"
                              alt=""
                              class="product_img"
                            />
                          </div>
                          <div class="product_name">
                            <span
                              v-b-tooltip.hover
                              :title="offer.products + ' '"
                            >
                              <nav>
                                {{ offer.products.toString() }}
                              </nav>
                            </span>
                          </div>
                          <div class="shop_name">
                            {{ offer.seller_display_name }}
                          </div>
                          <div class="disc">
                            {{ Math.round(offer.discount_percent) }}% OFF
                          </div>
                          <div class="product_cost">
                            <i class="fa fa-inr" aria-hidden="true"></i>
                            {{ offer.offer_price }}
                            <del>
                              <i class="fa fa-inr" aria-hidden="true"></i>
                              {{ offer.mrp }}</del
                            >
                          </div>

                          <div class="addtocart">
                            <b-icon-cart3 mb-2></b-icon-cart3>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </b-col>
                </template>
              </b-row>
            </div>
          </b-tab>

          <b-tab title="Coupons">
            <div class="w3-container">
              <div class="w3-row">
                <br />
                <h3>Coupons</h3>
                <hr />
                <div v-if="couponEmpty">
                  <b-container style="margin-bottom: 100px">
                    <b-card>
                      <br /><br />
                      <center>
                        <h1 style="color: grey">
                          No coupon found for "{{ value }}"!
                        </h1>
                        <br /><br />
                      </center>
                    </b-card>
                  </b-container>
                </div>
                <div
                  class="w3-col m3"
                  v-for="coupon in couponSearch"
                  :key="coupon.length"
                >
                  <div
                    v-if="
                      coupon.discount_percent > discfilter &&
                      Math.floor(new Date().getTime() / 1000.0) <
                        coupon.validity[1] &&
                      Math.floor(new Date().getTime() / 1000.0) >
                        coupon.validity[0] &&
                      coupon.quantity > 0
                    "
                    class="Scard"
                  >
                    <div
                      v-if="
                        Math.floor(new Date().getTime() / 1000.0) <
                          coupon.validity[1] &&
                        Math.floor(new Date().getTime() / 1000.0) >
                          coupon.validity[0]
                      "
                      class="hovclass"
                    >
                      <router-link
                        :to="{
                          path: '/seller',
                          query: {
                            seller: coupon.seller_email,
                          },
                        }"
                      >
                        <div class="couponhome">
                          <div class="c2-back">
                            <imgstore
                              :email="coupon.seller_email"
                              :category="coupon.category"
                            ></imgstore>
                          </div>
                          <div class="c2-left">
                            {{ coupon.quantity }}
                            coupons left
                          </div>
                          <div class="c2-off"></div>

                          <div class="c2-shop"></div>
                        </div>

                        <div class="l-offer">
                          <nav>
                            <span class="offno"
                              >{{ coupon.discount_percent }}%</span
                            >
                            off on Total Bill
                          </nav>
                        </div>
                        <div
                          class="shopname"
                          v-b-tooltip.hover
                          :title="coupon.seller_display_name"
                        >
                          {{ coupon.seller_display_name }}
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab>
            <template #title>
              <div>Sellers</div>
            </template>
            <div class="w3-container">
              <div class="w3-row">
                <h3>Sellers</h3>
                <hr />
                <div v-if="sellerEmpty">
                  <b-container style="margin-bottom: 100px">
                    <b-card>
                      <br /><br />
                      <center>
                        <h1 style="color: grey">
                          No seller found for "{{ value }}"!
                        </h1>
                        <br /><br />
                      </center>
                    </b-card>
                  </b-container>
                </div>
                <div
                  class="w3-col m3 s6"
                  v-for="shop in sellerSearch"
                  :key="shop.length"
                >
                  <router-link
                    :to="{
                      path: '/seller',
                      query: {
                        seller: shop.email,
                      },
                    }"
                  >
                    <div class="Scard">
                      <div class="hovclass">
                        <div class="couponhome">
                          <div class="c2-back">
                            <imgstore
                              :email="shop.email"
                              :category="shop.category"
                            ></imgstore>
                          </div>
                        </div>
                        <div
                          class="l-offer"
                          v-b-tooltip.hover
                          :title="shop.name"
                        >
                          <nav>{{ shop.name }}</nav>
                        </div>
                        <div class="shopname">
                          <div
                            class="s-address"
                            v-b-tooltip.hover
                            :title="shop.address"
                          >
                            {{ shop.address }}
                          </div>

                          <!-- <button class="vshop">View Shop</button> -->
                        </div>
                      </div>
                    </div>
                  </router-link>
                </div>
                <!-- <div id="nresult"></div> -->
              </div>
            </div>
          </b-tab>
        </b-tabs>
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
import { BIconSearch } from "bootstrap-vue";

export default {
  components: {
    topnav,
    Sitefooter,
    Bottomnav,
    Imgstore,
    Spinner,
    BIconSearch,
  },
  props: {
    category: {
      type: String,
      default: null,
    },
    offer_type: {
      type: String,
      default: null,
    },
    value: {
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
      shopcat: "",
      componentKey: 0,
      prange1: 0,
      prange2: Number.MAX_SAFE_INTEGER,
      sellerSearch: [],
      productSearch: [],
      couponSearch: [],
      offershop: [],
      couponEmpty: false,
      sellerEmpty: false,
      productEmpty: false,
    };
  },

  mounted() {
    this.productSearch = [];
    this.sellerSearch = [];
    this.couponSearch = [];
    document.getElementById("result").innerHTML = "";
    var filter = this.value.toUpperCase();
    var nsdata = JSON.parse(sessionStorage.getItem("get_all_offers"));
    var sndata = JSON.parse(sessionStorage.getItem("shops"));

    for (var i = 0; i < nsdata.active_offers.length; i++) {
      var name = "";
      var url = "";
      var type = "";
      if (nsdata.active_offers[i].type === "FIXED") {
        name = nsdata.active_offers[i].products[0];
        url =
          "/product_description?seller=" +
          nsdata.active_offers[i].seller_email +
          "&offer_text=" +
          nsdata.active_offers[i].offer_text;
      }

      if (name.toUpperCase().indexOf(filter) > -1) {
        this.productSearch.push({
          seller_email: nsdata.active_offers[i].seller_email,
          offer_text: nsdata.active_offers[i].offer_text,
          seller_display_name: nsdata.active_offers[i].shop_name,
          offer_price: nsdata.active_offers[i].offer_price,
          mrp: nsdata.active_offers[i].mrp,
          validity: nsdata.active_offers[i].validity,
          type: nsdata.active_offers[i].type,
          products: nsdata.active_offers[i].products,
          discount_percent: nsdata.active_offers[i].discount_percent,
          image_url: nsdata.active_offers[i].image_url,
          quantity: nsdata.active_offers[i].quantity,
        });
        document.getElementById("result").innerHTML +=
          "<div class='seresw'><a href='" +
          url +
          "' class='seres'>" +
          name +
          " by " +
          nsdata.active_offers[i].seller_display_name +
          " in " +
          nsdata.active_offers[i].category +
          type +
          "</a></a><div class='stype'>in Offer</div></div></div>" +
          "<br>";
      }
    }
    for (var k = 0; k < sndata.sellers.length; k++) {
      var sname = sndata.sellers[k].shop_name;

      for (var y = 0; y < sndata.sellers[k].products.length; y++) {
        var pname = sndata.sellers[k].products[y];
        if (pname.toUpperCase().indexOf(filter) > -1) {
          for (var e = 0; e < nsdata.active_offers.length; e++) {
            if (
              sndata.sellers[k].email === nsdata.active_offers[e].seller_email
            ) {
              var check = {
                seller_email: nsdata.active_offers[e].seller_email,
                seller_display_name: nsdata.active_offers[e].shop_name,
                validity: nsdata.active_offers[e].validity,
                discount_percent: nsdata.active_offers[e].discount_percent,
                image_url: nsdata.active_offers[e].image_url,
                quantity: nsdata.active_offers[e].quantity,
                category: nsdata.active_offers[e].category,
              };

              if (
                nsdata.active_offers[e].type === "BILL_DISCOUNT" &&
                JSON.stringify(this.couponSearch).includes(
                  JSON.stringify(check)
                ) === false
              ) {
                this.couponSearch.push(check);
              }
            }
          }
        }
      }
      if (sname.toUpperCase().indexOf(filter) > -1) {
        this.sellerSearch.push({
          email: sndata.sellers[k].email,
          name: sndata.sellers[k].shop_name,
          address: sndata.sellers[k].address,
          category: sndata.sellers[k].category,
        });
      }
    }

    if (this.couponSearch.length === 0) {
      this.couponEmpty = true;
    }
    if (this.productSearch.length === 0) {
      this.productEmpty = true;
    }
    if (this.sellerSearch.length === 0) {
      this.sellerEmpty = true;
    }

    this.getAllOffers();
    document.getElementById("sby1").checked = true;
    if ("categories" in sessionStorage) {
      var sdata = JSON.parse(sessionStorage.getItem("categories"));

      this.allcategories = sdata.categories;
    } else {
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
    }
  },
  watch: {
    value: function () {
      this.productSearch = [];
      this.sellerSearch = [];
      this.couponSearch = [];
      this.productEmpty = false;
      this.sellerEmpty = false;
      this.couponEmpty = false;
      document.getElementById("result").innerHTML = "";
      var filter = this.value.toUpperCase();
      var nsdata = JSON.parse(sessionStorage.getItem("get_all_offers"));
      var sndata = JSON.parse(sessionStorage.getItem("shops"));
      for (var i = 0; i < nsdata.active_offers.length; i++) {
        var name = "";
        var url = "";
        var type = "";
        if (nsdata.active_offers[i].type === "FIXED") {
          name = nsdata.active_offers[i].products[0];
          url =
            "/product_description?seller=" +
            nsdata.active_offers[i].seller_email +
            "&offer_text=" +
            nsdata.active_offers[i].offer_text;
        }

        if (name.toUpperCase().indexOf(filter) > -1) {
          this.productSearch.push({
            seller_email: nsdata.active_offers[i].seller_email,
            offer_text: nsdata.active_offers[i].offer_text,
            seller_display_name: nsdata.active_offers[i].shop_name,
            offer_price: nsdata.active_offers[i].offer_price,
            mrp: nsdata.active_offers[i].mrp,
            validity: nsdata.active_offers[i].validity,
            type: nsdata.active_offers[i].type,
            products: nsdata.active_offers[i].products,
            discount_percent: nsdata.active_offers[i].discount_percent,
            image_url: nsdata.active_offers[i].image_url,
            quantity: nsdata.active_offers[i].quantity,
          });
          document.getElementById("result").innerHTML +=
            "<div class='seresw'><a href='" +
            url +
            "' class='seres'>" +
            name +
            " by " +
            nsdata.active_offers[i].seller_display_name +
            " in " +
            nsdata.active_offers[i].category +
            type +
            "</a></a><div class='stype'>in Offer</div></div></div>" +
            "<br>";
        }
      }
      for (var k = 0; k < sndata.sellers.length; k++) {
        var sname = sndata.sellers[k].shop_name;

        for (var y = 0; y < sndata.sellers[k].products.length; y++) {
          var pname = sndata.sellers[k].products[y];
          if (pname.toUpperCase().indexOf(filter) > -1) {
            for (var e = 0; e < nsdata.active_offers.length; e++) {
              if (
                sndata.sellers[k].email === nsdata.active_offers[e].seller_email
              ) {
                if (nsdata.active_offers[e].type === "BILL_DISCOUNT") {
                  this.couponSearch.push({
                    seller_email: nsdata.active_offers[e].seller_email,
                    seller_display_name: nsdata.active_offers[e].shop_name,
                    validity: nsdata.active_offers[e].validity,
                    discount_percent: nsdata.active_offers[e].discount_percent,
                    image_url: nsdata.active_offers[e].image_url,
                    quantity: nsdata.active_offers[e].quantity,
                    category: nsdata.active_offers[e].category,
                  });
                }
              }
            }
          }
        }
        if (sname.toUpperCase().indexOf(filter) > -1) {
          this.sellerSearch.push({
            email: sndata.sellers[k].email,
            name: sndata.sellers[k].shop_name,
            address: sndata.sellers[k].address,
          });
        }
      }
      if (this.couponSearch.length === 0) {
        this.couponEmpty = true;
      }
      if (this.productSearch.length === 0) {
        this.productEmpty = true;
      }
      if (this.sellerSearch.length === 0) {
        this.sellerEmpty = true;
      }
    },
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
      this.componentKey += 1;
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
    RangeFilter(min, max) {
      this.prange1 = min;
      this.prange2 = max;
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
      if ("get_all_offers" in sessionStorage) {
        var sdata = JSON.parse(sessionStorage.getItem("get_all_offers"));
        this.list = sdata;
        var discount = [];
        for (var i = 0; i < this.list.active_offers.length; i++) {
          discount[i] = this.list.active_offers[i].discount_percent;
        }
        var mapped = discount.map(function (el, i) {
          return { index: i, value: el };
        });

        mapped.sort(function (a, b) {
          return b.value - a.value;
        });

        var result = mapped.map(function (el) {
          return discount[el.index];
        });
        this.result = result;
        this.mapped = mapped;
      } else {
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
            var mapped = discount.map(function (el, i) {
              return { index: i, value: el };
            });

            mapped.sort(function (a, b) {
              return b.value - a.value;
            });

            var result = mapped.map(function (el) {
              return discount[el.index];
            });
            this.result = result;
            this.mapped = mapped;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: white;
}
.viewall {
  width: 200px;
  margin: 10px auto;
  background: #008cff;
  color: white;
  padding: 8px;
  text-align: center;
  border-radius: 28px;
  cursor: pointer;
}
.viewall:hover {
  opacity: 0.5;
}
.bbot {
  width: 100%;
  height: 4px;
  background: rgb(148, 148, 148);
  margin: 20px 0px;
}
a {
  text-decoration: none;
}
body {
  font-family: "Quicksand", sans-serif;
}
.heading {
  width: 100%;
  display: flex;
  margin: 10px 0;
  margin-top: 0px;
  font-weight: 900;
  padding: 10px;
  font-size: 25px;
  border-bottom: 1px solid #4242423f;
  font-family: "Roboto", sans-serif;
  background: white;
  border-left: 10px solid #008cff;
}
.coupons {
  background: url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  position: relative;
  width: 100%;
  height: 200px;
  /* background: #f0e8d5; */
  /* border-radius: 12px; */
  margin-bottom: 20px;
}

.disc {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #008cff;
  color: white;
  font-size: 16px;
  font-weight: 900;
  text-align: center;
  line-height: 1.5;
  padding: 5px;
  z-index: 100;
}
/* .filter {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  background-image: linear-gradient(#ff007700, #ff007700, #cc00ff);
} */
.shop_name {
  line-height: 1;
  font-weight: 600;
  color: #858585;
}
.offer {
  position: absolute;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  color: white;
  bottom: 10px;
  left: 10px;
  text-shadow: 2px 2px #000000c5;
}

@media screen and (max-width: 768px) {
  .coupons {
    background: url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80");
    background-size: cover;
    position: relative;
    width: 100%;
    height: 200px;
    /* background: #f0e8d5; */
    /* border-radius: 12px; */
    margin-bottom: 20px;
  }
  /* 
  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 12px;
    background-image: linear-gradient(#ff007700, #ff007700, #cc00ff);
  } */

  .offer {
    position: absolute;
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    color: white;
    bottom: 10px;
    left: 10px;
    text-shadow: 2px 2px #000000c5;
  }
  .heading {
    width: 100%;
    display: flex;
    margin: 20px 0%;
    margin-top: 20px;
    font-weight: 900;
    padding: 20px;
    font-size: 25px;
    border-bottom: 1px solid #4242423f;
    font-family: "Roboto", sans-serif;
    background: white;
  }
}
.ad_img_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 0px;
  overflow: hidden;
  border-radius: 16px;
  text-align: center;
}
.ad_img {
  border-radius: 16px;
  z-index: -1;
  height: 100%;
}

.img_fill {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  border-radius: 16px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(87, 68, 7));
}
.fill_text {
  position: absolute;
  height: 50%;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  font-size: 35px;
  font-weight: 900;
  padding: 10px;
  z-index: 101;
}
.gobutton {
  position: absolute;
  bottom: 20px;
  right: 10px;
  padding: 5px 7px;
  background: #008cff;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  width: fit-content;
}
.product_card {
  position: relative;
  background-color: #fff;
  overflow: hidden;
  /* max-height: 320px; */
  padding: 25px 15px 20px 15px;
  width: 100%;
  /* box-shadow: 0px 2px 6px 4px rgba(0, 0, 0, 0.062); */
  transition: 0.3s ease-in-out;
}

.product_card:hover {
  transform: scale(1.1);
}
.product_img {
  width: 100%;
  border-radius: 8px;
}

@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap");

.product_name {
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: black;
  line-height: 1.2;
  padding: 10px 0px;
  height: 50px;
  text-overflow: ellipsis;
  overflow: hidden;

  white-space: nowrap;
}
.product_cost {
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  color: #008cff;
  font-weight: 900;
  float: left;
}
.product_cost del {
  font-size: 14px;
  color: rgb(87, 87, 87);
}
.addtocart {
  float: right;
  padding: 0px 0px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 900;
  width: fit-content;
  color: #170057;
  transform: scale(0.8);
}
.disc {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: rgb(255, 29, 67);
  color: white;
  font-size: 16px;
  font-weight: 900;
  text-align: center;
  line-height: 1.5;
  padding: 5px;
  z-index: 100;
  transform: scale(0.7);
}
.couponhome {
  position: relative;
  width: 90%;
  height: 140px;
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
  white-space: nowrap;
  width: 90%; /* IE6 needs any width */
  text-overflow: ellipsis;
  overflow: hidden;

  white-space: nowrap;
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
  text-overflow: ellipsis;
  overflow: hidden;

  white-space: nowrap;
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
  height: 140px;
  z-index: -1;
  background: url("../../assets/dribbble-loader-green.gif");
  background-size: cover;

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
