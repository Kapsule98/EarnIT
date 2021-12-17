<template>
  <div>
    <div class="w3-col m10" id="Sproducts">
      <div class="w3-container">
        <div class="w3-row">
          <div
            class="w3-col m3 s6"
            v-for="shop in list.sellers"
            :key="shop.length"
          >
            <router-link
              :to="{
                path: '/seller',
                query: {
                  seller: shop.email,
                },
              }"
            >
              <div class="Scard" v-if="shop_loc === shop.city">
                <div class="hovclass">
                  <div class="couponhome">
                    <div class="c2-back">
                      <imgstore
                        :email="shop.email"
                        :category="shop.category"
                      ></imgstore>
                    </div>
                  </div>
                  <div
                    class="l-offer"
                    v-b-tooltip.hover
                    :title="shop.display_name"
                  >
                    <nav>{{ shop.display_name }}</nav>
                  </div>
                  <div class="shopname">
                    <div
                      class="s-address"
                      v-b-tooltip.hover
                      :title="shop.address"
                    >
                      {{ shop.address }}
                    </div>

                    <!-- <button class="vshop">View Shop</button> -->
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import topnav from "../Seller/topnav.vue";
// import Sitefooter from "./sitefooter.vue";
//import allcatrgories from "./allcategories.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
// import Bottomnav from "./bottomnav.vue";
import Imgstore from "./imgstore.vue";
// import Spinner from "./spinner.vue";
export default {
  components: { Imgstore },
  props: {
    category: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loading: false,
      list: [],
      allcategories: [],
      shop_loc: "",
    };
  },
  mounted() {
    if ("get_location" in sessionStorage) {
      if (sessionStorage.getItem("get_location") === "Bhilai,Durg") {
        this.shop_loc = "Bhilai";
      }
      if (sessionStorage.getItem("get_location") === "Raipur") {
        this.shop_loc = "Raipur";
      }
    }
    this.getShops();
    if ("categories" in sessionStorage) {
      var sdata = JSON.parse(sessionStorage.getItem("categories"));

      this.allcategories = sdata.categories;
    } else {
      const offersurl = BASE_URL + "/categories";
      let JWTToken = this.$session.get("token");
      axios
        .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.allcategories = response.data.categories;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // document.getElementById("sby2").checked = true;
  },
  methods: {
    getShops() {
      this.loading = true;
      const offersurl = BASE_URL + "/get_shops/" + this.category;
      axios
        .get(offersurl)
        .then((response) => {
          this.list = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style scoped>
.fullpage {
  min-height: 600px;
}
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
  padding-bottom: 30px;
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
  font-size: 14px;
  color: rgb(92, 92, 92);
  text-transform: capitalize;
}
.s-address {
  float: left;
  max-width: 65%; /* IE6 needs any width */

  height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.offno {
  font-size: 22px;
  font-weight: 700;
}
.vshop {
  font-size: 13px;
  color: #0077ff;
  background: none;
  text-transform: lowercase;
  font-weight: 600;
  border: 1px solid#0077ff;
  width: fit-content;
  border-radius: 3px;
  padding: 2px 14px;
  float: right;
  margin: 0px;
  transition: 0.4s ease-in-out;
}
.vshop:hover {
  color: white;
  background: #0077ff;
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
  border: 2px solid rgb(0, 162, 255);
  padding: 2px 3px;
  border-radius: 9px;
}
.c2-left {
  font-size: 12px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 600;
  background: #0077ff;
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

.closeFilter {
  position: absolute;
  top: -50px;
  left: 0;
  display: none;
  width: 100%;
  margin: 0;
  height: 50px;
  background-color: rgb(255, 255, 255);
  border-radius: 25px 25px 0px 0px;
  border-bottom: 1px solid rgb(185, 185, 185);
}
.showfilter {
  display: none;
  margin-top: -30px;
  height: 50px;
  border-bottom: 1px solid rgb(185, 185, 185);
  width: 100%;
}
.showbtn {
  background: none;
  border: none;
  border-left: 1px solid rgb(185, 185, 185);
  height: 100%;
  width: fit-content;
  text-align: center;
  float: right;
  font-size: 15px;
  color: teal;
}
.closebtn {
  background: none;
  border: none;
  float: right;
  color: teal;
  font-size: 15px;
  text-transform: capitalize;
  height: 50px;
}
.reduce {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.425);
  z-index: 1999;
}
.clear {
  color: #008cff;
  border: none;
  font-size: 12px;
  padding: 2px 4px;
  background: none;
}
@media screen and (min-width: 600px) {
  .filter {
    position: -webkit-sticky;
    position: sticky;
    top: 40px;
    z-index: 0;
  }
}
@media screen and (max-width: 600px) {
  .showfilter {
    display: block;
  }
  .card_validity {
    padding: 0px 22px;
  }
  .mopad {
    margin: -20px !important;
  }
  .couponcard {
    width: 100%;
    padding: 10px;
    margin: 0px auto;
    border-bottom: 1px solid rgb(214, 214, 214);
  }
  .thumbnail {
    width: 80px;
    border-radius: 50%;
    margin-top: 30px;
  }
  .imgcol {
    width: 20%;
  }
  .contentcol {
    width: 8%;
  }
  .filter {
    width: 100%;
    position: fixed;
    background: white;
    height: 60%;
    bottom: -100%;
    transition: 0.5s;
    z-index: 2000;
  }
  .closeFilter {
    display: block;
  }
}
</style>
