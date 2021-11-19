<template>
  <div>
    <div v-if="loading">
      <img
        class="img"
        src="../../assets/dribbble-loader-green.gif"
        alt="loading..."
        width="200"
      />
    </div>
    <div v-else>
      <div v-if="mapped.length > 0">
        <!---->

        <carousel
          :autoplayTimeout="3000"
          :autoplayHoverPause="true"
          :responsive="{
            0: { items: 2, nav: false, stagePadding: 0 },
            600: { items: 5, nav: true, stagePadding: 30 },
            1200: { items: 5, stagePadding: 30 },
          }"
          :loop="false"
          :autoplay="true"
          :nav="false"
          :dots="false"
          ><template v-for="offer in mapped">
            <div
              v-if="
                Math.floor(new Date().getTime() / 1000.0) <
                  list.active_offers[offer.index].validity[1] &&
                Math.floor(new Date().getTime() / 1000.0) >
                  list.active_offers[offer.index].validity[0] &&
                list.active_offers[offer.index].quantity > 0
              "
              :key="offer.length"
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
                    {{ list.active_offers[offer.index].quantity }} coupons left
                  </div>
                </div>
                <div
                  class="l-offer"
                  v-if="
                    list.active_offers[offer.index].type === 'ITEM_DISCOUNT'
                  "
                >
                  <span class="offno">{{ offer.value }}%</span> off on
                  <span
                    v-b-tooltip.hover
                    :title="list.active_offers[offer.index].products + ' '"
                  >
                    <span
                      v-for="(prods, index1) in list.active_offers[offer.index]
                        .products"
                      :key="prods.offer_text"
                    >
                      {{ list.active_offers[offer.index].products[index1] }}
                      <span
                        v-if="
                          index1 !=
                          Object.keys(list.active_offers[offer.index].products)
                            .length -
                            1
                        "
                        >,
                      </span>
                    </span>
                  </span>
                </div>
                <div class="l-offer" v-else>
                  <span class="offno">{{ offer.value }}%</span> off on Total
                  Bill
                </div>
                <div class="shopname">
                  {{ list.active_offers[offer.index].seller_display_name }}

                  <!-- <button class="vshop">View Shop</button> -->
                </div>
                <!-- <div class="c2-validity">
                  offer valid till
                  {{
                    moment(
                      list.active_offers[offer.index].validity[1] * 1000
                    ).format("MMM Do YY")
                  }}
                </div> -->
              </router-link>
            </div>
          </template>
        </carousel>
      </div>
    </div>
  </div>
  <!---->
</template>

<script>
import carousel from "vue-owl-carousel";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Imgstore from "./imgstore.vue";
export default {
  components: { carousel, Imgstore },
  props: ["category", "alloffers"],
  data() {
    return {
      loading: false,
      list: [],
      result: [],
      mapped: [],
    };
  },
  mounted() {
    this.getAllOffers();
  },
  methods: {
    getAllOffers() {
      const offersurl = BASE_URL + "/get_all_offers";

      axios
        .get(offersurl)
        .then((response) => {
          this.list = response.data;

          var discount = [];

          for (var i = 0; i < this.list.active_offers.length; i++) {
            discount[i] = this.list.active_offers[i].discount_percent;
          }

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
          console.error(err);
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
  background-position: center;
  background-repeat: no-repeat;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>