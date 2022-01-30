<template>
  <div>
    <topnav
      v-if="this.$session.get('user_type') !== 'seller'"
      :display_categories="true"
      :searchbar="true"
    ></topnav>
    <topnav
      v-if="this.$session.get('user_type') === 'seller'"
      :searchbar="true"
      :display_categories="true"
      :landing="true"
    ></topnav>
    <spinner v-if="loading"></spinner>
    <div class="greyback"></div>
    <div class="shopbody">
      <div class="w3-container mopad">
        <div class="w3-card">
          <div class="w3-row backbg">
            <div class="glass_effect">
              <div class="w3-twothird" style="padding: 0px 20px">
                <p class="domain">{{ category }}</p>
                <p class="shopname_top">{{ list.shop_name }}</p>
                <p class="shoplocation">
                  <b-icon-geo-alt></b-icon-geo-alt> {{ list.address }}
                </p>
                <a :href="gmapLink"> Show on map</a>
                <p>
                  {{ Shopbio }}
                </p>
                <p class="shoplocation">
                  <b-icon-phone></b-icon-phone>{{ list.contact_no }}
                </p>
                <a
                  v-if="Array.isArray(list.location)"
                  :href="
                    '//www.google.com/maps/dir/21.193800,81.350900/' +
                    list.location[0].toPrecision(7) +
                    ',' +
                    list.location[1].toPrecision(7)
                  "
                  target="_blank"
                  style="text-decoration: none"
                >
                  <b-button variant="primary" style="float: left"
                    ><i class="fa fa-compass" aria-hidden="true"></i>
                    Directions</b-button
                  ></a
                >
              </div>
              <div class="w3-third" style="padding: 20px" v-if="loaded">
                <img
                  :src="image"
                  alt="..."
                  width="100%"
                  style="border-radius: 8px"
                />
              </div>
              <div class="w3-third" style="padding: 20px" v-else>
                <img src="../../assets/def.png" alt="..." width="100%" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div
          class="w3-card"
          style="background-color: #f7f7f7; margin-bottom: 30px"
        >
          <div class="w3-row">
            <div class="w3-twothird">
              <div>
                <b-card
                  no-body
                  style="
                    border: none !important;
                    font-size: 20px;
                    padding: 20px;
                  "
                >
                  <h3 class="typehead">Products</h3>

                  <b-row no-gutters class="product_row">
                    <template v-for="offer in list.offers">
                      <b-col
                        sm="3"
                        cols="6"
                        :key="offer.length"
                        v-if="
                          Math.floor(new Date().getTime() / 1000.0) <
                            offer.validity[1] &&
                          Math.floor(new Date().getTime() / 1000.0) >
                            offer.validity[0] &&
                          offer.quantity > 0 &&
                          offer.type === 'FIXED'
                        "
                      >
                        <router-link
                          :to="{
                            path: '/product_description',
                            query: {
                              seller: email,
                              offer_text: offer.offer_text,
                            },
                          }"
                        >
                          <div class="product_card">
                            <div>
                              <img
                                :src="offer.image_url[0]"
                                alt=""
                                class="product_img"
                              />
                            </div>
                            <div class="product_name">
                              <span
                                v-b-tooltip.hover
                                :title="offer.products + ' '"
                              >
                                {{ offer.products.toString() }}
                              </span>
                            </div>
                            <div class="shop_name">
                              {{ list.shop_name }}
                            </div>
                            <div class="disc">
                              {{
                                Math.round(
                                  ((offer.mrp - offer.offer_price) /
                                    offer.mrp) *
                                    100
                                )
                              }}% OFF
                            </div>
                            <div class="product_cost">
                              <i class="fa fa-inr" aria-hidden="true"></i>
                              {{ offer.offer_price }}
                              <del>
                                <i class="fa fa-inr" aria-hidden="true"></i>
                                {{ offer.mrp }}</del
                              >
                            </div>

                            <div
                              class="addtocart"
                              v-on:click="addToCart(offer.offer_text, email)"
                            >
                              <b-icon-heart mb-2></b-icon-heart>
                            </div>
                          </div>
                        </router-link>
                      </b-col>
                    </template>
                  </b-row>

                  <br />

                  <!-- ========================================================================== -->

                  <h3 class="typehead">Coupons</h3>

                  <b-row
                    v-for="offers in list.offers"
                    :key="offers.length"
                    style="padding: 10px"
                  >
                    <template>
                      <b-col
                        sm="4"
                        cols="6"
                        v-if="
                          Math.floor(new Date().getTime() / 1000.0) <
                            offers.validity[1] &&
                          Math.floor(new Date().getTime() / 1000.0) >
                            offers.validity[0] &&
                          offers.quantity > 0 &&
                          offers.type !== 'FIXED'
                        "
                      >
                        <div class="couponhome">
                          <imgstore
                            :email="list.seller_email"
                            :category="offers.category"
                          ></imgstore>
                          <div class="c2-back"></div>
                        </div>
                        <div
                          class="l-offer"
                          v-if="offers.type === 'ITEM_DISCOUNT'"
                        >
                          <span class="offno">{{ offers.value }}%</span> off on
                          <span
                            v-b-tooltip.hover
                            :title="offers.products + ' '"
                          >
                            <span
                              v-for="(prods, index1) in offers.products"
                              :key="prods.offer_text"
                            >
                              {{ offers.products[index1] }}
                              <span
                                v-if="
                                  index1 !=
                                  Object.keys(offers.products).length - 1
                                "
                                >,
                              </span>
                            </span>
                          </span>
                        </div>
                        <div class="l-offer" v-else>
                          <span class="offno"
                            >{{ offers.discount_percent }}%</span
                          >
                          off on Total Bill
                        </div>
                        <div class="shopname">
                          {{ list.shop_name }}

                          <!-- <button class="vshop">View Shop</button> -->
                        </div>
                      </b-col>
                    </template>
                  </b-row>
                </b-card>
              </div>
            </div>
            <div class="w3-third" style="padding: 20px">
              <div class="w3-card" style="padding: 20px; box-shadow: none">
                <h4 @click="sharePage()">
                  <i class="fa fa-share-alt" style="color: #008cff"></i>
                  Share this page
                </h4>
                <h3>
                  <i
                    @click="sharePage()"
                    class="fa fa-instagram"
                    style="color: #008cff; padding: 10px"
                  ></i>
                  <i
                    @click="sharePage()"
                    class="fa fa-facebook"
                    style="color: #008cff; padding: 10px"
                  ></i>
                  <i
                    @click="sharePage()"
                    class="fa fa-snapchat"
                    style="color: #008cff; padding: 10px"
                  ></i>
                  <i
                    @click="sharePage()"
                    class="fa fa-pinterest"
                    style="color: #008cff; padding: 10px"
                  ></i>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bottomnav></bottomnav>
    <sitefooter></sitefooter>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Bottomnav from "./bottomnav.vue";
import Spinner from "./spinner.vue";
import { BIconGeoAlt, BIconPhone } from "bootstrap-vue";
import Imgstore from "./imgstore.vue";

export default {
  components: {
    topnav,
    Sitefooter,
    Bottomnav,
    Spinner,
    BIconGeoAlt,
    BIconPhone,
    Imgstore,
  },
  props: {
    seller: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      list: [],
      image: "../../assets/def.png",
      email: "",
      Shopbio: "",
      gmapLink: null,
      category: "",
      imail: "",
      loaded: true,
    };
  },
  mounted() {
    this.loading = true;
    const url = BASE_URL + "/get_offers_by_shop/" + this.seller;
    axios
      .get(url)
      .then((response) => {
        this.list = response.data;
        this.email = this.list.seller_email;
        this.gmapLink = this.list.location;
        if (this.list.offers.length > 0) {
          this.category = this.list.offers[0].category;
        }
        console.log(this.list);
        this.getShopBio();
        this.getImage();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    getShopBio() {
      const url = BASE_URL + "/seller/bio?email=" + this.email;
      axios
        .get(url)
        .then((res) => {
          if (res.status === 200 && res.data.status === 200) {
            this.Shopbio = res.data.bio;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getImage() {
      const url = BASE_URL + "/seller_image/" + this.email;

      axios
        .get(url)
        .then((response) => {
          console.log(response);
          this.image = "../../assets/def.png";
          if (response.status === 200 && response.data.status === 200) {
            this.loaded = true;
            this.image = response.data.image;
          } else {
            this.loaded = false;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    sharePage() {
      if (navigator.share) {
        navigator
          .share({
            title: "Shop Coupons from Lemmmebuy.in",
            text: "Hey I found this amazing offer on Lemmebuy.in! You will love it.",
            url: window.location.href,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      }
    },
    addToCart(offer_text, email) {
      this.loading = true;
      if (localStorage.getItem("log") === "true") {
        const payload = {
          offer_text: offer_text,
          seller_email: email,
        };

        const accessToken = this.$session.get("token");
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const url = BASE_URL + "/cart";
        axios
          .post(url, payload, options)
          .then((response) => {
            if (response.data.status === 200) {
              alert(response.data.msg);
              this.$router.push("/cart");
            } else {
              alert("something went wrong");
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          })
          .finally(() => (this.loading = false));
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
/*  */
.backbg {
  background: rgba(255, 255, 255, 0.452);
}
.glass_effect {
  backdrop-filter: blur(10px);
  margin: 20px;
}
.typehead {
  padding: 10px 0px;
  border-bottom: 1px solid rgb(224, 224, 224);
}
a {
  text-decoration: none;
  color: #1a1a1a;
}

body {
  font-family: "Quicksand", sans-serif;
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
  font-size: 16px;
  color: rgb(44, 44, 44);
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
  color: #0072cf;
}
.vshop {
  font-size: 13px;
  color: #0072cf;
  background: none;
  text-transform: lowercase;
  font-weight: 600;
  border: 1px solid #0072cf;
  width: fit-content;
  border-radius: 3px;
  padding: 2px 14px;
  float: right;
  margin: 4px;
  transition: 0.4s ease-in-out;
}
.vshop:hover {
  color: white;
  background: #0072cf;
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
  border: 2px solid #0072cf;
  padding: 2px 3px;
  border-radius: 9px;
}
.c2-left {
  font-size: 14px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 600;
  background: #0072cf;
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
.filter {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  /* background-image: linear-gradient(#ff007700, #ff007700, #cc00ff); */
}
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
  overflow: hidden;
  -o-text-overflow: ellipsis; /* Opera < 11*/
  text-overflow: ellipsis; /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
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
/*  */
.product_cost {
  font-size: 20px;
  color: #303030;
}
.product_cost del {
  font-size: 14px;
  color: #a3a3a3;
}
.product_img {
  width: 100%;
}
.minval {
  float: right;
}
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
  color: rgb(94, 94, 94);
  font-weight: 600;
  margin: 15px 5px 5px 5px;
  font-size: 15px;
  text-transform: uppercase;
}
.shopname_top {
  color: rgb(0, 20, 63);
  font-weight: 700;
  font-size: 30px;
  line-height: 0.9;
  text-transform: capitalize;
}

.shoplocation {
  color: rgb(107, 107, 107);
  font-size: 18px;
  text-transform: capitalize;
}

@media screen and (max-width: 600px) {
  .card_validity {
    padding: 0px 22px;
  }
  .mopad {
    margin: -20px !important;
  }
}
</style>
