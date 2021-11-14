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
      active3="active_nav"
    ></topnav>
    <spinner v-if="loading"></spinner>
    <div class="w3-card c-m" style="background: white; margin-top: -30px">
      <div class="showfilter">
        <button class="showbtn" v-on:click="showFilter()">
          Add Product <i class="fa fa-angle-down"></i>
        </button>
      </div>
      <div class="w3-row">
        <div class="w3-twothird" style="padding: 10px">
          <b-card>
            <p class="c-domain">{{ category.category }}</p>
            <p class="c-shopname">{{ user.display_name }}</p>
            <p class="c-shoplocation">{{ user.address }}</p>
            <p class="c-shoplocation">Phone No. : {{ user.contact_no }}</p>
            <p class="c-shoplocation">Email : {{ user.email }}</p>
            <a href="/editsellerdetails">Edit account details</a>
            <p class="s-details">
              <!-- Date Joined : 2 jun 2021 | user since 2 months-->
            </p>
            <div class="w3-row">
              <div class="w3-third">
                <b-card style="margin: 10px; text-align: center">
                  <span class="tealbg">{{ coupons_sold }}</span>
                  <template #footer>
                    <div class="c-head">Number of Coupons Sold</div>
                    <br />
                  </template>
                </b-card>
              </div>
              <div class="w3-third">
                <b-card style="margin: 10px; text-align: center">
                  <span class="tealbg"
                    ><i class="fa fa-rupee"></i> {{ earning.earning }}</span
                  >
                  <template #footer>
                    <div class="c-head">Revenue Generated Through Us:</div>
                  </template>
                </b-card>
              </div>
            </div>
          </b-card>
        </div>
        <div class="w3-third" style="padding: 20px">
          <div class="filter">
            <div class="closeFilter">
              <button v-on:click="closeFilter()" class="closebtn">close</button>
            </div>
            <b-card>
              <h4
                style="
                  width: 100%;
                  border-bottom: 1px solid#cccccc;
                  padding-bottom: 10px;
                "
              >
                Add Product
              </h4>

              <input
                class="productinput"
                type="text"
                placeholder="Enter Product Name..."
                v-model="addproduct"
              />
              <button class="addprod" v-on:click="addProduct()">
                <i class="fa fa-plus"></i>
              </button>

              <li
                style="list-style-type: none"
                v-for="(products, index) in products.products"
                :key="index"
              >
                <div class="proname">
                  {{ index + 1 }}.
                  {{ products }}
                </div>
                <button class="delprod" v-on:click="deleteProduct(products)">
                  <i class="fa fa-trash"></i>
                </button>
              </li>
            </b-card>
          </div>
          <b-card>
            <router-link to="/logout">
              <b-button variant="danger" style="float: right"
                ><i class="fa fa-exclamation-triangle"></i> logout</b-button
              ></router-link
            >
          </b-card>
        </div>
      </div>
    </div>
    <div class="reduce"></div>

    <sitefooter></sitefooter>
  </div>
</template>
<script>
import Sitefooter from "../Customer/sitefooter.vue";
import topnav from "./topnav.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../Customer/spinner.vue";
export default {
  components: {
    topnav,
    Sitefooter,
    Spinner,
  },
  data() {
    return {
      user: {},
      status: undefined,
      earning: {},
      coupons_sold: {},
      category: [],
      products: [],
      addproduct: null,
      prod: [],
      del: [],
      myToggle: false,
      loading: false,
    };
  },
  mounted() {
    if (this.$session.get("user_type") === "seller") {
      document.getElementsByClassName("topnav")[0].style.height = "70px";
    }
    console.log(this.$session.get("userdata".location));
    this.user = this.$session.get("user_data");
    console.log(this.user);
    const offersurl = BASE_URL + "/seller/category";
    let JWTToken = this.$session.get("token");
    axios
      .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
      .then((response) => {
        this.category = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    this.getEarning();
    this.getCouponsSold();
    this.getProducts();
  },
  methods: {
    showFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = "0";
      document.getElementsByClassName("closeFilter")[0].style.bottom = "60%";
      document.getElementsByClassName("reduce")[0].style.display = "block";
    },
    closeFilter() {
      document.getElementsByClassName("filter")[0].style.bottom = "-100%";
      document.getElementsByClassName("closeFilter")[0].style.bottom = "-100%";
      document.getElementsByClassName("reduce")[0].style.display = "none";
    },
    getProducts() {
      this.loading = true;
      const url = BASE_URL + "/seller/product";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.products = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
    },
    addProduct() {
      this.loading = true;
      if (this.addproduct !== null) {
        this.prod.push(this.addproduct);
        const payload = {
          products: this.prod,
        };
        const accessToken = this.$session.get("token");
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const url = BASE_URL + "/seller/product";
        axios
          .post(url, payload, options)
          .then()
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          })
          .finally(() => (this.loading = false));
        this.$router.go();
      }
    },
    deleteProduct(products) {
      this.loading = true;
      this.del.push(products);

      const offersurl = BASE_URL + "/seller/product";
      let JWTToken = this.$session.get("token");
      const config = {
        data: {
          products: this.del,
        },
        headers: {
          Authorization: `Bearer ${JWTToken}`,
        },
      };
      axios
        .delete(offersurl, config)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.loading = false));
      this.$router.go();
    },
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
      const url = BASE_URL + "/seller/history";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.coupons_sold = response.data.history.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.topnav {
  height: 70px !important;
}
.c-domain {
  color: rgb(90, 90, 90);
  font-weight: 600;
  margin: 15px 5px 5px 5px;
  font-size: 15px;
  text-transform: uppercase;
}
.c-shopname {
  color: rgb(53, 53, 53);
  font-weight: 700;
  font-size: 30px;
  line-height: 0.9;
  text-transform: capitalize;
}

.c-shoplocation {
  color: rgb(90, 90, 90);
  font-size: 18px;
}
.s-details {
  color: rgb(90, 90, 90);
  font-size: 15px;
}
.tealbg {
  background: rgb(255, 255, 255);
  padding: 0px 7px;
  border-radius: 10px;
  color: teal;
  font-weight: 700;
  width: fit-content;
  margin: 5px auto;
  font-size: 25px;
}
.c-head {
  font-size: 15px;
  color: rgb(90, 90, 90);
  font-weight: 700;
  line-height: 2;
}
.c-m {
  padding: 10px 30px;
}
.delprod {
  background: none;
  padding: 3px;
  border: none;
  color: rgb(0 140 255);
}
.addprod {
  background: rgb(0 140 255);
  padding: 4px 8px;
  border: none;
  color: white;
  width: 15%;
  height: 40px;

  margin: 10px auto;
}
.productinput {
  padding: 4px;
  margin: 10px auto;
  height: 40px;
  width: 85%;
  border: none;
  background-color: rgba(231, 231, 231, 0.425);
}
.productinput:focus {
  border: 4px solid rgba(0, 140, 255, 0.521);
  outline: none;
}
.proname {
  font-size: 17px;
  text-transform: capitalize;
  width: 85%;
  display: inline-block;
  padding: 2px;
}

.showfilter {
  display: none;
  margin-top: -10px;
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
.closeFilter {
  display: none;
}
@media screen and (max-width: 600px) {
  .c-m {
    padding: 10px 0px;
  }
  .showfilter {
    display: block;
  }
  .filter {
    width: 100%;
    position: fixed;
    background: white;
    height: 60%;
    bottom: -100%;
    left: 0;
    transition: 0.5s;
    z-index: 2000;
    overflow-y: scroll;
  }
  .closeFilter {
    display: block;
    position: fixed;
    bottom: -100%;
    left: 0;
    width: 100%;
    margin: 0;
    height: 50px;
    transition: 0.5s;
    background-color: rgb(255, 255, 255);
    border-radius: 25px 25px 0px 0px;
    border-bottom: 1px solid rgb(185, 185, 185);
  }
}
@media screen and (max-width: 600px) {
  .w3-container {
    padding: 0px 0px 10px 0px !important;
  }
}
</style>