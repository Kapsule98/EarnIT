<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      link1=""
      link2=""
      url1="/"
      url2="/"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
      url6="/"
      :searchbar="true"
      :display_categories="true"
    ></topnav>
    <spinner v-if="loading"></spinner>
    <div class="greyback"></div>
    <div class="w3-container">
      <div class="w3-row">
        <div class="w3-threequarter">
          <b-card>
            <h2 style="border-bottom: 1px solid #bababa; padding: 20px">
              Coupons Cart
            </h2>
            <div v-if="empty === true">
              <br /><br />
              <center><h1>Your cart is empty!</h1></center>
              <br /><br /><br /><br /><br /><br />
            </div>
            <div
              class="couponcard"
              v-for="offer in cart.cart"
              :key="offer.length"
            >
              <div class="w3-row">
                <div class="w3-col m9">
                  <div class="card_remaining">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"
                      />
                      <path
                        d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      />
                    </svg>
                    {{ offer.seller_display_name }}
                  </div>
                  <div class="w3-col m3" v-if="offer.type === 'FIXED'">
                    <img :src="offer.image_url" class="product_img" />
                  </div>
                  <div class="w3-col m3" v-else>
                    <div v-if="loaded">
                      <img :src="image" class="product_img" />
                    </div>
                    <div v-else>
                      <img src="../../assets/def.png" class="product_img" />
                    </div>
                  </div>
                  <div class="card_item" v-if="offer.type === 'ITEM_DISCOUNT'">
                    {{ offer.discount_percent }}% off on
                    <span v-b-tooltip.hover :title="offer.products + ' '">
                      <span
                        v-for="(prods, index1) in offer.products"
                        :key="prods.offer_text"
                      >
                        {{ offer.products[index1] }}
                        <span
                          v-if="
                            index1 != Object.keys(offer.products).length - 1
                          "
                          >,
                        </span>
                      </span>
                    </span>
                    <div class="card_validity">
                      valid till
                      {{
                        moment(offer.validity[1] * 1000).format("DD-MM-YYYY")
                      }}
                    </div>
                  </div>
                  <div class="card_item" v-else-if="offer.type === 'FIXED'">
                    {{ Math.round(offer.discount_percent) }}% off on
                    <span v-b-tooltip.hover :title="offer.products + ' '">
                      <router-link
                        :to="{
                          path: '/product_description',
                          query: {
                            seller: offer.seller_email,
                            offer_text: offer.offer_text,
                          },
                        }"
                        >{{ offer.products.toString() }}</router-link
                      >
                    </span>
                    <div class="product_cost">
                      <i class="fa fa-inr" aria-hidden="true"></i>
                      {{ offer.offer_price }}
                      <del>
                        <i class="fa fa-inr" aria-hidden="true"></i>
                        {{ offer.mrp }}</del
                      >
                    </div>
                    <div class="card_validity">
                      valid till
                      {{
                        moment(offer.validity[1] * 1000).format("DD-MM-YYYY")
                      }}
                    </div>
                  </div>
                  <div class="card_item" v-else>
                    {{ offer.discount_percent }}% off on Total Bill
                    <div class="card_validity">
                      valid till
                      {{
                        moment(offer.validity[1] * 1000).format("DD-MM-YYYY")
                      }}
                    </div>
                  </div>

                  <div class="w3-row">
                    <div class="w3-col m9"><br /></div>
                    <div class="w3-col m3"></div>
                  </div>
                </div>
                <div class="w3-col m3">
                  <button
                    v-on:click="
                      redeemOffer(offer.offer_text, offer.seller_email)
                    "
                    id="reedem"
                    class="w3-button"
                    style="
                      width: 90%;
                      margin: 30px 5%;
                      background: #008cff;
                      color: white;
                    "
                  >
                    Reedem coupon
                  </button>
                  <button
                    v-on:click="
                      removeItem(offer.offer_text, offer.seller_email)
                    "
                    class="delbtn"
                  >
                    delete
                  </button>
                </div>
              </div>
              <div
                v-if="
                  offer.offer_text === reedemdetailso && showstatus === true
                "
              >
                <b-alert variant="success" show>
                  provide the OTP and coupon code to the Shop to reedem it!
                  <br />
                  OTP :{{ reedemdetails }} | offer code :{{ reedemdetailso }}
                </b-alert>
              </div>
            </div>

            <div></div>
          </b-card>
        </div>
        <div class="w3-quarter p-card"></div>
      </div>
    </div>
    <bottomnav></bottomnav>
    <sitefooter></sitefooter>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import Bottomnav from "./bottomnav.vue";
import Spinner from "./spinner.vue";
export default {
  components: { topnav, Sitefooter, Bottomnav, Spinner },
  data() {
    return {
      cart: [],
      reedemdetails: localStorage.getItem("otp"),
      reedemdetailso: localStorage.getItem("offtext"),
      currentTime: "",
      nextTime: "",
      showstatus: true,
      empty: false,
      loading: false,
    };
  },
  mounted() {
    this.getCart();
    this.currentTime = localStorage.getItem("ct");
    const ct = this.currentTime;
    this.nextTime = new Date();
    var nt = this.nextTime.getTime();

    if (parseInt(nt) - parseInt(ct) > 300000) {
      this.showstatus = false;
    }
  },
  methods: {
    redeemOffer(offer_text, email) {
      this.loading = true;
      var r = confirm(
        "After reedeming the coupon it will be valid only for 5 minutes!"
      );
      if (r == true) {
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
        const url = BASE_URL + "/redeem";
        axios
          .post(url, payload, options)
          .then((response) => {
            console.log(response);
            if (response.data.status === 200 || response.data.status === 400) {
              localStorage.setItem("otp", response.data.otp);
              localStorage.setItem("offtext", offer_text);
              console.log(response.data.otp + "" + offer_text);
              this.currentTime = new Date();
              const ct = this.currentTime.getTime();
              localStorage.setItem("ct", ct);
              this.$router.go();
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
        document.getElementById("reedem").style.color = "white";
      }
    },
    getCart() {
      this.loading = true;
      const offersurl = BASE_URL + "/cart";
      let JWTToken = this.$session.get("token");
      console.log(JWTToken);
      axios
        .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.cart = response.data;
          console.log("cart");
          console.log(response.data);
          if (this.cart.cart.length === 0) {
            this.empty = true;
          }

          if (this.cart.status === 200) {
            localStorage.setItem("cartitems", this.cart.count);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
    },
    removeItem(offer_text, email) {
      this.loading = true;
      const offersurl = BASE_URL + "/cart";
      let JWTToken = this.$session.get("token");

      const config = {
        data: {
          offer_text: offer_text,
          seller_email: email,
        },
        headers: {
          Authorization: `Bearer ${JWTToken}`,
        },
      };
      axios
        .delete(offersurl, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
      this.$router.go();
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
.p-card {
  padding: 0px 10px;
}
.delbtn {
  width: fit-content;
  background: none;
  border: none;
  margin: 0px 10px;
  color: #32a88b;
  float: right;
  font-size: 12px;
  padding: px 2px;
}
.delbtn:hover {
  color: rgb(75, 75, 75);
}
.greyback {
  position: fixed;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  background: rgb(241, 241, 241);
  z-index: -100;
}
.couponcard {
  width: 100%;
  padding: 20px;
  margin: 10px auto;
  border-bottom: 1px solid rgb(214, 214, 214);
}

.card_item {
  font-size: 20px;
  color: rgba(0, 128, 128, 0.836);
  float: left;
  margin-top: -5px;
  width: fit-content;
  display: block;
  padding-left: 20px;
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
  color: rgb(51, 51, 51);
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin-left: 150px;
}
.couponhome {
  position: relative;
  width: 90%;
  height: 220px;
  margin: 20px auto;
  background: linear-gradient(
    45deg,
    rgba(72, 255, 0, 0.63),
    rgba(0, 255, 191, 0.466)
  );
  padding: 10px;
  overflow: hidden;
}
.c2-off {
  font-size: 22px;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  font-weight: 900;
  height: 80px;
  width: 100%;
  margin-top: 10px;
  display: block;
}
.c2-validity {
  font-size: 14px;
  color: rgb(31, 31, 31);
  text-transform: lowercase;
  font-weight: 400;
  display: block;
}
.c2-shop {
  font-size: 17px;
  color: rgb(0, 0, 0);
  font-weight: 600;
  display: block;
  padding: 10px;
  border-bottom: 1px solid rgb(255, 255, 255);
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
  border: 2px solid rgba(0, 128, 128, 0.767);
  padding: 2px 3px;
  border-radius: 9px;
}
.c2-left {
  font-size: 17px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 600;
  background: rgba(70, 187, 3, 0.719);
  width: fit-content;
  border-radius: 6px;
  padding: 2px 14px;
  margin: 5px auto;
}
.c2-back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
@media screen and (max-width: 600px) {
  .card_validity {
    padding: 0px 22px;
  }
  .w3-container {
    padding: 0px 10px 10px 10px !important;
  }
  .p-card {
    padding: 10px 0px;
  }
  .card_remaining {
    font-size: 15px;
    color: rgb(51, 51, 51);
    display: block;
    width: 100%;
    padding: 10px 20px;
    margin-left: 0px;
  }
}
</style>