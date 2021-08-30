<template>
  <div v-if="mapped.length > 0">
    <!---->

    <carousel
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
      ><template>
        <div v-for="offer in mapped" :key="offer.length">
          <a v-on:click="redeemOffer(list.offers[offer.index].offer_text)">
            <div class="couponhome">
              <div class="c2-back">
                <img
                  src="https://images.unsplash.com/photo-1603912699214-92627f304eb6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80"
                />
              </div>
              <div class="c2-off">
                {{ offer.value }}% on
                {{ list.offers[offer.index].products[0] }}
              </div>
              <div class="c2-left">
                {{ list.offers[offer.index].quantity }} coupons left
              </div>
              <div class="c2-shop"><!--{{ shop_name }}--></div>
              <div class="c2-location">
                <i class="fa fa-map-marker"></i>
                {{ list.offers[offer.index].shop_name }}
              </div>
              <div class="c2-validity">
                offer valid till
                {{
                  moment(list.offers[offer.index].validity[1] * 1000).format(
                    "DD-MM-YYYY"
                  )
                }}
              </div>
            </div>
          </a>
        </div>
      </template>
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
  props: ["category"],
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
      if (localStorage.getItem("log") === "true") {
        var r = confirm("Add coupon to cart?");
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
          const url = BASE_URL + "/cart";
          axios
            .post(url, payload, options)
            .then((response) => {
              if (response.data.status === 200) {
                alert(response.data.msg);
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
      } else {
        this.$router.push("/login");
      }
    },
    getAllOffers() {
      const offersurl = BASE_URL + this.category;
      // let JWTToken = this.$session.get("token");
      axios
        .get(offersurl)
        .then((response) => {
          this.list = response.data;

          var discount = [];
          for (var i = 0; i < this.list.offers.length; i++) {
            discount[i] = this.list.offers[i].discount_percent;
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
          console.error(err);
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
  background: rgba(0, 172, 252, 0.082);
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
  widows: 100%;
  height: 100%;
  z-index: -1;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>