<template>
  <div>
    <topnav
      link1='<i class="fa fa-cubes"></i> Dashboard'
      link2='<i class="fa fa-money"></i> Customer Bill'
      link3='<i class="fa fa-user"></i> Account'
      url1="/seller/dashboard"
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
              <h3 style="text-transform: Capitalize">
                {{ user.display_name }}
              </h3>
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
            <b-card
              style="margin: 10px; color: black"
              v-if="mostused.status === 200"
            >
              <div class="w3-row" style="text-align: center">
                <h5>Most used offer:</h5>
                <div
                  class="coupon_box"
                  v-b-tooltip.hover
                  :title="mostused.products + ' '"
                >
                  <div class="body">
                    <div class="bodyback">{{ mostused.discount }}%</div>
                    <h4 class="title" v-if="mostused.type === 'FIXED'">
                      {{ mostused.products.toString() }}
                    </h4>
                    <h4 class="title" v-else>Total Bill</h4>

                    <h2 class="how_much">
                      <b> {{ Math.round(mostused.discount) }}% </b>
                    </h2>
                    <h3>OFF</h3>
                  </div>
                  <div class="usecode">{{ mostused.count }} Coupons Sold</div>
                </div>
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
      mostused: {},
    };
  },
  mounted() {
    this.mostused = JSON.parse(localStorage.getItem("mostused"));

    if (this.$session.get("user_type") === "seller") {
      document.getElementsByClassName("topnav")[0].style.height = "70px";
    }
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
  background-color: #008cff;
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
h1,
h2,
h3,
h4 {
  margin: 0;
}

.coupon_box {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  width: 70%;
  border-radius: 7px;
  padding: 1rem;
  text-align: center;
  color: #fff;
  font-family: "Tahoma", sans-serif;
  position: relative;
  margin: 20px auto;
  height: 280px;
  transition: 0.5s ease-in-out;
}
.coupon_box:hover {
  transform: scale(1.07);
}

.title {
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 20px;
}

.how_much {
  font-size: 55px;
}
h3 {
  font-size: 35px;
}

.how_much {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.body {
  padding-bottom: 15px;
  border-bottom: 2px dashed rgba(0, 0, 0, 0.2);
  position: relative;
}
.bodyback {
  position: absolute;
  color: rgba(255, 255, 255, 0.15);
  top: 0%;
  left: 5%;
  font-size: 150px;
  font-weight: bold;
  user-select: none;
}
.usecode {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.671);
  font-size: 20px;
}

@media screen and (max-width: 600px) {
  .coupon_box {
    width: 80%;
    margin: 5px auto;
  }
}
</style>