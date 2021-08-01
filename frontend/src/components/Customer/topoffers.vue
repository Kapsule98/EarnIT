<template>
  <carousel
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
    <!---->
    <a href="">
      <div class="couponhome" v-for="item in topoffers" v-bind:key="item.id">
        <div class="c2-back">
          <img :src="item.img_url" />
        </div>
        <div class="c2-off">{{ item.discount }} on {{ item.product }}</div>
        <div class="c2-left">{{ item.coupon_left }} coupons left</div>
        <div class="c2-shop">{{ item.shop_name }}</div>
        <div class="c2-location">
          <i class="fa fa-map-marker"></i> {{ item.shop_location }}
        </div>
        <div class="c2-validity">
          offer valid til {{ item.Coupon_validity }}
        </div>
      </div>
    </a>

    <!---->
  </carousel>
</template>

<script>
import carousel from "vue-owl-carousel";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  components: { carousel },
  data() {
    return {
      topoffers: undefined,
    };
  },
  mounted() {
    const topoffersurl = BASE_URL + "/seller/add_category";
    axios.get(topoffersurl).then((resp) => {
      this.topoffers = resp.data.data;
      console.warn(resp.data.data);
    });
  },
};
</script>
<style scoped>
.couponhome {
  position: relative;
  width: 98%;
  height: 220px;
  margin: 10px auto;
  background: rgba(0, 0, 0, 0.479);
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