<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :searchbar="true"
      :display_categories="true"
    ></topnav>
    <b-card>
      <b-container>
        <b-row>
          <b-col sm="5" cols="12">
            <img :src="img" alt=".." class="product" />
          </b-col>

          <b-col sm="7" cols="12">
            <b-card style="background: #fffef5; margin-bottom: 40px">
              <h1 class="name">
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
              <b-card bg-variant="light" style="max-width: 300px">
                <b-card-text
                  ><h6>
                    <del><i class="fa fa-rupee"></i> {{ mrp }}</del>
                    <div class="cost"><i class="fa fa-rupee"></i> {{ op }}</div>
                    <div class="offer">
                      You Save: &#8377; {{ mrp - op }}({{
                        Math.round(((mrp - op) / mrp) * 100)
                      }}%)
                    </div>
                  </h6></b-card-text
                >
              </b-card>

              <div class="cartbtn" v-on:click="addToCart(offer_text, seller)">
                Add to cart
              </div>
              <br /><br />
              <b-card
                border-variant="primary"
                header="Product Description"
                header-bg-variant="primary"
                header-text-variant="white"
                align="left"
              >
                <b-card-text>
                  <div class="i_con">
                    {{ desc }}
                  </div></b-card-text
                >
              </b-card>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card>

    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: { topnav, Sitefooter },
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
    };
  },
  mounted() {
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
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
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
.byso {
  font-size: 16px;
  margin: 4px 0px;
}
.product {
  width: 80%;
  margin: 22px auto;
  border: 1px solid black;
}
.name {
  padding: 10px;
  margin-top: 10px;
  border-bottom: 1px solid rgb(172, 172, 172);
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
  max-width: 350px;
  margin: 30px 0px 10px 10px;
  background: #008cff;
  color: white;
  text-align: center;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 48px;
  cursor: pointer;
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

@media screen and (max-width: 700px) {
  .product {
    width: 100%;
    margin: 0px;
  }
  .name {
    padding: 10px 0px;
    margin-top: 10px;
  }
}
</style>