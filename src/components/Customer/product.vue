<template>
  <div>
    <h1 class="heading" style="margin-top: 40px">Exclusive Coupons</h1>

    <allapi></allapi>
    <div v-for="iters in allcategories" :key="iters.index">
      <h1 class="heading iterdeal" style="margin-top: 0px">
        {{ iters }} Deals
      </h1>

      <b-row
        style="padding: 10px 20px; background: white"
        no-gutters
        class="iterrow"
      >
        <b-col sm="12">
          <b-row no-gutters class="product_row">
            <template v-for="offer in mapped">
              <b-col
                sm="2"
                cols="6"
                :key="offer.length"
                v-if="
                  Math.floor(new Date().getTime() / 1000.0) <
                    list.active_offers[offer.index].validity[1] &&
                  Math.floor(new Date().getTime() / 1000.0) >
                    list.active_offers[offer.index].validity[0] &&
                  list.active_offers[offer.index].quantity > 0 &&
                  list.active_offers[offer.index].type === 'FIXED' &&
                  list.active_offers[offer.index].category === iters
                "
              >
                <router-link
                  :to="{
                    path: '/product_description',
                    query: {
                      seller: list.active_offers[offer.index].seller_email,
                      offer_text: list.active_offers[offer.index].offer_text,
                    },
                  }"
                >
                  <div class="product_card">
                    <div>
                      <img
                        :src="list.active_offers[offer.index].image_url"
                        alt=""
                        class="product_img"
                      />
                    </div>
                    <div class="product_name">
                      <span
                        v-b-tooltip.hover
                        :title="list.active_offers[offer.index].products + ' '"
                      >
                        {{
                          list.active_offers[offer.index].products.toString()
                        }}
                      </span>
                    </div>
                    <div class="shop_name">
                      {{ list.active_offers[offer.index].seller_display_name }}
                    </div>
                    <div class="disc">
                      {{
                        Math.round(
                          ((list.active_offers[offer.index].mrp -
                            list.active_offers[offer.index].offer_price) /
                            list.active_offers[offer.index].mrp) *
                            100
                        )
                      }}% OFF
                    </div>
                    <div class="product_cost">
                      <i class="fa fa-inr" aria-hidden="true"></i>
                      {{ list.active_offers[offer.index].offer_price }}
                      <del>
                        <i class="fa fa-inr" aria-hidden="true"></i>
                        {{ list.active_offers[offer.index].mrp }}</del
                      >
                    </div>

                    <div
                      class="addtocart"
                      v-on:click="
                        addToCart(
                          list.active_offers[offer.index].offer_text,
                          list.active_offers[offer.index].seller_email
                        )
                      "
                    >
                      <b-icon-cart3 mb-2></b-icon-cart3>
                    </div>
                  </div>
                </router-link>
              </b-col>
            </template>
          </b-row>
        </b-col>
      </b-row>
      <div class="viewall iterbtn">
        <router-link
          :to="{
            path: '/search',
            query: { category: iters, offer_type: 'fixed_price' },
          }"
        >
          View All <b-icon-arrow-right></b-icon-arrow-right
        ></router-link>
      </div>

      <div class="showcoupon">
        <!-- <div class="bbot"></div> -->
        <h1 class="heading" style="margin-top: 0px">
          Latest Coupons in {{ iters }}
        </h1>
        <topoffers :category="'/get_offers_by_category/' + iters"></topoffers>
        <div class="viewall">
          <router-link
            :to="{
              path: '/search',
              query: { category: iters, offer_type: 'bill_discount' },
            }"
          >
            View All <b-icon-arrow-right></b-icon-arrow-right
          ></router-link>
        </div>
        <div class="bbot iterbot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Allapi from "./allapi.vue";
import { BIconCart3, BIconArrowRight } from "bootstrap-vue";
import Topoffers from "./topoffers.vue";
// import Imgstore from "./imgstore.vue";

export default {
  components: {
    BIconCart3,
    BIconArrowRight,
    Allapi,
    Topoffers,
  },
  data() {
    return {
      allcategories: [],
      loading: false,
      list: [],
      result: [],
      mapped: [],
    };
  },
  mounted() {
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
    this.getAllOffers();
  },
  methods: {
    getAllOffers() {
      if ("get_all_offers" in sessionStorage) {
        var sdata = JSON.parse(sessionStorage.getItem("get_all_offers"));
        this.list = sdata;
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
        this.clearreq();
      } else {
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
          .finally(() => {
            this.loading = false;
            var len = document.getElementsByClassName("product_row").length;
            var qwe = document.getElementsByClassName("product_row");
            for (var v = 0; v < len; v++) {
              var bnm = document.getElementsByClassName("showcoupon");
              var ert = bnm[v].getElementsByClassName("couponhome").length;

              if (ert === 0) {
                document.getElementsByClassName("showcoupon")[v].style.display =
                  "none";
              }
              var rty = qwe[v].getElementsByClassName("product_card").length;
              if (rty === 0) {
                document.getElementsByClassName("iterdeal")[v].style.display =
                  "none";
                document.getElementsByClassName("iterbtn")[v].style.display =
                  "none";
                document.getElementsByClassName("iterrow")[v].style.display =
                  "none";
                document.getElementsByClassName("iterbot")[v].style.display =
                  "none";
              }
              for (var o = 0; o < rty; o++) {
                if (o > 11) {
                  var disk =
                    qwe[v].querySelectorAll(".product_card")[o].parentElement
                      .parentElement;

                  disk.style.display = "none";
                }
              }
            }
          });
      }
    },
    clearreq() {
      window.setTimeout(function () {
        this.loading = false;
        var len = document.getElementsByClassName("product_row").length;
        var qwe = document.getElementsByClassName("product_row");
        for (var v = 0; v < len; v++) {
          var bnm = document.getElementsByClassName("showcoupon");
          var ert = bnm[v].getElementsByClassName("couponhome").length;

          if (ert === 0) {
            document.getElementsByClassName("showcoupon")[v].style.display =
              "none";
          }
          var rty = qwe[v].getElementsByClassName("product_card").length;
          if (rty === 0) {
            document.getElementsByClassName("iterdeal")[v].style.display =
              "none";
            document.getElementsByClassName("iterbtn")[v].style.display =
              "none";
            document.getElementsByClassName("iterrow")[v].style.display =
              "none";
            document.getElementsByClassName("iterbot")[v].style.display =
              "none";
          }
          for (var o = 0; o < rty; o++) {
            if (o > 11) {
              var disk =
                qwe[v].querySelectorAll(".product_card")[o].parentElement
                  .parentElement;

              disk.style.display = "none";
            }
          }
        }
      }, 10000);
    },
    addToCart(offer_text, email) {
      this.loading = true;
      if (localStorage.getItem("log") === "true") {
        const payload = {
          offer_text: offer_text,
          seller_email: email,
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
            console.log(response);
            if (response.data.status === 200) {
              alert(response.data.msg);
              this.$router.push("/cart");
            } else {
              alert("something went wrong");
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          })
          .finally(() => (this.loading = false));
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.viewall {
  width: 200px;
  margin: 10px auto;
  background: #008cff;
  color: white;
  padding: 8px;
  text-align: center;
  border-radius: 28px;
  cursor: pointer;
}
.viewall:hover {
  opacity: 0.5;
}
.bbot {
  width: 100%;
  height: 4px;
  background: rgb(148, 148, 148);
  margin: 20px 0px;
}
a {
  text-decoration: none;
}
body {
  font-family: "Quicksand", sans-serif;
}
.heading {
  width: 100%;
  display: flex;
  margin: 10px 0;
  margin-top: 0px;
  font-weight: 900;
  padding: 10px;
  font-size: 25px;
  border-bottom: 1px solid #4242423f;
  font-family: "Roboto", sans-serif;
  background: white;
  border-left: 10px solid #008cff;
}
.coupons {
  background: url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  position: relative;
  width: 100%;
  height: 200px;
  /* background: #f0e8d5; */
  /* border-radius: 12px; */
  margin-bottom: 20px;
}

.disc {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #008cff;
  color: white;
  font-size: 16px;
  font-weight: 900;
  text-align: center;
  line-height: 1.5;
  padding: 5px;
  z-index: 100;
}
.filter {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  /* background-image: linear-gradient(#ff007700, #ff007700, #cc00ff); */
}
.shop_name {
  line-height: 1;
  font-weight: 600;
  color: #858585;
}
.offer {
  position: absolute;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  color: white;
  bottom: 10px;
  left: 10px;
  text-shadow: 2px 2px #000000c5;
}

@media screen and (max-width: 768px) {
  .coupons {
    background: url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80");
    background-size: cover;
    position: relative;
    width: 100%;
    height: 200px;
    /* background: #f0e8d5; */
    /* border-radius: 12px; */
    margin-bottom: 20px;
  }

  .filter {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 12px;
    /* background-image: linear-gradient(#ff007700, #ff007700, #cc00ff); */
  }

  .offer {
    position: absolute;
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    color: white;
    bottom: 10px;
    left: 10px;
    text-shadow: 2px 2px #000000c5;
  }
  .heading {
    width: 100%;
    display: flex;
    margin: 20px 0%;
    margin-top: 20px;
    font-weight: 900;
    padding: 20px;
    font-size: 25px;
    border-bottom: 1px solid #4242423f;
    font-family: "Roboto", sans-serif;
    background: white;
  }
}
.ad_img_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  margin-top: 0px;
  overflow: hidden;
  border-radius: 16px;
  text-align: center;
}
.ad_img {
  border-radius: 16px;
  z-index: -1;
  height: 100%;
}

.img_fill {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  border-radius: 16px;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(87, 68, 7));
}
.fill_text {
  position: absolute;
  height: 50%;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  font-size: 35px;
  font-weight: 900;
  padding: 10px;
  z-index: 101;
}
.gobutton {
  position: absolute;
  bottom: 20px;
  right: 10px;
  padding: 5px 7px;
  background: #008cff;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  width: fit-content;
}
.product_card {
  position: relative;
  background-color: #fff;
  overflow: hidden;
  /* max-height: 320px; */
  padding: 25px 15px 20px 15px;
  width: 100%;
  /* box-shadow: 0px 2px 6px 4px rgba(0, 0, 0, 0.062); */
  transition: 0.3s ease-in-out;
}

.product_card:hover {
  transform: scale(1.1);
}
.product_img {
  width: 100%;
  border-radius: 8px;
}

@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap");

.product_name {
  font-family: "Quicksand", sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: black;
  line-height: 1.2;
  padding: 10px 0px;
  height: 50px;
  overflow: hidden;
  -o-text-overflow: ellipsis; /* Opera < 11*/
  text-overflow: ellipsis; /* IE, Safari (WebKit), Opera >= 11, FF > 6 */
}
.product_cost {
  font-family: "Quicksand", sans-serif;
  font-size: 20px;
  color: #008cff;
  font-weight: 900;
  float: left;
}
.product_cost del {
  font-size: 14px;
  color: rgb(87, 87, 87);
}
.addtocart {
  float: right;
  padding: 0px 0px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 900;
  width: fit-content;
  color: #170057;
  transform: scale(0.8);
}
.disc {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: rgb(255, 29, 67);
  color: white;
  font-size: 16px;
  font-weight: 900;
  text-align: center;
  line-height: 1.5;
  padding: 5px;
  z-index: 100;
  transform: scale(0.7);
}
</style>