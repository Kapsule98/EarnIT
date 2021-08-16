<template>
  <div>
    <!---->

    <carousel
      v-if="list.active_offers.length > 0"
      :autoplayTimeout="3000"
      :autoplayHoverPause="true"
      :responsive="{
        0: { items: 1, nav: false },
        600: { items: 3, nav: true },
        1200: { items: 4 },
      }"
      :stagePadding="10"
      :loop="true"
      :autoplay="true"
      :nav="false"
      :dots="false"
    >
      <div v-for="offer in mapped" :key="offer.length">
        <div
          v-if="
            list.active_offers[offer.index].category === category ||
            alloffers === 'true'
          "
        >
          <a
            v-on:click="redeemOffer(list.active_offers[offer.index].offer_text)"
          >
            <div class="couponhome">
              <div class="c2-back">
                <!-- <img :src="item.img_url" />-->
              </div>
              <div class="c2-off">
                {{ offer.value }}% on
                {{ list.active_offers[offer.index].products[1] }}
              </div>
              <div class="c2-left">
                {{ list.active_offers[offer.index].quantity }} coupons left
              </div>
              <div class="c2-shop"><!--{{ shop_name }}--></div>
              <div class="c2-location">
                <i class="fa fa-map-marker"></i>
                <!--{{ shop_location }}-->
              </div>
              <div class="c2-validity">
                offer valid till
                {{
                  moment(list.active_offers[offer.index].validity[1]).format(
                    "DD-MM-YYYY"
                  )
                }}
              </div>
            </div>
          </a>
        </div>
      </div>
    </carousel>
  </div>
  <!---->
</template>

<script>
import carousel from "vue-owl-carousel";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: { carousel },
  props: ["category", "alloffers"],
  data() {
    return {
      list: [],
      result: [],
      mapped: [],
    };
  },
  mounted() {
    this.getAllOffers();
  },
  methods: {
    redeemOffer(offer_text) {
      var r = confirm("Process the Coupon");
      if (r == true) {
        const payload = {
          offer_text: offer_text,
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
            if (response.data.status === 200) {
              alert(response.data.otp);
            } else {
              alert("something went wrong");
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
      } else {
        document.getElementById("reedem").style.color = "white";
      }
    },
    getAllOffers() {
      const offersurl = BASE_URL + "/get_all_offers";
      let JWTToken = this.$session.get("token");
      axios
        .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.list = response.data;
          console.log(response.data);
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
.couponhome {
  position: relative;
  width: 98%;
  height: 220px;
  margin: 10px auto;
  background: rgb(4, 87, 62);
  padding: 10px;
  overflow: hidden;
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
  font-size: 14px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 400;
  display: block;
  padding-left: 10px;
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
  border: 2px solid rgba(0, 162, 255, 0.719);
  padding: 2px 3px;
  border-radius: 9px;
}
.c2-left {
  font-size: 17px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 600;
  background: rgba(0, 162, 255, 0.719);
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
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>