<template>
  <div>
    <topnav
      link1='<i class="fa fa-cubes"></i> Dashboard'
      link2='<i class="fa fa-money"></i> Customer Bill'
      link3='<i class="fa fa-user"></i> Account'
      url1="/verifycoupon"
      url2="/customerbill"
      url3="/account"
      link4=""
      link5=""
      active2="active_nav"
    ></topnav>
    <div class="w3-row">
      <div class="w3-col m4 l4">
        <div class="c-details">
          <div class="w3-container">
            <b-card style="margin: 10px">
              <h3 style="color: teal">{{ user.shop_name }}</h3>
              <i class="fa fa-map-marker"></i> {{ user.address }}
            </b-card>
            <b-card style="margin: 10px">
              <div class="w3-row">
                <div class="w3-twothird">
                  <h5>Revenue generated through us:</h5>
                </div>
                <div class="w3-third">
                  <h5>
                    <div class="c-data">
                      <i class="fa fa-rupee"></i> {{ earning.earning }}
                    </div>
                  </h5>
                </div>
              </div>
            </b-card>
            <b-card style="margin: 10px">
              <div class="w3-row">
                <div class="w3-twothird">
                  <h5>Coupons Sold by you:</h5>
                </div>
                <div class="w3-third">
                  <h5>
                    <div class="c-data">{{ coupons_sold.coupons_sold }}</div>
                  </h5>
                </div>
              </div>
            </b-card>
            <b-card style="margin: 10px; color: black">
              <div class="w3-row" style="text-align: center">
                <h5>Most used offers:</h5>

                <h5>
                  <div
                    style="
                      color: teal;
                      background: white;
                      padding: 5px;
                      border-radius: 6px;
                    "
                  >
                    50% 0ff on Utencils
                  </div>
                  <p>238 coupons sold</p>
                </h5>
              </div>
            </b-card>
          </div>
        </div>
      </div>
      <div class="w3-col m8 l8">
        <div class="w3-container" style="margin: 10px 30px"></div>
        <div class="c-table-container">
          <ctable></ctable>
        </div>
      </div>
    </div>

    <sitefooter></sitefooter>
  </div>
</template>

<script>
import Sitefooter from "../Customer/sitefooter.vue";
import Ctable from "./ctable.vue";
import topnav from "./topnav.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  components: { topnav, Ctable, Sitefooter },
  data() {
    return {
      history: {},
      user: {},
      earning: {},
      coupons_sold: {},
    };
  },
  mounted() {
    this.user = this.$session.get("user_data");
    this.getEarning();
    this.getCouponsSold();
  },
  methods: {
    getEarning() {
      const url = BASE_URL + "/seller/earning";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.earning = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCouponsSold() {
      const url = BASE_URL + "/seller/get_coupons";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.coupons_sold = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.c-data {
  background-color: teal;
  padding: 10px;
  width: fit-content;
  display: block;
  margin: 10px auto;
  color: white;
  border-radius: 10px;
}
.c-table-container {
  max-height: 600px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-bottom: 40px;
}
@media screen and (max-width: 900px) {
  .c-table-container {
    overflow-x: scroll;
  }
}
@media screen and (max-width: 600px) {
  .w3-container {
    padding: 0px 0px 10px 0px !important;
  }
}
</style>