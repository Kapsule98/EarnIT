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
          <p
            class="heading"
            style="text-transform: capitalize; color: rgb(53, 53, 53)"
          >
            {{ user.display_name }}
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
                @change="calcoffer()"
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
                v-model="r_total"
                type="number"
                id="input-3"
                placeholder="enter total amount"
                required
                v-on:change="calcdisc()"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Discounted Amount:"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                placeholder=" discounted amount"
                type="number"
                disabled
                v-model="r_discount"
              ></b-form-input>
            </b-form-group>

            <b-button
              variant="primary"
              style="float: right; background: #008cff"
              @click="verifyCoupon()"
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
              <div
                v-if="
                  Math.floor(new Date().getTime() / 1000.0) <
                    offer.validity[1] &&
                  Math.floor(new Date().getTime() / 1000.0) >
                    offer.validity[0] &&
                  offer.quantity > 0
                "
              >
                <couponcard
                  v-if="offer.type !== 'FIXED'"
                  v-b-tooltip.hover
                  title="Total Bill"
                  name="Total Bill"
                  v-bind:discount="offer.discount_percent + '%'"
                  v-bind:left="offer.quantity + ' coupons'"
                  v-bind:validity="
                    ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
                  "
                  v-bind:offer_text="offer.offer_text"
                ></couponcard>
                <couponcard
                  v-else-if="offer.type === 'FIXED'"
                  v-b-tooltip.hover
                  :title="offer.products.toString()"
                  :name="offer.products.toString()"
                  v-bind:discount="Math.round(offer.discount_percent) + '%'"
                  v-bind:left="offer.quantity + ' coupons'"
                  v-bind:validity="
                    ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
                  "
                  v-bind:offer_text="offer.offer_text"
                  :mrp="'Rs ' + offer.mrp"
                  :offer_price="'Rs ' + offer.offer_price"
                ></couponcard>
              </div>
            </div>
            <div class="w3-third">
              <div class="addoffer">
                <button @click="showAddCouponModal()">
                  <div class="plus"><i class="fa fa-plus"></i></div>
                </button>
              </div>
            </div>
          </div>

          <div class="w3-row">
            <h2 style="color: #4f4f4f; margin-top: 30px">
              <div class="percent">Planned Offers</div>
            </h2>
            <div
              class="w3-third"
              v-for="offer in getoffers.active_offers"
              :key="offer.length"
            >
              <div
                v-if="
                  Math.floor(new Date().getTime() / 1000.0) <
                    offer.validity[1] &&
                  offer.validity[0] > Math.floor(new Date().getTime() / 1000.0)
                "
              >
                <couponcard
                  v-if="offer.type !== 'FIXED'"
                  v-b-tooltip.hover
                  title="Total Bill"
                  :planned="true"
                  :validfrom="
                    moment(offer.validity[0] * 1000).format('DD-MM-YYYY')
                  "
                  name="Total Bill"
                  :discount="offer.discount_percent + '%'"
                  :left="offer.quantity + ' coupons'"
                  :validity="
                    ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
                  "
                  :offer_text="offer.offer_text"
                ></couponcard>
                <couponcard
                  v-else-if="offer.type === 'FIXED'"
                  v-b-tooltip.hover
                  :title="offer.products[0]"
                  :name="offer.products[0]"
                  :planned="true"
                  v-bind:discount="Math.round(offer.discount_percent) + '%'"
                  v-bind:left="offer.quantity + ' coupons'"
                  v-bind:validity="
                    ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
                  "
                  v-bind:offer_text="offer.offer_text"
                  :mrp="'Rs ' + offer.mrp"
                  :offer_price="'Rs ' + offer.offer_price"
                ></couponcard>
              </div>
            </div>
          </div>
          <div class="w3-row">
            <h2 style="color: #4f4f4f; margin-top: 30px">
              <div class="percent">Expired Offers</div>
            </h2>
            <div
              class="w3-third"
              v-for="offer in getoffers.active_offers"
              :key="offer.length"
            >
              <div
                v-if="
                  Math.floor(new Date().getTime() / 1000.0) >
                    offer.validity[1] || offer.quantity <= 0
                "
              >
                <couponcard
                  v-if="offer.type !== 'FIXED'"
                  v-b-tooltip.hover
                  title="Total Bill"
                  :expired="true"
                  name="Total Bill"
                  v-bind:discount="offer.discount_percent + '%'"
                  v-bind:left="offer.quantity + ' coupons'"
                  :validity="
                    ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
                  "
                  :offer_text="offer.offer_text"
                ></couponcard>

                <div id="repeatmodal" class="w3-modal">
                  <div class="w3-modal-content w3-animate-zoom w3-card-4">
                    <header
                      class="w3-container"
                      style="background-color: #36cdff"
                    >
                      <span
                        onclick="document.getElementById('repeatmodal').style.display='none'"
                        class="w3-button w3-display-topright"
                        >&times;</span
                      >
                      <h2 style="padding: 10px">Repeat Coupon</h2>
                    </header>
                    <div style="padding: 20px">
                      <br />
                      <h4>Select number of coupons</h4>
                      <br />
                      <b-form-input
                        id="rangex"
                        v-model="rquantity"
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                      ></b-form-input>
                      <center>
                        <div class="mt-2">Value: {{ rquantity }}</div>
                      </center>
                      <br />
                      <center>
                        <label
                          ><span style="padding: 2px 5px">Validity</span>
                        </label>
                      </center>
                      <center>
                        <date-picker
                          style="width: 80%"
                          v-model="rvalidity"
                          type="date"
                          range
                        ></date-picker>
                      </center>
                    </div>

                    <footer class="w3-container w3-tblue">
                      <center>
                        <button
                          class="login-button"
                          style="max-width: 300px"
                          @click="addrepeat(offer.offer_text)"
                        >
                          repeat offer
                        </button>
                      </center>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal ref="couponModal" hide-footer title="Add coupon details">
      <div class="d-block text-center">
        <h3>Add Coupon details</h3>
        <label for="range-3">Select no. of Coupons/Products</label>
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
          <label for="range-0">Minimum Purchase</label>
          <b-form-input
            id="range-0"
            v-model="min_val"
            type="range"
            min="0"
            max="5000"
            step="100"
          ></b-form-input>
          <div class="mt-2">Value: Rs {{ min_val }}</div>
          <label for="range-1">Discount percent on item</label>
          <b-form-input
            id="range-1"
            v-model="discount_percent"
            type="range"
            min="0"
            max="100"
          ></b-form-input>
          <div class="mt-2">Value: {{ discount_percent }} %</div>

          <multiselect
            placeholder="Select Product/s"
            v-model="products"
            :options="getproducts.products"
            :multiple="true"
          />
          <br />
        </div>
        <div v-if="discountType === 'BILL_DISCOUNT'">
          <label for="range-0">Minimum Purchase</label>
          <b-form-input
            id="range-0"
            v-model="min_val"
            type="range"
            min="0"
            max="5000"
            step="100"
          ></b-form-input>
          <div class="mt-2">Value: Rs {{ min_val }}</div>
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
        <div v-if="discountType === 'FIXED'">
          <label for="range-1">Fixed price discount</label>
          <label><span style="padding: 2px 5px">Orignal Price:</span></label>
          <div class="offer_text">
            <input
              type="text"
              v-model="mrp"
              placeholder="Orignal MRP of product"
            />
          </div>
          <label><span style="padding: 2px 5px">Offered Price:</span></label>
          <div class="offer_text">
            <input
              type="text"
              v-model="offerPrice"
              placeholder="Offered price of product"
            />
          </div>
          <br />
          <div class="offer_text">
            <label
              style="
                width: 100%;
                border-bottom: 1px solid#cccccc;
                padding-bottom: 10px;
              "
            >
              Add a new product
            </label>

            <input
              style="width: 70%; border-radius: 4px 0px 0px 4px"
              type="text"
              placeholder="Enter Product Name..."
              v-model="addproduct"
            />
            <button class="addprod" @click="addNewProduct()">
              <i class="fa fa-plus"></i>
            </button>
          </div>
          <br />
          <label>or select an existing product</label>
          <multiselect
            placeholder="Select Product/s"
            v-model="products"
            :options="getproducts.products"
            :multiple="false"
          />
          <br />
        </div>
        <div v-if="discountType != ''">
          <label><span style="padding: 2px 5px">Validity</span> </label>
          <date-picker v-model="validity" type="date" range></date-picker>
        </div>
      </div>
      <div>
        <label><span style="padding: 2px 5px">Offer Text :</span></label>
        <div class="offer_text">
          <input
            type="text"
            v-model="offer_text"
            placeholder="offer code should be unique"
          />
        </div>
      </div>
      <div>
        <label><span style="padding: 2px 5px">Description :</span></label>
        <div class="offer_text">
          <textarea
            style="width: 100%"
            type="text"
            v-model="bio"
            placeholder="Product Description..."
          ></textarea>
        </div>
      </div>
      <div class="w3-row" v-if="discountType === 'FIXED'">
        <label><span style="padding: 2px 5px">Add Image :</span></label>

        <div class="w3-col m12">
          <!--   <img v-bind:src="image" style="width: 100%" id="proimg" />-->
          <cropper
            :src="dp"
            class="cropper"
            :stencil-props="{
              aspectRatio: 16 / 10,
            }"
            ref="cropper"
          ></cropper>

          <br />
          <div class="no_btn" id="no_btn">
            <b-button
              variant="primary"
              @click="crop"
              id="crop"
              style="margin: 10px"
              >Crop</b-button
            >
          </div>
          <div style="float: right; margin-top: 10px">
            <!-- <input @change="handleImage" type="file" accept="image/*"> -->
            <input
              type="file"
              accept="image/*"
              name="image"
              id="filer"
              @change="loadFile"
            />
          </div>
          <!-- <img :src="image" alt="" width="100%" /> -->
        </div>
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
import "vue-advanced-cropper/dist/style.css";
import topnav from "./topnav.vue";
import couponcard from "./couponcard.vue";
import Sitefooter from "../Customer/sitefooter.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Cropper } from "vue-advanced-cropper";

export default {
  components: { couponcard, topnav, Sitefooter, DatePicker, Cropper },

  data() {
    return {
      r_offertxt: "",
      r_otp: "",
      r_total: "",
      r_discount: "",
      r_min_val: "",
      min_val: "500",
      quantity: "20",
      offer_text: "",
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
        // { text: "Discount on item", value: "ITEM_DISCOUNT" },
        { text: "Discount on total bill", value: "BILL_DISCOUNT" },
        { text: "Fixed price offer", value: "FIXED" },
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
      rgetoffers: [],
      rquantity: "20",
      rvalidity: [],
      rproducts: [],
      rdiscountType: "",
      rdiscount_percent: "",
      rmin_val: "",
      mrp: "",
      offerPrice: "",
      bio: "",
      image_base64: "",
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      newimg: "",
      image: "",
      dp: "",
      prod: [],
      addproduct: null,
      r_bio: "",
    };
  },
  mounted() {
    this.getUser();
    this.getSellerOffers();
    this.getProducts();
    if (this.$session.get("user_type") === "seller") {
      document.getElementsByClassName("topnav")[0].style.height = "70px";
    }
  },

  methods: {
    addNewProduct() {
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
          });
        this.getProducts();
      }
    },
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      this.dp = canvas.toDataURL("image/jpeg");
      console.log(this.dp);
    },

    loadFile(event) {
      this.dp = URL.createObjectURL(event.target.files[0]);
      console.log(this.dp);
      document.getElementById("no_btn").style.display = "block";
    },

    addrepeat(offer_text) {
      const url = BASE_URL + "/seller/offer";
      let JWTToken = this.$session.get("token");
      var repoch = [];
      this.rproducts = [];
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.rgetoffers = response.data;
          var l = this.rgetoffers.active_offers;

          for (var i = 0; i < l.length; i++) {
            if (l[i].offer_text === offer_text) {
              this.rproducts = l[i].products;
              this.rdiscountType = l[i].type;
              this.rdiscount_percent = l[i].discount_percent;
              this.rmin_val = l[i].min_val;
              this.r_bio = l[i].bio;
            }
          }

          const payload = {
            offer: {
              validity: repoch,
              type: this.rdiscountType,
              discount_percent: parseInt(this.rdiscount_percent),
              offer_text: offer_text,
              quantity: parseInt(this.rquantity),
              min_val: parseInt(this.rmin_val),
              products: this.rproducts,
              bio: this.r_bio,
            },
          };
          repoch[0] = this.rvalidity[0].getTime() / 1000.0;
          repoch[1] = this.rvalidity[1].getTime() / 1000.0;

          const options = {
            headers: {
              Authorization: `Bearer ${JWTToken}`,
            },
          };

          axios
            .put(url, payload, options)
            .then(
              (response) => console.log(response),
              console.log(payload),
              this.$router.go()
            )
            .catch((error) => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });

          //this.$router.go();
        })

        .catch((err) => {
          console.log(err);
        });
    },
    calcdisc() {
      for (var i = 0; i < this.getoffers.active_offers.length; i++) {
        var ta = this.r_total;
        var atxt = this.getoffers.active_offers[i].offer_text;
        var entxt = document.getElementById("input-1").value;
        var per = this.getoffers.active_offers[i].discount_percent;
        if (entxt === atxt) {
          if (
            parseInt(ta) >
            parseInt(this.getoffers.active_offers[i].min_val) - 1
          ) {
            document.getElementById("input-4").value = ta - (ta / 100) * per;
            this.r_discount = document.getElementById("input-4").value;
          } else if (
            parseInt(ta) <
            parseInt(this.getoffers.active_offers[i].min_val) - 1
          ) {
            alert(
              "minimum selling price is Rs" +
                this.getoffers.active_offers[i].min_val
            );
          }
        }
      }
    },
    calcoffer() {
      for (var i = 0; i < this.getoffers.active_offers.length; i++) {
        var atxt = this.getoffers.active_offers[i].offer_text;
        var entxt = document.getElementById("input-1").value;
        if (
          entxt === atxt &&
          this.getoffers.active_offers[i].type === "FIXED"
        ) {
          document.getElementById("input-3").value =
            this.getoffers.active_offers[i].offer_price;
          document.getElementById("input-4").value =
            this.getoffers.active_offers[i].mrp -
            this.getoffers.active_offers[i].offer_price;
          this.r_total = this.getoffers.active_offers[i].mrp;
          this.r_discount = this.getoffers.active_offers[i].offer_price;
        }
      }
    },
    getProducts() {
      const url = BASE_URL + "/seller/product";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.getproducts = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verifyCoupon() {
      for (var i = 0; i < this.getoffers.active_offers.length; i++) {
        var atxt = this.getoffers.active_offers[i].offer_text;

        if (this.r_offertxt === atxt) {
          this.r_min_val = this.getoffers.active_offers[i].min_val;

          if (
            this.getoffers.active_offers[i].offer_price !== "" &&
            this.offer_type === "FIXED"
          ) {
            this.r_total = this.getoffers.active_offers[i].mrp;
            this.r_discount = this.getoffers.active_offers[i].offer_price;
          }
        }
      }

      var otpa = this.r_otp;
      var offer_texta = this.r_offertxt;
      var cpa = this.r_total;
      var spa = this.r_discount;

      if (otpa == "" || offer_texta == "" || cpa == "" || spa == "") {
        alert("please fill the required fields");
      } else {
        var r = confirm("Process the Coupon");
        if (r == true) {
          const payload = {
            otp: parseInt(this.r_otp),
            offer_text: this.r_offertxt,
            cp: parseInt(this.r_total),
            sp: parseInt(this.r_discount),
            min_value: parseInt(this.r_min_val),
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
            .then((response) => {
              console.log(response.data);
              if (response.data.status === 200) {
                alert("Coupon Sucessfully Reedemed.");
              } else {
                alert(
                  "There was a problem in redeeming the coupon : " +
                    response.data.msg
                );
              }
            })
            .catch((error) => {
              this.errorMessage = error.message;
              console.error("There was an error!", error);
            });
          this.$router.go();
        }
      }
    },
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
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
      if (this.discountType === "FIXED") {
        document.getElementById("crop").click();
      }
      var arrprod = [this.products];
      var epoch = [];
      epoch[0] = this.validity[0].getTime() / 1000.0;
      epoch[1] = this.validity[1].getTime() / 1000.0;
      var payload;
      if (this.discountType === "FIXED") {
        payload = {
          offer: {
            validity: epoch,
            type: this.discountType,
            discount_percent: parseInt(this.discount_percent),
            offer_text: this.offer_text,
            quantity: parseInt(this.quantity),
            min_val: parseInt(this.min_val),
            products: arrprod,
            mrp: parseInt(this.mrp),
            offer_price: parseInt(this.offerPrice),
            bio: this.bio,
            image_base64: this.dp,
          },
        };
      } else {
        payload = {
          offer: {
            validity: epoch,
            type: this.discountType,
            discount_percent: parseInt(this.discount_percent),
            offer_text: this.offer_text,
            quantity: parseInt(this.quantity),
            min_val: parseInt(this.min_val),
            products: this.products,
            mrp: parseInt(this.mrp),
            offer_price: parseInt(this.offerPrice),
            bio: this.bio,
          },
        };
      }
      const url = BASE_URL + "/seller/offer";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log("prod", this.products);
      console.log("prodarr", arrprod);
      axios
        .post(url, payload, options)
        .then((response) => {
          if (response.status === 200) {
            alert("Coupon added Sucessfully");
            console.log(response);
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          error("There was an error!", error);
          alert(error);
        });

      this.$refs["couponModal"].hide();

      //this.$router.go();
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
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
// learning to deploy unsucessfully
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.addprod {
  background: rgb(0 140 255);
  padding: 4px 8px;
  border: none;
  color: white;
  width: 15%;
  height: 40px;

  margin: 10px auto;
}
.no_btn {
  display: none;
}
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
