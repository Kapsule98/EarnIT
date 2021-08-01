<template>
  <div>
    <div class="backwrap">
      <topnav
        link1=" Home"
        link2=" About"
        link3='<i class="fa fa-user"></i> Account'
        link4='<i class="fa fa-shopping-cart"></i> Cart'
        link5='<i class="fa fa-lock"></i> Logout'
        url1="/"
        url2="/about"
        url3="/dashboard"
        url4="/cart"
        url5="/"
        url6="/"
      >
      </topnav>

      <carousel style="margin-top: -30px"></carousel>

      <div class="lessm">
        <div class="w3-row">
          <!--5-6 Categories like pharmacy etc on clicking on it more products of this kind will be shown-->
          <div class="w3-col m4 s6">
            <a href="" v-for="item in list" v-bind:key="item.id">
              <b-card class="top_categories">
                <img :src="item.url" alt="ss" width="100%" />
                <p class="offhead">
                  Upto off on {{ item.highest_off }} {{ item.category_name }}s
                </p>
              </b-card>
            </a>
          </div>
        </div>
      </div>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h3 style="padding: 0px">
          Top Offers <a href="" style="font-size: 11px">View all</a>
        </h3>

        <div class="w3-container" style="padding: 20px 0px">
          <topoffers></topoffers>
        </div>
      </b-card>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Tagline for Apparels <a href="" style="font-size: 11px">View all</a>
        </h2>

        <topoffers></topoffers>

        <div class="w3-row" style="padding: 10px 0px">
          <div class="w3-half">
            <div class="c-grid">
              <a href="">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/BRANDtiles/USPA._SY530_QL85_.jpg"
                  alt="ss"
                  width="100%"
                  class="c-img"
                  style="padding: 5px"
                />
              </a>
            </div>

            <div class="c-grid">
              <a href="">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/SBC/Ess-9card_01._SY530_QL85_.jpg"
                  alt="ss"
                  width="100%"
                  class="c-img"
                  style="padding: 5px"
                />
              </a>
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              <a href=""> 30% 0ff on U.S polo T-shirts </a>
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              <a href=""> 30% 0ff on U.S polo T-shirts </a>
            </div>
          </div>
        </div>
      </b-card>
      <sitefooter></sitefooter>
    </div>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import Carousel from "./homeposters.vue";
import topoffers from "./topoffers.vue";
import Sitefooter from "./sitefooter.vue";
import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import { BASE_URL } from "../../utils/constants";
Vue.use(VueAxios, axios);

export default {
  components: { topnav, Carousel, Sitefooter, topoffers },
  data() {
    return {
      list: undefined,
    };
  },
  mounted() {
    const url = BASE_URL + "/seller/add_category";
    Vue.axios.get(url).then((resp) => {
      this.list = resp.data.data;
      console.warn(resp.data.data);
    });
  },
};
</script>

<style scoped>
.top_categories {
  z-index: 1000;
  background: white;
  border: none;
  border-radius: 0;
}
.c-grid {
  display: inline-flex;
  width: 50%;
}

.card-body {
  padding: 10px 1.25rem !important;
}
.offhead {
  color: rgb(27, 27, 27);
  font-size: 17px;
  text-align: center;
  width: 100%;
  padding: 5px 10px 0px 10px;
  height: 52px;
  margin: 0px;
}
.lessm {
  margin-top: 0px;
  z-index: 1;
  background: rgb(224, 224, 224);
  text-align: center;
}
.backwrap {
  background-color: rgb(160, 160, 160);
}
.c-img {
  height: 200px;
}
@media screen and (min-width: 800px) {
  .c-img {
    height: 250px;
  }
}

a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>