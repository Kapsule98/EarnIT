<template>
  <div>
    <topnav
      link1='<i class="fa fa-cubes"></i> Dashboard'
      link2='<i class="fa fa-money"></i> Customer Bill'
      link3='<i class="fa fa-user"></i> Account'
      url1="/verifycoupon"
      url2="/customerbill"
      url3="/account"
      url4="/"
      url5="/"
      url6="/"
      active3="active_nav"
    ></topnav>

    <div class="w3-card c-m" style="background: white; margin-top: -30px">
      <div class="w3-row">
        <div class="w3-twothird" style="padding: 10px">
          <b-card>
            <button class="w3-button w3-teal" style="font-weight: 600">
              ACTIVE
            </button>
            <p class="c-domain">{{ category.category }}</p>
            <p class="c-shopname">{{ user.shop_name }}</p>
            <p class="c-shoplocation">{{ user.address }}</p>
            <p class="c-shoplocation">Phone No. : {{ user.contact_no }}</p>
            <p class="s-details">
              <!-- Date Joined : 2 jun 2021 | user since 2 months-->
            </p>
            <div class="w3-row">
              <div class="w3-third">
                <b-card style="margin: 10px; text-align: center">
                  <span class="tealbg">67</span>

                  <template #footer>
                    <div class="c-head">Number of Customers</div>
                  </template>
                </b-card>
              </div>
              <div class="w3-third">
                <b-card style="margin: 10px; text-align: center">
                  <span class="tealbg">{{ coupons_sold.coupons_sold }}</span>
                  <template #footer>
                    <div class="c-head">Number of Coupons Sold</div>
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
          <b-card>
            <ul style="list-style-type: none">
              <li><a href="/editsellerdetails">Edit account details</a></li>
              <h1>Add Product</h1>

              <input type="text" v-model="addproduct" />
              <button v-on:click="addProduct()">add product</button>
            </ul>
            <li v-for="products in products.products" :key="products.length">
              {{ products }}
              <button v-on:click="deleteProduct(products)">delete</button>
            </li>
          </b-card>
        </div>
      </div>
    </div>
    <sitefooter></sitefooter>
  </div>
</template>
<script>
import Sitefooter from "../Customer/sitefooter.vue";
import topnav from "./topnav.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: {
    topnav,
    Sitefooter,
  },
  data() {
    return {
      user: {},
      status: undefined,
      earning: {},
      coupons_sold: {},
      category: [],
      products: [],
      addproduct: "",
      prod: [],
      del: [],
    };
  },
  mounted() {
    console.log((this.user = this.$session.get("token")));
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
    getProducts() {
      const url = BASE_URL + "/seller/product";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.products = response.data;
          console.log(this.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProduct() {
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
        .then((response) => console.log(response), console.log(payload))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
      this.$router.go();
    },
    deleteProduct(products) {
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
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.go();
    },
    getEarning() {
      const url = BASE_URL + "/seller/earning";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.earning = response.data;
          console.log(this.earning);
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
          console.log(this.coupons_sold);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.c-domain {
  color: rgb(90, 90, 90);
  font-weight: 600;
  margin: 15px 5px 5px 5px;
  font-size: 15px;
  text-transform: uppercase;
}
.c-shopname {
  color: teal;
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
@media screen and (max-width: 600px) {
  .c-m {
    padding: 10px 0px;
  }
}
@media screen and (max-width: 600px) {
  .w3-container {
    padding: 0px 0px 10px 0px !important;
  }
}
</style>