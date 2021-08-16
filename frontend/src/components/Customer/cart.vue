<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i>'
      link2='<i class="fa fa-info-circle"></i> About'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-shopping-cart"></i> Cart'
      link5='<i class="fa fa-lock"></i> Logout'
      url1="/"
      url2="/about"
      url3="/account"
      url4="/cart"
      url5="/logout"
      url6="/"
    ></topnav>
    <div class="greyback"></div>
    <div class="w3-container">
      <div class="w3-row">
        <div class="w3-threequarter">
          <b-card>
            <h2 style="border-bottom: 1px solid #bababa; padding: 20px">
              Coupons Cart
            </h2>

            <div class="couponcard">
              <div class="w3-row">
                <div class="w3-col m9">
                  <div class="card_remaining">Hurry only 9 left!</div>

                  <div class="card_item">40% off on Samsung Fast Chargers</div>

                  <div class="w3-row">
                    <div class="w3-third">
                      <div class="card_leftcoupons">9/30 Coupons Left</div>
                    </div>
                    <div class="w3-third">
                      <div class="card_validity">
                        valid till 4 jun 2021 <i class="fa fa-info-circle"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w3-col m3">
                  <button
                    v-on:click="reedemOffer(offer_text)"
                    id="reedem"
                    class="w3-button"
                    style="
                      width: 90%;
                      margin: 30px 10px;
                      background: #008cff;
                      color: white;
                    "
                  >
                    Reedem coupon
                  </button>
                </div>
              </div>
            </div>

            <div></div>
          </b-card>
        </div>
        <div class="w3-quarter p-card">
          <b-card style="margin-top: 0px">
            <h4>You may be intrested in</h4>
            <div class="couponhome">
              <div class="c2-back">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKBbMroCwhxlxNUD5rGHdE4yuncOPy4fTwBA&usqp=CAU"
                />
              </div>
              <div class="c2-off">40% OFF on Samsung M30s</div>
              <div class="c2-left">5 coupons left</div>
              <div class="c2-shop">Rakesh Digital</div>
              <div class="c2-validity">offer valid til 2 jun 2021</div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
    <sitefooter></sitefooter>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
export default {
  components: { topnav, Sitefooter },
  methods: {
    reedemOffer(offer_text) {
      var r = confirm(
        "Note that once you reedem a code it will be valid for 5 minutes only"
      );
      if (r == true) {
        const config = {
          data: {
            offer_text: offer_text,
          },
        };
        const accessToken = this.$session.get("token");
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const url = BASE_URL + "/redeem";
        axios
          .post(url, config, options)
          .then((response) => console.log(response))
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      } else {
        document.getElementById("reedem").style.color = "white";
      }
    },
  },
};
</script>
<style scoped>
.p-card {
  padding: 0px 10px;
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
  color: rgb(252, 88, 88);
  display: block;
  width: 100%;
  padding: 10px 20px;
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
}
</style>