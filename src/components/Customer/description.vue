<template>
  <div>
    <spinner v-if="loading"></spinner>
    <topnav :searchbar="true" :display_categories="true"></topnav>

    <b-card style="margin: 0px 10px">
      <b-container>
        <b-row>
          <b-col sm="6" cols="12">
            <h1 class="name smallsc">
              {{ name }}

              <div class="byso">
                <router-link
                  :to="{
                    path: '/seller',
                    query: {
                      seller: seller,
                    },
                  }"
                  >by {{ shop }}</router-link
                >
              </div>
            </h1>
            <b-row no-gutters>
              <b-col sm="1" cols="12" class="largesc">
                <div class="imgnav">
                  <div v-for="i in img.length" :key="i.length">
                    <img
                      :src="img[i - 1]"
                      @click="showImg(i - 1)"
                      alt=".."
                      class="productnav"
                    />
                  </div>
                </div>
              </b-col>
              <b-col sm="11" cols="12">
                <img :src="img[imgindex]" alt=".." class="product" />
              </b-col>
              <b-col sm="1" cols="12" class="smallsc">
                <div class="imgnav">
                  <div v-for="i in img.length" :key="i.length">
                    <img
                      :src="img[i - 1]"
                      @click="showImg(i - 1)"
                      alt=".."
                      class="productnav"
                    />
                  </div>
                </div>
                <br />
              </b-col>
            </b-row>
          </b-col>

          <b-col sm="6" cols="12">
            <h1 class="name largesc">
              {{ name }}

              <div class="byso">
                <router-link
                  :to="{
                    path: '/seller',
                    query: {
                      seller: seller,
                    },
                  }"
                  >by {{ shop }}</router-link
                >
              </div>
            </h1>
            <b-card style="margin-top: 20px">
              <h6>
                <del><i class="fa fa-rupee"></i> {{ mrp }}</del>
                <div class="cost"><i class="fa fa-rupee"></i> {{ op }}</div>
                <div class="offer">
                  You Save: &#8377; {{ mrp - op }}({{
                    Math.round(((mrp - op) / mrp) * 100)
                  }}%)
                </div>
                <!-- <div class="offer" style="font-size: 15px">
                  Product Code :
                  <span style="color: blue">{{ offer_text }}</span>
                </div> -->
              </h6>
            </b-card>
            <b-row>
              <b-col sm="6" cols="12">
                <div class="cartbtn" v-on:click="addToCart(offer_text, seller)">
                  <b-icon-heart></b-icon-heart> Add to Wishlist
                </div></b-col
              >
              <b-col sm="6" cols="12">
                <div class="sharewrap">
                  <i
                    @click="sharePage()"
                    class="fa fa-instagram"
                    style="color: #008cff; padding: 10px; font-size: 24px"
                  ></i>
                  <i
                    @click="sharePage()"
                    class="fa fa-facebook"
                    style="color: #008cff; padding: 10px; font-size: 24px"
                  ></i>
                  <i
                    @click="sharePage()"
                    class="fa fa-snapchat"
                    style="color: #008cff; padding: 10px; font-size: 24px"
                  ></i>
                  <i
                    @click="sharePage()"
                    class="fa fa-pinterest"
                    style="color: #008cff; padding: 10px; font-size: 24px"
                  ></i>
                </div>
              </b-col>
            </b-row>
            <br />

            <div class="deschead">Description</div>
            <div class="i_con">
              {{ desc }}
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-card style="margin: 10px">
      <center><h4>More Products from this shop</h4></center>
      <b-row style="padding: 10px 20px; background: white" no-gutters>
        <b-col sm="12">
          <b-row no-gutters class="product_row" id="iteration">
            <template v-for="offer in mapped">
              <b-col
                sm="2"
                cols="6"
                :key="offer.length"
                v-if="
                  Math.floor(new Date().getTime() / 1000.0) <
                    list.offers[offer.index].validity[1] &&
                  Math.floor(new Date().getTime() / 1000.0) >
                    list.offers[offer.index].validity[0] &&
                  list.offers[offer.index].type === 'FIXED'
                "
                class="countno"
              >
                <router-link
                  :to="{
                    path: '/product_description',
                    query: {
                      seller: list.seller_email,
                      offer_text: list.offers[offer.index].offer_text,
                    },
                  }"
                >
                  <div class="product_card">
                    <div>
                      <img
                        :src="list.offers[offer.index].image_url[0]"
                        alt=""
                        class="product_img"
                      />
                    </div>
                    <div class="product_name">
                      <span
                        v-b-tooltip.hover
                        :title="list.offers[offer.index].products + ' '"
                      >
                        {{ list.offers[offer.index].products.toString() }}
                      </span>
                    </div>
                    <div class="shop_name">
                      {{ list.display_name }}
                    </div>
                    <div class="disc">
                      {{
                        Math.round(
                          ((list.offers[offer.index].mrp -
                            list.offers[offer.index].offer_price) /
                            list.offers[offer.index].mrp) *
                            100
                        )
                      }}% OFF
                    </div>
                    <div class="product_cost">
                      <i class="fa fa-inr" aria-hidden="true"></i>
                      {{ list.offers[offer.index].offer_price }}
                      <del>
                        <i class="fa fa-inr" aria-hidden="true"></i>
                        {{ list.offers[offer.index].mrp }}</del
                      >
                    </div>

                    <div
                      class="addtocart"
                      v-on:click="
                        addToCart(
                          list.offers[offer.index].offer_text,
                          list.seller_email
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
    </b-card>

    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Spinner from "./spinner.vue";
import { BIconHeart } from "bootstrap-vue";

export default {
  components: { topnav, Sitefooter, Spinner, BIconHeart },
  props: {
    seller: {
      type: String,
      default: null,
    },
    offer_text: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      list: [],
      name: "",
      mrp: "",
      op: "",
      desc: "",
      shop: "",
      img: "",
      email: "",
      loading: false,
      result: [],
      mapped: [],
      imgindex: 0,
    };
  },
  mounted() {
    this.loading = true;
    const url = BASE_URL + "/get_offers_by_shop/" + this.seller;
    axios
      .get(url)
      .then((response) => {
        this.list = response.data;
        console.log(this.list);
        var ele = this.list.offers;
        for (var i = 0; i < ele.length; i++) {
          if (ele[i].offer_text === this.offer_text) {
            this.name = ele[i].products.toString();
            this.mrp = parseInt(ele[i].mrp);
            this.op = parseInt(ele[i].offer_price);
            this.desc = ele[i].bio;
            this.shop = this.list.display_name;
            this.img = ele[i].image_url;
            this.email = ele[i].email;
          }
        }
        var discount = [];
        for (var j = 0; j < ele.length; j++) {
          discount[j] = ele[j].discount_percent;
        }

        var mapped = discount.map(function (el, j) {
          return { index: j, value: el };
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
        console.log(mapped);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
        var iter = document.getElementById("iteration");
        var count = iter.getElementsByClassName("countno").length;
        if (count > 6)
          for (var i = 5; i < count; i++) {
            document.getElementsByClassName("countno")[i].remove();
          }
      });
  },
  watch: {
    offer_text: function () {
      this.$router.go("/");
    },
  },
  methods: {
    showImg(index) {
      this.imgindex = index;
      var ele = document.getElementsByClassName("productnav");
      for (var i = 0; i < ele.length; i++) {
        ele[i].style.border = "1px solid gray";
      }
      ele[index].style.border = "3px solid rgba(255, 166, 0, 0.63)";
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
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
.sharewrap {
  width: 100%;
  text-align: center;
  margin-top: 30px;
}
.activeimage {
  box-shadow: 17px 5px 400px 16px rgba(255, 123, 0, 0.64);
  -webkit-box-shadow: 17px 5px 400px 16px rgba(255, 123, 0, 0.64);
  -moz-box-shadow: 17px 5px 400px 16px rgba(255, 123, 0, 0.64);
}
.imgnav {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 22px auto;
}
.productnav {
  width: 100%;
  border: 1px solid grey;
  margin-bottom: 5px;
}
a {
  text-decoration: none;
}
body {
  font-family: "Rubik", sans-serif;
  background: aqua;
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
.byso {
  font-size: 16px;
  margin: 4px 0px;
}
.product {
  width: 96%;
  margin: 22px 2%;
  border: 1px solid black;
}
.name {
  padding: 10px;
  margin-top: 10px;
  border-bottom: 1px solid rgb(172, 172, 172);
  font-size: 24px;
}
.cost {
  font-size: 1.5em;
  display: inline;
  margin-left: 10px;
  color: rgb(44, 44, 44);
  font-weight: 500;
  color: #00325a;
}
.cartbtn {
  width: 80%;
  max-width: 300px;
  margin: 30px 0px 10px 10px;
  background: #008cff;
  color: rgb(255, 255, 255);
  text-align: center;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}
.cartbtn:hover {
  opacity: 0.5;
}

.info {
  width: 80%;
  padding: 15px 5px;
  margin: 30px 0px;
  border-radius: 14px;
}
.i_con {
  font-size: 14px;
  color: rgb(31, 31, 31);
}
.offer {
  font-size: 17px;
  margin: 10px 0px;
  color: rgb(59, 22, 0);
}
.product {
  transition: 0.6s ease-in-out;
}
.smallsc {
  display: none;
}
.deschead {
  font-size: 18px;
  border-bottom: 2px solid rgb(0, 68, 255);
  width: fit-content;
  padding: 2px 0px;
  margin-bottom: 10px;
}
@media screen and (max-width: 767px) {
  .product {
    width: 100%;
    margin: 0px;
  }
  .name {
    padding: 0px 0px;
    margin-top: 10px;
  }
  .largesc {
    display: none;
  }
  .smallsc {
    display: block;
  }
  .imgnav {
    width: 100%;
    display: block;
    margin: 0opx;
  }
  .productnav {
    width: 24%;
    border: 1px solid grey;
    margin-bottom: 0px;
    margin-right: 1%;
    float: left;
  }
  .cartbtn {
    width: 80%;
    max-width: 300px;
    margin: 30px auto 10px auto;
  }
  .sharewrap {
    width: 100%;
    text-align: center;
    margin-top: 0px;
  }
}
</style>