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
      :searchbar="true"
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
    <spinner v-if="loading"></spinner>
    <div class="greyback"></div>
    <div class="w3-container mopad">
      <div class="w3-card" style="background: white">
        <div class="w3-row">
          <div class="w3-twothird" style="padding: 20px">
            <p class="domain">{{ list.category }}</p>
            <p class="shopname">{{ list.shop_name }}</p>
            <p class="shoplocation">
              <i class="fa fa-map-marker"></i> {{ list.address }}
            </p>
            <a :href="gmapLink"> Show on map</a>
            <p>
              {{ Shopbio }}
            </p>
            <p class="shoplocation">
              <i class="fa fa-phone"></i>{{ list.contact_no }}
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
            <img :src="image" alt="..." width="100%" />
          </div>
          <div class="w3-third" style="padding: 20px" v-else>
            <img src="../../assets/def.png" alt="..." width="100%" />
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
              <b-card no-body style="border: none !important; font-size: 20px">
                <b-tabs card>
                  <b-tab active style="font-size: 15px">
                    <template #title>
                      <span style="color: #008cff">Products</span>
                    </template>

                    <div v-for="offers in list.offers" :key="offers.length">
                      <div
                        v-if="
                          Math.floor(new Date().getTime() / 1000.0) <
                            offers.validity[1] &&
                          Math.floor(new Date().getTime() / 1000.0) >
                            offers.validity[0] &&
                          offers.quantity > 0 &&
                          offers.type === 'FIXED'
                        "
                        class="couponcard"
                      >
                        <div class="w3-row">
                          <div class="w3-col m2" v-if="offers.type === 'FIXED'">
                            <img :src="offers.image_url" class="product_img" />
                          </div>
                          <div class="w3-col m2" v-else>
                            <div v-if="loaded">
                              <img :src="image" class="product_img" />
                            </div>
                            <div v-else>
                              <img
                                src="../../assets/def.png"
                                class="product_img"
                              />
                            </div>
                          </div>
                          <div class="w3-col m7">
                            <div
                              class="card_remaining"
                              v-if="offers.quantity <= 5"
                            >
                              Hurry only {{ offers.quantity }} left!
                            </div>

                            <div
                              class="card_item"
                              v-if="offers.type === 'ITEM_DISCOUNT'"
                            >
                              {{ Math.round(offers.discount_percent) }}% off on
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
                            <div
                              class="card_item"
                              v-else-if="offers.type === 'FIXED'"
                            >
                              {{ Math.round(offers.discount_percent) }}% off on
                              <span
                                v-b-tooltip.hover
                                :title="offers.products + ' '"
                              >
                                <router-link
                                  :to="{
                                    path: '/product_description',
                                    query: {
                                      seller: email,
                                      offer_text: offers.offer_text,
                                    },
                                  }"
                                >
                                  {{ offers.products.toString() }}
                                </router-link>
                              </span>
                              <div class="product_cost">
                                <i class="fa fa-inr" aria-hidden="true"></i>
                                {{ offers.offer_price }}
                                <del>
                                  <i class="fa fa-inr" aria-hidden="true"></i>
                                  {{ offers.mrp }}</del
                                >
                              </div>
                            </div>
                            <div class="card_item" v-else>
                              <span class="offno"
                                >{{
                                  Math.round(offers.discount_percent)
                                }}%</span
                              >
                              off on Total Bill
                              <div></div>
                            </div>

                            <div class="w3-row">
                              <div class="w3-col m8">
                                <div class="card_leftcoupons">
                                  {{ offers.quantity }} Coupons Left
                                </div>
                              </div>
                              <div class="w3-col m4">
                                <div class="card_validity">
                                  valid till
                                  {{
                                    moment(offers.validity[1] * 1000).format(
                                      "DD/MM/YY"
                                    )
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="w3-col m3">
                            <button
                              v-on:click="
                                addToCart(offers.offer_text, list.seller_email)
                              "
                              class="w3-button"
                              style="
                                width: 80%;
                                margin: 30px 10%;
                                background: #008cff;
                                color: white;
                              "
                            >
                              <i
                                class="fa fa-shopping-cart"
                                aria-hidden="true"
                              ></i>
                              Add to cart
                            </button>
                          </div>
                          <div class="minval" v-if="offers.type !== 'FIXED'">
                            offer valid on a minimum purchase of
                            <i class="fa fa-rupee"></i> {{ offers.min_val }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <br />
                  </b-tab>
                  <!-- ========================================================================== -->
                  <b-tab style="font-size: 15px">
                    <template #title>
                      <span style="color: #008cff">Coupons</span>
                    </template>
                    <div v-for="offers in list.offers" :key="offers.length">
                      <div
                        v-if="
                          Math.floor(new Date().getTime() / 1000.0) <
                            offers.validity[1] &&
                          Math.floor(new Date().getTime() / 1000.0) >
                            offers.validity[0] &&
                          offers.quantity > 0 &&
                          offers.type !== 'FIXED'
                        "
                        class="couponcard"
                      >
                        <div class="w3-row">
                          <div class="w3-col m2" v-if="offers.type === 'FIXED'">
                            <img :src="offers.image_url" class="product_img" />
                          </div>
                          <div class="w3-col m2" v-else>
                            <div v-if="loaded">
                              <img :src="image" class="product_img" />
                            </div>
                            <div v-else>
                              <img
                                src="../../assets/def.png"
                                class="product_img"
                              />
                            </div>
                          </div>
                          <div class="w3-col m7">
                            <div
                              class="card_remaining"
                              v-if="offers.quantity <= 5"
                            >
                              Hurry only {{ offers.quantity }} left!
                            </div>

                            <div
                              class="card_item"
                              v-if="offers.type === 'ITEM_DISCOUNT'"
                            >
                              {{ Math.round(offers.discount_percent) }}% off on
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
                            <div
                              class="card_item"
                              v-else-if="offers.type === 'FIXED'"
                            >
                              {{ Math.round(offers.discount_percent) }}% off on
                              <span
                                v-b-tooltip.hover
                                :title="offers.products + ' '"
                              >
                                <router-link
                                  :to="{
                                    path: '/product_description',
                                    query: {
                                      seller: email,
                                      offer_text: offers.offer_text,
                                    },
                                  }"
                                >
                                  {{ offers.products.toString() }}
                                </router-link>
                              </span>
                              <div class="product_cost">
                                <i class="fa fa-inr" aria-hidden="true"></i>
                                {{ offers.offer_price }}
                                <del>
                                  <i class="fa fa-inr" aria-hidden="true"></i>
                                  {{ offers.mrp }}</del
                                >
                              </div>
                            </div>
                            <div class="card_item" v-else>
                              <span class="offno"
                                >{{
                                  Math.round(offers.discount_percent)
                                }}%</span
                              >
                              off on Total Bill
                              <div></div>
                            </div>

                            <div class="w3-row">
                              <div class="w3-col m8">
                                <div class="card_leftcoupons">
                                  {{ offers.quantity }} Coupons Left
                                </div>
                              </div>
                              <div class="w3-col m4">
                                <div class="card_validity">
                                  valid till
                                  {{
                                    moment(offers.validity[1] * 1000).format(
                                      "DD/MM/YY"
                                    )
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="w3-col m3">
                            <button
                              v-on:click="
                                addToCart(offers.offer_text, list.seller_email)
                              "
                              class="w3-button"
                              style="
                                width: 80%;
                                margin: 30px 10%;
                                background: #008cff;
                                color: white;
                              "
                            >
                              <i
                                class="fa fa-shopping-cart"
                                aria-hidden="true"
                              ></i>
                              Add to cart
                            </button>
                          </div>
                          <div class="minval" v-if="offers.type !== 'FIXED'">
                            offer valid on a minimum purchase of
                            <i class="fa fa-rupee"></i> {{ offers.min_val }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
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
export default {
  components: { topnav, Sitefooter, Bottomnav, Spinner },
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
      image: "",
      email: "",
      Shopbio: "",
      gmapLink: null,
      loaded: false,
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
          this.image = "/img/def.png";
          if (response.status === 200) {
            {
              this.loaded = true;
              this.image = response.data.toString();
            }
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
  margin-bottom: 20px;
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
  width: fit-content;
  display: block;
  font-weight: 400;
  margin-left: 20px;
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

@media screen and (max-width: 600px) {
  .card_validity {
    padding: 0px 22px;
  }
  .mopad {
    margin: -20px !important;
  }
}
</style>
