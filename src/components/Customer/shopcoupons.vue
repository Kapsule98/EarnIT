<template>
  <div>
    <topnav
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
    <div class="greyback"></div>
    <div class="w3-container mopad">
      <div class="w3-card" style="background: white">
        <div class="w3-row">
          <div class="w3-twothird" style="padding: 20px">
            <p class="domain">{{ list.category }}</p>
            <p class="shopname">{{ list.offers[0].shop_name }}</p>
            <p class="shoplocation">
              <i class="fa fa-map-marker"></i> {{ list.address }}
            </p>
            <p class="shoplocation">
              <i class="fa fa-phone"></i>{{ list.contact_no }}
            </p>
          </div>
          <div class="w3-third" style="padding: 20px">
            <img
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              alt="..."
              width="100%"
              onclick="document.getElementById('modal01').style.display='block'"
              class="w3-hover-opacity"
            />
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
                      <span style="color: #008cff">Offers</span>
                    </template>

                    <div
                      class="couponcard"
                      v-for="offers in list.offers"
                      :key="offers.length"
                    >
                      <div class="w3-row">
                        <div class="w3-col m9">
                          <div
                            class="card_remaining"
                            v-if="offers.quantity <= 5"
                          >
                            Hurry only {{ offers.quantity }} left!
                          </div>

                          <div class="card_item">
                            {{ offers.discount_percent }}% off on
                            {{ offers.products[0] }}
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
                            v-on:click="addToCart(offers.offer_text)"
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
                      </div>
                    </div>

                    <br />
                  </b-tab>
                  <b-tab style="color: #666666">
                    <template #title>
                      <span style="color: #008cff">About</span>
                    </template>
                    <h5
                      class="domain"
                      style="
                        padding: 20px 0px;
                        border-bottom: 1px solid #b5b5b5;
                        font-size: 20px;
                        color: #666666;
                      "
                    >
                      Rakesh Digital
                    </h5>
                    <br />
                    <h5>Adress</h5>
                    <p>342, West Bank, Amroli, C.G</p>
                    <h4>phone:</h4>
                    <p>+91888**939</p>
                    <p
                      style="
                        background: #008cff;
                        width: fit-content;
                        color: white;
                        padding: 3px 7px;
                        border-radius: 4px;
                        font-size: 16px;
                      "
                    >
                      open : 9 am - 8pm Mon-Fri
                    </p>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
          <div class="w3-third" style="padding: 20px">
            <div class="w3-card" style="padding: 20px; box-shadow: none">
              <h4>
                <i class="fa fa-share-alt" style="color: #008cff"></i> Share
                this page
              </h4>
              <h3>
                <i
                  class="fa fa-instagram"
                  style="color: #008cff; padding: 10px"
                ></i>
                <i
                  class="fa fa-facebook"
                  style="color: #008cff; padding: 10px"
                ></i>
                <i
                  class="fa fa-snapchat"
                  style="color: #008cff; padding: 10px"
                ></i>
                <i
                  class="fa fa-pinterest"
                  style="color: #008cff; padding: 10px"
                ></i>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="modal01"
      class="w3-modal w3-animate-zoom"
      onclick="this.style.display='none'"
    >
      <img
        class="w3-modal-content"
        src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        style="width: 60%; margin-left: 20%; margin-top: -2%"
      />
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
export default {
  components: { topnav, Sitefooter, Bottomnav },
  props: {
    seller: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    const url = BASE_URL + "/get_offers_by_shop/" + this.seller;
    axios
      .get(url)
      .then((response) => {
        this.list = response.data;
        console.log(this.list);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    addToCart(offer_text) {
      if (localStorage.getItem("log") === "true") {
        const payload = {
          offer_text: offer_text,
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
            console.log(response);
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
          });
      } else {
        this.$router.push("/login");
      }
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
