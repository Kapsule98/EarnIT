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
      active1="active_nav"
    ></topnav>
    <div class="w3-container">
      <div class="w3-row">
        <div class="w3-third form">
          <p class="heading" style="text-transform: capitalize">
            {{ user.shop_name }}
          </p>
          <h4>Verify a Coupon</h4>

          <b-form>
            <b-form-group
              id="input-group-1"
              label="Coupon Code"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                placeholder="enter coupon code"
                required
                v-model="r_offertxt"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="OTP:" label-for="input-2">
              <b-form-input
                type="number"
                id="input-2"
                placeholder="Enter OTP"
                required
                v-model="r_otp"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="Total Amount:"
              label-for="input-3"
            >
              <b-form-input
                type="number"
                id="input-3"
                placeholder="enter total amount"
                required
                v-model="r_total"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Discounted Amount:"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                placeholder="enter discounted amount"
                required
                type="number"
                v-model="r_discount"
              ></b-form-input>
            </b-form-group>

            <b-button
              variant="primary"
              style="float: right; background: #008cff"
              v-on:click="verifyCoupon()"
              >Verify</b-button
            >
          </b-form>
        </div>
        <div class="w3-twothird" style="padding: 20px">
          <h2 style="color: #4f4f4f">
            <div class="percent">Live Offers</div>
          </h2>
          <div class="w3-row">
            <div
              class="w3-third"
              v-for="offer in getoffers.active_offers"
              :key="offer.length"
            >
              <couponcard
                :name="offer.products[0]"
                v-bind:discount="offer.discount_percent + '%'"
                v-bind:left="offer.quantity + ' coupons'"
                v-bind:validity="
                  ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
                "
                v-bind:offer_text="offer.offer_text"
              ></couponcard>
            </div>
            <div class="w3-third">
              <div class="addoffer">
                <button @click="showAddCouponModal()">
                  <div class="plus"><i class="fa fa-plus"></i></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal ref="couponModal" hide-footer title="Add coupon details">
      <div class="d-block text-center">
        <h3>Add Coupon details</h3>
        <label for="range-3">Select no. of Coupons</label>
        <b-form-input
          id="range-3"
          v-model="quantity"
          type="range"
          min="0"
          max="50"
          step="1"
        ></b-form-input>
        <div class="mt-2">Value: {{ quantity }}</div>
        <br />
        <label for="range-1">Minimum Purchase</label>
        <b-form-input
          id="range-1"
          v-model="min_val"
          type="range"
          min="0"
          max="5000"
          step="100"
        ></b-form-input>
        <div class="mt-2">Value: Rs {{ min_val }}</div>
        <b-form-group
          label="Discount type"
          v-slot="{ ariaDescribedby }"
          style="padding: 20px 5px"
        >
          <b-form-radio-group
            v-model="discountType"
            :options="dTypeoptions"
            :aria-describedby="ariaDescribedby"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>

        <div v-if="discountType === 'ITEM_DISCOUNT'">
          <label for="range-1">Discount percent on item</label>
          <b-form-input
            id="range-1"
            v-model="discount_percent"
            type="range"
            min="0"
            max="100"
          ></b-form-input>
          <div class="mt-2">Value: {{ discount_percent }} %</div>
        </div>
        <div v-if="discountType === 'BILL_DISCOUNT'">
          <label for="range-2">Discount percent on total bill</label>
          <b-form-input
            id="range-2"
            v-model="discount_percent"
            type="range"
            min="0"
            max="100"
          ></b-form-input>
          <div class="mt-2">
            <span>Value: {{ discount_percent }} %</span>
          </div>
          <br />
        </div>
        <div v-if="discountType === 'dextraitem'">
          <label><span style="padding: 2px 5px">Enter offer :</span></label
          ><input type="text" v-model="customdiscount" />
        </div>
        <div v-if="discountType != ''">
          <label><span style="padding: 2px 5px">Validity</span> </label>
          <date-picker v-model="validity" type="date" range></date-picker>
        </div>
        <multiselect
          placeholder="Select Product/s"
          v-model="products"
          :options="getproducts.products"
          :multiple="true"
        />
      </div>
      <div>
        <label><span style="padding: 2px 5px">Offer Text :</span></label>
        <div class="offer_text"><input type="text" v-model="offer_text" /></div>
      </div>
      <b-button class="login-button" block @click="addCouponDetails()"
        >Add Coupon</b-button
      >
    </b-modal>

    <br /><br /><br />
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "./topnav.vue";
import couponcard from "./couponcard.vue";
import Sitefooter from "../Customer/sitefooter.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  components: { couponcard, topnav, Sitefooter, DatePicker },

  data() {
    return {
      r_offertxt: "",
      r_otp: "",
      r_total: "",
      r_discount: "",
      min_val: "500",
      quantity: "20",
      offer_text: "To be added",
      discount_percent: "50",
      offer_type: "",
      validity: [],
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      show: true,
      discountType: "",
      dTypeoptions: [
        { text: "Discount on item", value: "ITEM_DISCOUNT" },
        { text: "Discount on total bill", value: "BILL_DISCOUNT" },
        //{ text: "Extra Items", value: "ITEM_FREE" },
      ],
      itemdiscountpercent: "",
      billdiscountpercent: "",
      customdiscount: "",
      value: "500",
      value3: "20",
      products: [],
      getproducts: [],
      list: [],
      getoffers: {},
      user: {},
    };
  },
  mounted() {
    this.getUser();
    this.getSellerOffers();
    this.getProducts();
  },

  methods: {
    getProducts() {
      const url = BASE_URL + "/seller/product";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.getproducts = response.data;
          console.log(this.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verifyCoupon() {
      var r = confirm("Process the Coupon");
      if (r == true) {
        const payload = {
          otp: parseInt(this.r_otp),
          offer_text: this.r_offertxt,
          cp: parseInt(this.r_total),
          sp: parseInt(this.r_discount),
        };
        const accessToken = this.$session.get("token");
        const options = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const url = BASE_URL + "/seller/redeem";
        axios
          .post(url, payload, options)
          .then((response) => console.log(response), console.log(payload))
          .catch((error) => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
          });
        this.$router.go();
      } else {
        document.getElementById("reedem").style.color = "white";
      }
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    registerSellerDetails() {
      this.$router.push("/seller/registerdetails");
    },
    showAddCouponModal() {
      this.$refs["couponModal"].show();
    },
    addCouponDetails() {
      var epoch = [];
      epoch[0] = this.validity[0].getTime() / 1000.0;
      epoch[1] = this.validity[1].getTime() / 1000.0;
      //TODO validate input and store in db
      // POST request using axios with error handling
      const payload = {
        offer: {
          validity: epoch,
          type: this.discountType,
          discount_percent: this.discount_percent,
          offer_text: this.offer_text,
          quantity: parseInt(this.quantity),
          min_val: this.min_val,
          products: this.products,
        },
      };

      console.log(epoch);
      const url = BASE_URL + "/seller/offer";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      console.log("discount type = ", this.discountType);

      console.log(
        this.itemdiscountpercent,
        this.billdiscountpercent,
        this.customdiscount,
        this.validity
      );
      this.$refs["couponModal"].hide();
      alert("Coupon added Sucessfully");
      this.$router.go();
    },
    getUser() {
      this.user = this.$session.get("user_data");
    },
    getSellerOffers() {
      const offersurl = BASE_URL + "/seller/offer";
      let JWTToken = this.$session.get("token");
      axios
        .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.getoffers = response.data;
          console.log("hello" + response);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.offer_text input {
  width: 100%;
  height: 40px;
  border: 1px solid rgb(141, 141, 141);
  padding: 5px 10px;
  border-radius: 5px;
}
.offer_text input:focus {
  outline: none;
  border: 4px solid rgba(0, 183, 255, 0.411);
}
.login-button {
  width: 100%;
  padding: 6px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 153, 255);
  color: rgb(0, 153, 255);
  font-size: 20px;
  background: none;
  margin: 20px 0px;
  transition: 0.2s ease-in-out;
}
.login-button:hover {
  background: rgb(0, 153, 255);
  color: white;
}
body {
  margin: 0;
  overflow-x: hidden;
}
.heading {
  font-size: 30px;
  font-weight: 700;
  color: teal;
}
h4 {
  color: rgb(139, 139, 139);
}

.fire {
  font-size: 30px;
  animation: fire 1s infinite linear;
  width: fit-content;
  display: inline-table;
}

@keyframes fire {
  50% {
    transform: scale(1.2);
  }
}
.form {
  position: sticky;
  padding: 0px 30px;
  border-right: 1px solid rgb(233, 233, 233);
}
.percent {
  letter-spacing: 2px;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid rgb(233, 233, 233);
  padding-bottom: 20px;
}
.addoffer {
  width: 80%;
  border-radius: 7px;
  padding: auto;
  padding-top: 70px;
  text-align: center;
  color: rgb(226, 226, 226);
  font-family: "Tahoma", sans-serif;
  position: relative;
  margin: 20px auto;
  height: 280px;
  transition: 0.5s ease-in-out;
  background: rgb(241, 241, 241);
}
.plus {
  margin: auto;
  font-size: 50px;
  padding: 12px 30px;
  border-radius: 50px;
  width: fit-content;
  background: rgb(199, 199, 199);
  color: white;
}
.plus:hover {
  animation: spin 1s 1;
}

.addoffer button {
  border: none;
  background: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 600px) {
  .w3-container {
    padding: 0px 0px 10px 0px !important;
  }
}
</style>
