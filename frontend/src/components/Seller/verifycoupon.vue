<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-rupee"></i> Customer Bill'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-lock"></i> logout'
    ></topnav>
    <div class="w3-container">
      <div class="w3-row">
        <div class="w3-third form">
          <p class="heading">Rakesh Digital</p>
          <h4>Fill coustomer details</h4>

          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Customer ID  "
              label-for="input-1"
              description=""
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter Customer Id"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Coupon Code"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.name"
                placeholder="enter coupon code"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Total Amount:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                placeholder="enter total amount"
                required
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
              ></b-form-input>
            </b-form-group>

            <b-button
              type="submit"
              variant="primary"
              style="float: right; background: teal"
              >Save</b-button
            >
          </b-form>
        </div>
        <div class="w3-twothird" style="padding: 20px">
          <h2 style="color: #4f4f4f">
            <div class="percent">Live Offers</div>
          </h2>
          <div class="w3-row">
            <div class="w3-third">
              <couponcard name="ELECTRONICS" discount="50%"></couponcard>
            </div>
            <div class="w3-third">
              <couponcard name="Vegetables" discount="30%"></couponcard>
            </div>
            <div class="w3-third">
              <couponcard name="Beauty products" discount="20%"></couponcard>
            </div>
            <div class="w3-third">
              <couponcard name="NCERT Books" discount="40%"></couponcard>
            </div>
            <div class="w3-third">
              <couponcard name="Grocery" discount="10%"></couponcard>
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
                    <h3>Add Coupon details </h3>
                        <b-form-group label="Discount type" v-slot="{ ariaDescribedby }" style="padding:20px 5px">
                            <b-form-radio-group
                                v-model="discountType"
                                :options="dTypeoptions"
                                :aria-describedby="ariaDescribedby"
                                name="radio-options"
                            ></b-form-radio-group>
                        </b-form-group>
                        <div v-if="discountType === 'ditem'">
                        
                            <label for="range-1">Discount percent on item</label>
                            <b-form-input id="range-1" v-model="itemdiscountpercent" type="range" min="0" max="100"></b-form-input>
                            <div class="mt-2">Value: {{ itemdiscountpercent }} %</div>
                        
                        </div>
                        <div v-if="discountType === 'dbill'">
                            <label for="range-2">Discount percent on total bill</label>
                            <b-form-input id="range-2" v-model="billdiscountpercent" type="range" min="0" max="100"></b-form-input>
                            <div class="mt-2"><span >Value: {{ billdiscountpercent }} %</span></div>
                            <br/>
                        </div>
                        <div v-if="discountType === 'dextraitem'">
                            <label><span style="padding:2px 5px">Enter offer :</span></label><input type="text" v-model="customdiscount"/>
                        </div>
                        <div v-if="discountType != ''">
                            <label><span style="padding:2px 5px">Validity</span> </label>
                            <date-picker v-model="validity" type="date" range></date-picker>
                        </div>
                </div>
                <b-button class="login-button" block @click="addCouponDetails();">Add Coupon</b-button>
           
            </b-modal>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "./topnav.vue";
import couponcard from "./couponcard.vue";
import Sitefooter from "../Customer/sitefooter.vue";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  components: { couponcard, topnav, Sitefooter,DatePicker },
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
      discountType: "",
      dTypeoptions: [
        { text: "Discount on item", value: "ditem" },
        { text: "Discount on total bill", value: "dbill" },
        { text: "Extra Items", value: "dextraitem" },
      ],
      itemdiscountpercent: "",
      billdiscountpercent: "",
      customdiscount: "",
      validity: [],
    };
  },
  methods: {
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
      //TODO validate input and store in db

      console.log("discount type = ", this.discountType);

      console.log(
        this.itemdiscountpercent,
        this.billdiscountpercent,
        this.customdiscount,
        this.validity
      );
      this.$refs["couponModal"].hide();
    },
  },
};
</script>

<style scoped>
.login-button{
    width:100%;
    padding:6px;
    text-align: center;
    border-radius: 5px;
    border:1px solid rgb(0, 153, 255);
    color: rgb(0, 153, 255);
    font-size: 20px;
    background: none;
    margin: 20px 0px;
    transition: 0.2s ease-in-out;
}
.login-button:hover{
    background:rgb(0, 153, 255);
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
  width: 100%;
  border-radius: 7px;
  padding: auto;
  padding-top: 70px;
  text-align: center;
  color: rgb(226, 226, 226);
  font-family: "Tahoma", sans-serif;
  position: relative;
  margin: 40px auto;
  height: 250px;
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
