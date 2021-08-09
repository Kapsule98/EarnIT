<template>
  <div>
    <!---->

    <carousel
      v-if="list.active_offers.length > 0"
      :autoplayTimeout="3000"
      :responsive="{
        0: { items: 1, nav: false },
        600: { items: 3, nav: true },
        1200: { items: 4 },
      }"
      :stagePadding="0"
      :loop="true"
      :autoplay="true"
      :nav="false"
      :dots="false"
    >
      <div v-for="offer in list.active_offers" :key="offer.length">
        <a href="">
          <div class="couponhome">
            <div class="c2-back">
              <!-- <img :src="item.img_url" />-->
            </div>
            <div class="c2-off">
              {{ offer.discount_percent }}% on
              <!--{{ product }}-->
            </div>
            <div class="c2-left">{{ offer.quantity }} coupons left</div>
            <div class="c2-shop"><!--{{ shop_name }}--></div>
            <div class="c2-location">
              <i class="fa fa-map-marker"></i>
              <!--{{ shop_location }}-->
            </div>
            <div class="c2-validity">
              offer valid till
              {{ moment(offer.validity[1]).format("DD-MM-YYYY") }}
            </div>
          </div>
        </a>
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
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getAllOffers();
  },
  methods: {
    getAllOffers() {
      const offersurl = BASE_URL + "/get_all_offers";
      let JWTToken = this.$session.get("token");
      axios
        .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.list = response.data;
          console.log(this.list.active_offers);
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