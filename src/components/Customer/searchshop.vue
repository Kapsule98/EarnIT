<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/account"
      url4="/cart"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :display_categories="true"
      :productsearch="true"
    ></topnav>
    <!--<allcatrgories></allcatrgories>-->

    <div class="w3-row">
      <div class="showfilter">
        <button class="showbtn" v-on:click="showFilter()">
          category <i class="fa fa-angle-down"></i>
        </button>
      </div>
      <div class="filter">
        <div class="closeFilter">
          <button v-on:click="closeFilter()" class="closebtn">close</button>
        </div>
        <div class="w3-col m2">
          <div class="w3-container" style="border-right: 2px solid #cccccc">
            <h5>Category</h5>

            <div
              style="display: block; line-height: 0.5"
              v-for="(items, index) in allcategories"
              :key="items"
            >
              <input
                v-if="items === category"
                style="margin: 3px"
                type="checkbox"
                checked="true"
                :id="'check' + index"
                v-on:click="searchShop(items, index)"
              />
              <input
                v-else
                style="margin: 3px"
                type="checkbox"
                :id="'check' + index"
                v-on:click="searchShop(items, index)"
              />
              <label :for="'check' + index"> {{ items }}</label>
            </div>
            <br />
            <h5>Search by</h5>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="sby1"
                v-on:click="byFilter(1, 1)"
              />
              <label for="sby1"> Product</label>
            </div>
            <div style="display: block; line-height: 0.5">
              <input
                style="margin: 3px"
                type="checkbox"
                id="sby2"
                v-on:click="byFilter(2, 2)"
              />
              <label for="sby2">Shop</label>
            </div>
            <br />
          </div>
        </div>
      </div>
      <div class="w3-col m10" id="Sproducts">
        <div v-for="shop in list.sellers" :key="shop.length" class="Scard">
          <span>
            <div class="couponcard">
              <div class="w3-row">
                <div class="w3-col m9">
                  <div class="w3-col imgcol">
                    <div v-if="shop.category === 'Health'">
                      <img
                        src="../../assets/health.jpg"
                        class="thumbnail"
                        alt=""
                      />
                    </div>
                    <div v-else-if="shop.category === 'Fashion'">
                      <img
                        src="../../assets/fashion.jpg"
                        class="thumbnail"
                        alt=""
                      />
                    </div>
                    <div v-else-if="shop.category === 'Furniture'">
                      <img
                        src="../../assets/furnishing.jpg"
                        class="thumbnail"
                        alt=""
                      />
                    </div>
                    <div v-else-if="shop.category === 'Food'">
                      <img
                        src="../../assets/food.jpg"
                        class="thumbnail"
                        alt=""
                      />
                    </div>
                    <div v-else-if="shop.category === 'Electronics'">
                      <img
                        src="../../assets/electronics.jpg"
                        class="thumbnail"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="w3-col contentcol" style="width: 80%">
                    <div class="card_item">
                      <name> {{ shop.display_name }} </name>
                    </div>

                    <div class="w3-row">
                      <div class="w3-third">
                        <div class="card_leftcoupons">
                          <address>{{ shop.address }}</address>
                        </div>
                      </div>
                      <div class="w3-third"></div>
                    </div>
                  </div>
                </div>
                <div class="w3-col m3">
                  <router-link
                    :to="{
                      path: '/seller',
                      query: { seller: shop.shop_name },
                    }"
                  >
                    <button
                      class="w3-button"
                      style="
                        width: 80%;
                        margin: 30px auto;
                        background: #008cff;
                        color: white;
                      "
                    >
                      View Shop
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="reduce"></div>
    <sitefooter></sitefooter>
  </div>
</template>



<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
//import allcatrgories from "./allcategories.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: { topnav, Sitefooter },
  props: {
    category: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      list: [],
      allcategories: [],
    };
  },
  mounted() {
    this.getShops();
    document.getElementById("sby2").checked = true;
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
  },
  methods: {
    showFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = 0;
      document.getElementsByClassName("reduce")[0].style.display = "block";
    },
    closeFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = "-100%";
      document.getElementsByClassName("reduce")[0].style.display = "none";
    },
    searchShop(category, index) {
      this.$router.push("/search_by_shop?category=" + category);
      this.$router.go();
      this.getShops();
      for (var i = 0; i < 20; i++) {
        if (index !== i) {
          document.getElementById("check" + i).checked = false;
        } else {
          document.getElementById("check" + i).checked = true;
        }
      }
    },
    byFilter(p) {
      if (this.category === null && p !== 1) {
        alert("please select a category first");
      } else {
        if (p === 1) {
          this.$router.push("/search?category=" + this.category);
        } else if (p === 2) {
          document.getElementById("sby2").checked = true;
        }
      }
    },
    getShops() {
      const offersurl = BASE_URL + "/get_shops/" + this.category;
      axios
        .get(offersurl)
        .then((response) => {
          this.list = response.data;
          console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.botbtn {
  background: #008cff;
  width: fit-content;
  color: white;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 18px;
  float: right;
  border: none;
  margin: 20px;
  font-weight: 500;
}
.greyback {
  position: fixed;
  top: -20%;
  left: 0;
  width: 100%;
  height: 140%;
  background: rgb(241, 248, 248);
  z-index: -100;
}
.domain {
  color: rgb(196, 196, 196);
  font-weight: 600;
  margin: 15px 5px 5px 5px;
  font-size: 15px;
  text-transform: uppercase;
}
.shopname {
  color: teal;
  font-weight: 700;
  font-size: 30px;
  line-height: 0.9;
}

.shoplocation {
  color: rgb(151, 151, 151);
  font-size: 18px;
}
.couponcard {
  width: 95%;
  padding: 20px;
  margin: 10px auto;
  border-bottom: 1px solid rgb(214, 214, 214);
}

.card_item {
  font-size: 20px;
  color: teal;
  float: left;
  margin-top: -5px;
  padding-left: 20px;
  width: fit-content;
  display: block;
  font-weight: 400;
}
.card_discount {
  padding: 20px;
  font-size: 20px;
  color: rgb(49, 49, 49);
}
.card_validity {
  padding: 25px;
  font-size: 14px;
  color: rgb(85, 85, 85);
}
.card_leftcoupons {
  padding: 20px;
  font-size: 18px;
  color: rgb(61, 61, 61);
}
.card_remaining {
  font-size: 15px;
  color: rgb(252, 88, 88);
  display: block;
  width: 100%;
  padding: 10px 20px;
}
.thumbnail {
  width: 100px;
  border-radius: 50%;
}
.imgcol {
  width: 12%;
}
.contentcol {
  width: 90%;
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
