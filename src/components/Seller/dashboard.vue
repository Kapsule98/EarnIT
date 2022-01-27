<template>
  <div class="s_dashboard">
    <div class="loader_wrapper_1" v-if="wait">
      <div class="loader_1"></div>
      This might take few seconds...
    </div>
    <topnav
      link1='<i class="fa fa-cubes"></i> Dashboard'
      link2='<i class="fa fa-money"></i> Customer Bill'
      link3='<i class="fa fa-user"></i> Account'
      url1="/seller/dashboard"
      url2="/customerbill"
      url3="/account"
      link4=""
      link5=""
      active1="active_nav"
    ></topnav>
    <b-row style="margin-top: -50px">
      <b-col sm="8" cols="12">
        <div class="sd_title">View or add offers</div>
      </b-col>
      <b-col sm="4" cols="12">
        <div class="sd_btn" style="cursor: not-allowed">
          <router-link to="/seller/dashboard" style="cursor: not-allowed"
            >Open Documentation</router-link
          >
        </div>
      </b-col>
    </b-row>
    <p class="cd_title_desc">
      Hi {{ this.$session.get("user_data").display_name }}! Welcome to your
      dashboard.
      <b-icon-question-circle></b-icon-question-circle>
    </p>
    <div class="cd_tab_nav">
      <div class="cd_link_a cd_color" id="tab1">
        <div class="dropdown">
          View Offers <b-icon-caret-down></b-icon-caret-down>
          <div class="dropdown-content">
            <div @click="tab(1)">Live Prducts</div>
            <div @click="pSubTab(3)">Planned Products</div>
            <div @click="pSubTab(4)">Live Coupons</div>
            <div @click="pSubTab(5)">Planned Coupons</div>
            <div @click="pSubTab(8)">Expired Coupons</div>
          </div>
        </div>
      </div>
      <div class="cd_link_a" id="tab2" @click="tab(2)">
        <b-icon-plus-circle></b-icon-plus-circle> Add Offer
      </div>
      <div class="cd_active" id="tab_active"></div>
    </div>
    <div v-if="mtno === 1 && special">
      <div class="padding20">
        <b-card>
          <div class="sd_title" style="font-size: 20px">Live Products!</div>
        </b-card>
      </div>
      <b-row>
        <b-col
          sm="12"
          cols="12"
          v-for="offer in getoffers.active_offers"
          :key="offer.length"
        >
          <div
            v-if="
              Math.floor(new Date().getTime() / 1000.0) < offer.validity[1] &&
              Math.floor(new Date().getTime() / 1000.0) > offer.validity[0] &&
              offer.quantity > 0
            "
          >
            <liveoffers
              v-if="offer.type === 'FIXED'"
              :name="offer.products.toString()"
              :imgsrc="offer.image_url"
              :discount="Math.round(offer.discount_percent) + '%'"
              :left="offer.quantity + ' coupons'"
              :validity="
                ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
              "
              :validfrom="
                ' ' + moment(offer.validity[0] * 1000).format('DD-MM-YYYY')
              "
              :offer_text="offer.offer_text"
              :mrp="'Rs ' + offer.mrp"
              :offer_price="'Rs ' + offer.offer_price"
              :description="offer.bio"
              :imglength="offer.image_url.length"
            ></liveoffers>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="smtno === 3">
      <div class="padding20">
        <b-card>
          <div class="sd_title" style="font-size: 20px">Planned Products!</div>
        </b-card>
      </div>
      <b-row>
        <b-col
          sm="12"
          cols="12"
          v-for="offer in getoffers.active_offers"
          :key="offer.length"
        >
          <div
            v-if="
              Math.floor(new Date().getTime() / 1000.0) < offer.validity[1] &&
              Math.floor(new Date().getTime() / 1000.0) < offer.validity[0] &&
              offer.quantity > 0
            "
          >
            <liveoffers
              v-if="offer.type === 'FIXED'"
              :name="offer.products.toString()"
              :imgsrc="offer.image_url"
              :discount="Math.round(offer.discount_percent) + '%'"
              :left="offer.quantity + ' coupons'"
              :validity="
                ' ' + moment(offer.validity[1] * 1000).format('DD-MM-YYYY')
              "
              :validfrom="
                ' ' + moment(offer.validity[0] * 1000).format('DD-MM-YYYY')
              "
              :offer_text="offer.offer_text"
              :mrp="'Rs ' + offer.mrp"
              :offer_price="'Rs ' + offer.offer_price"
              :description="offer.bio"
              :imglength="offer.image_url.length"
            ></liveoffers>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="smtno === 4">
      <div class="padding20">
        <b-card>
          <div class="sd_title" style="font-size: 20px">Live Coupons!</div>
        </b-card>
      </div>
      <b-container>
        <b-row>
          <template v-for="offer in getoffers.active_offers">
            <b-col
              sm="3"
              cols="12"
              :key="offer.length"
              v-if="
                Math.floor(new Date().getTime() / 1000.0) < offer.validity[1] &&
                Math.floor(new Date().getTime() / 1000.0) > offer.validity[0] &&
                offer.quantity > 0 &&
                offer.type === 'BILL_DISCOUNT'
              "
            >
              <couponcard
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
            </b-col>
          </template>
        </b-row>
      </b-container>
    </div>
    <div v-if="smtno === 5">
      <div class="padding20">
        <b-card>
          <div class="sd_title" style="font-size: 20px">Planned Coupons!</div>
        </b-card>
      </div>
      <b-container>
        <b-row>
          <template v-for="offer in getoffers.active_offers">
            <b-col
              sm="3"
              cols="12"
              :key="offer.length"
              v-if="
                Math.floor(new Date().getTime() / 1000.0) < offer.validity[1] &&
                Math.floor(new Date().getTime() / 1000.0) < offer.validity[0] &&
                offer.quantity > 0 &&
                offer.type === 'BILL_DISCOUNT'
              "
            >
              <couponcard
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
            </b-col>
          </template>
        </b-row>
      </b-container>
    </div>
    <div v-if="smtno === 8">
      <div class="padding20">
        <b-card>
          <div class="sd_title" style="font-size: 20px">Expired Coupons!</div>
        </b-card>
      </div>
      <b-container>
        <b-row>
          <template v-for="offer in getoffers.active_offers">
            <b-col
              sm="3"
              cols="12"
              v-if="
                Math.floor(new Date().getTime() / 1000.0) > offer.validity[1] &&
                Math.floor(new Date().getTime() / 1000.0) > offer.validity[0] &&
                offer.quantity > 0 &&
                offer.type === 'BILL_DISCOUNT'
              "
              :key="offer.length"
            >
              <couponcard
                v-if="offer.type === 'BILL_DISCOUNT'"
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
              <div id="repeatmodal1" class="w3-modal">
                <div class="w3-modal-content w3-animate-zoom w3-card-4">
                  <header
                    class="w3-container"
                    style="background-color: #36cdff"
                  >
                    <span
                      onclick="document.getElementById('repeatmodal1').style.display='none'"
                      class="w3-button w3-display-topright"
                      >&times;</span
                    >
                    <h2 style="padding: 10px" class="sd_title">
                      Repeat Coupon
                    </h2>
                  </header>
                  <div style="padding: 20px">
                    <br />
                    <div style="columns: 2">
                      <div class="of_label">
                        <sup>*</sup>No. Of Coupons (&#8377; )
                      </div>
                      <input
                        class="of_name"
                        type="number"
                        v-model="rquantity"
                      />
                      <div class="of_label"><sup>*</sup>Validity</div>
                      <date-picker
                        v-model="rvalidity"
                        type="date"
                        style="width: 100%; margin-top: 8px"
                        range
                      ></date-picker>
                    </div>
                  </div>
                  <footer class="w3-container w3-tblue">
                    <center>
                      <button
                        class="sd_btn"
                        style="max-width: 300px"
                        @click="addrepeat(offer.offer_text)"
                      >
                        repeat offer
                      </button>
                    </center>
                  </footer>
                </div>
              </div>
            </b-col>
          </template>
        </b-row>
      </b-container>
    </div>
    <div v-else-if="mtno === 2" class="padding20">
      <b-card style="background: white" class="addcard">
        <div class="cd_tab_nav">
          <div class="cd_link_a cd_color" id="tab6" @click="subtab(6)">
            Product
          </div>
          <div class="cd_link_a" id="tab7" @click="subtab(7)">Total Bill</div>
          <div class="cd_active" id="tab_active3"></div>
        </div>
        <div v-if="mtno3 === 6" class="addwrap">
          <b-row>
            <b-col sm="6" cols="12">
              <div style="columns: 2">
                <div class="of_label"><sup>*</sup>Offer Price (&#8377; )</div>
                <input class="of_name" type="number" v-model="offerPrice" />
                <div class="of_label"><sup>*</sup>MRP (&#8377; )</div>
                <input class="of_name" type="number" v-model="mrp" />
              </div>
              <div class="of_label">Add new product name</div>
              <div class="addrow">
                <input
                  class="of_name proinput"
                  type="text"
                  v-model="addproduct"
                />
                <div
                  class="sd_btn"
                  @click="addNewProduct()"
                  style="margin-top: 6px"
                >
                  Add
                </div>
              </div>
              <div class="of_label">
                <sup>*</sup>Or select an existing product
              </div>
              <multiselect
                placeholder="Select Product/s"
                v-model="products"
                :options="getproducts"
                :multiple="false"
                style="z-index: 101; margin-top: 6px"
              />
              <div style="columns: 2">
                <div class="of_label"><sup>*</sup>Validity</div>
                <date-picker
                  v-model="validity"
                  type="date"
                  style="width: 100%; margin-top: 8px"
                  range
                ></date-picker>
                <div class="of_label"><sup>*</sup>Offer Code</div>
                <div>
                  <input class="of_name" v-model="offer_text" type="text" />
                </div>
              </div>
            </b-col>
            <b-col sm="6" cols="12">
              <div class="of_label">Product Description</div>
              <textarea
                class="of_name_area"
                v-model="description"
                type="text"
              ></textarea>
            </b-col>
          </b-row>
          <br />
          <b-row>
            <b-col sm="3" cols="12">
              <div class="of_label"><sup>*</sup>Select Image 1</div>

              <div class="selimg" v-if="im1 === ''"></div>
              <cropper
                :src="im1"
                class="cropper1"
                :stencil-props="{
                  aspectRatio: 12 / 16,
                }"
                ref="cropper1"
              ></cropper>
              <div class="no_btn" id="no_btn1">
                <div
                  class="sd_btn"
                  variant="primary"
                  @click="crop1"
                  id="crop1"
                  style="margin: 10px auto"
                >
                  Crop
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                name="image1"
                id="filer1"
                @change="loadFile1"
              />
            </b-col>
            <b-col sm="3" cols="12">
              <div class="of_label">Select Image 2</div>

              <div class="selimg" v-if="im2 === ''"></div>
              <cropper
                :src="im2"
                class="cropper2"
                :stencil-props="{
                  aspectRatio: 12 / 16,
                }"
                ref="cropper2"
              ></cropper>
              <div class="no_btn" id="no_btn2">
                <div
                  class="sd_btn"
                  variant="primary"
                  @click="crop2"
                  id="crop2"
                  style="margin: 10px"
                >
                  Crop
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                name="image2"
                id="filer2"
                @change="loadFile2"
              /> </b-col
            ><b-col sm="3" cols="12">
              <div class="of_label">Select Image 3</div>

              <div class="selimg" v-if="im3 === ''"></div>
              <cropper
                :src="im3"
                class="cropper3"
                :stencil-props="{
                  aspectRatio: 12 / 16,
                }"
                ref="cropper3"
              ></cropper>
              <div class="no_btn" id="no_btn3">
                <div
                  class="sd_btn"
                  variant="primary"
                  @click="crop3"
                  id="crop3"
                  style="margin: 10px"
                >
                  Crop
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                name="image3"
                id="filer3"
                @change="loadFile3"
              /> </b-col
            ><b-col sm="3" cols="12">
              <div class="of_label">Select Image 4</div>

              <div class="selimg" v-if="im4 === ''"></div>
              <cropper
                :src="im4"
                class="cropper4"
                :stencil-props="{
                  aspectRatio: 12 / 16,
                }"
                ref="cropper4"
              ></cropper>
              <div class="no_btn" id="no_btn4">
                <div
                  class="sd_btn"
                  @click="crop4"
                  id="crop4"
                  style="margin: 10px"
                >
                  Crop
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                name="image4"
                id="filer4"
                @change="loadFile4"
              />
            </b-col>
          </b-row>
          <br />
          <div class="sd_btn" @click="addCouponDetails()">Add Product</div>
        </div>
        <div v-else-if="mtno3 === 7">
          <br />
          <b-row class="addwrap">
            <b-col sm="6" cols="12">
              <div>
                <div class="of_label">
                  <sup>*</sup>Minimum Purchase(&#8377; )
                </div>
                <input class="of_name" type="number" v-model="minval" />
              </div>
              <div class="of_label"><sup>*</sup>Discount on Total Bill (%)</div>
              <input class="of_name" type="number" v-model="discount_percent" />
              <div style="columns: 2">
                <div class="of_label"><sup>*</sup>Validity</div>
                <date-picker
                  v-model="validity"
                  type="date"
                  style="width: 100%; margin-top: 8px"
                  range
                ></date-picker>
                <div class="of_label"><sup>*</sup>Coupon Code</div>
                <input class="of_name" type="text" v-model="offer_text" />
              </div>
            </b-col>
            <b-col sm="6" cols="12">
              <div class="of_label">Coupon Description</div>
              <textarea
                class="of_name_area_2"
                v-model="description"
                type="text"
              ></textarea>
            </b-col>
          </b-row>
          <br />
          <div class="sd_btn" @click="addCouponDetails()">Add Coupon</div>
        </div>
      </b-card>
    </div>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import {
  BIconPlusCircle,
  BIconQuestionCircle,
  BIconCaretDown,
} from "bootstrap-vue";
import Liveoffers from "./liveoffers.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Sitefooter from "../Customer/sitefooter.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import couponcard from "./couponcard.vue";
import topnav from "./topnav.vue";

export default {
  components: {
    BIconPlusCircle,
    BIconCaretDown,
    BIconQuestionCircle,
    Liveoffers,
    Sitefooter,
    DatePicker,
    Cropper,
    couponcard,
    topnav,
  },
  data() {
    return {
      wait: false,
      getoffers: {},
      mtno: 1,
      mtno3: 6,
      smtno: 0,
      products: null,
      getproducts: [],
      im1: "",
      im2: "",
      im3: "",
      im4: "",
      name: "",
      mrp: "",
      offerPrice: "",
      validity: [],
      offer_text: "",
      description: "",
      discountType: "",
      no_of_coupons: 50,
      discount_percent: 10,
      minval: 100,
      special: true,
      rgetoffers: [],
      rquantity: "20",
      rvalidity: [],
      rproducts: [],
      rdiscountType: "",
      rdiscount_percent: "",
      rmin_val: "",
      addproduct: null,
      prod: [],
      coordinates1: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      coordinates2: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      coordinates3: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      coordinates4: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
    };
  },

  mounted() {
    this.getSellerOffers();
    this.getProducts();
    document.getElementById("nav").style.top = "-30px";
    document.getElementById("nav").style.height = "70px";
  },
  watch: {
    getproducts: function () {
      this.getProducts();
    },
  },
  methods: {
    //add a new product to seller product list
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
          })
          .finally(() => {
            this.products = this.prod;
          });
      }
    },
    addCouponDetails() {
      var proceed = false;

      if (
        (this.mtno3 === 6 &&
          this.products !== null &&
          this.im1 !== "" &&
          this.offer_text !== "" &&
          this.mrp !== "" &&
          this.offerPrice !== "") ||
        (this.mtno3 === 7 && this.offer_text !== "")
      ) {
        proceed = true;
      }
      if (proceed) {
        if (this.mtno3 === 6) {
          this.discountType = "FIXED";
        } else {
          this.discountType = "BILL_DISCOUNT";
        }
        if (this.discountType === "FIXED") {
          document.getElementById("crop1").click();
          document.getElementById("crop2").click();
          document.getElementById("crop3").click();
          document.getElementById("crop4").click();
        }
        var arrprod = [this.products];

        var imgprod = [];
        if (this.im1 !== "") {
          imgprod.push(this.im1);
        }
        if (this.im2 !== "") {
          imgprod.push(this.im2);
        }
        if (this.im3 !== "") {
          imgprod.push(this.im3);
        }
        if (this.im4 !== "") {
          imgprod.push(this.im4);
        }
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
              quantity: parseInt(10),
              min_val: parseInt(0),
              products: arrprod,
              mrp: parseInt(this.mrp),
              offer_price: parseInt(this.offerPrice),
              bio: this.description,
              image_base64: imgprod,
            },
          };
        } else {
          payload = {
            offer: {
              validity: epoch,
              type: this.discountType,
              discount_percent: parseInt(this.discount_percent),
              offer_text: this.offer_text,
              quantity: parseInt(10000),
              min_val: parseInt(this.minval),
              products: this.products,
              mrp: parseInt(this.mrp),
              offer_price: parseInt(this.offerPrice),
              bio: this.description,
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
        this.wait = true;

        axios
          .post(url, payload, options)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              alert("Coupon added Sucessfully");
            }
          })
          .catch((error) => {
            this.errorMessage = error.message;
            error("There was an error!", error);
            alert(error);
          })
          .finally(() => {
            this.wait = false;
          });
      } else {
        alert("Please fill all the fields");
      }
    },
    crop1() {
      const { coordinates, canvas } = this.$refs.cropper1.getResult();
      this.coordinates1 = coordinates;
      this.im1 = canvas.toDataURL("image/jpeg");
    },

    loadFile1(event) {
      this.im1 = URL.createObjectURL(event.target.files[0]);
      document.getElementById("no_btn1").style.display = "block";
    },
    crop2() {
      const { coordinates, canvas } = this.$refs.cropper2.getResult();
      this.coordinates2 = coordinates;
      this.im2 = canvas.toDataURL("image/jpeg");
    },

    loadFile2(event) {
      this.im2 = URL.createObjectURL(event.target.files[0]);
      document.getElementById("no_btn2").style.display = "block";
    },
    crop3() {
      const { coordinates, canvas } = this.$refs.cropper3.getResult();
      this.coordinates3 = coordinates;
      this.im3 = canvas.toDataURL("image/jpeg");
    },

    loadFile3(event) {
      this.im3 = URL.createObjectURL(event.target.files[0]);
      document.getElementById("no_btn3").style.display = "block";
    },
    crop4() {
      const { coordinates, canvas } = this.$refs.cropper4.getResult();
      this.coordinates4 = coordinates;
      this.im4 = canvas.toDataURL("image/jpeg");
    },

    loadFile4(event) {
      this.im4 = URL.createObjectURL(event.target.files[0]);
      document.getElementById("no_btn4").style.display = "block";
    },
    tab(no) {
      this.smtno = 0;
      this.special = true;
      this.mtno = no;
      if (no === 2) {
        document.getElementById("tab_active").style.left = "150px";
        document.getElementById("tab2").classList.add("cd_color");
        document.getElementById("tab1").classList.remove("cd_color");
      } else {
        document.getElementById("tab_active").style.left = "0px";
        document.getElementById("tab1").classList.add("cd_color");
        document.getElementById("tab2").classList.remove("cd_color");
      }
    },
    subtab(no) {
      this.mtno3 = no;
      if (no === 7) {
        document.getElementById("tab_active3").style.left = "150px";
        document.getElementById("tab6").classList.add("cd_color");
        document.getElementById("tab7").classList.remove("cd_color");
      } else if (no === 6) {
        document.getElementById("tab_active3").style.left = "0px";
        document.getElementById("tab6").classList.add("cd_color");
        document.getElementById("tab7").classList.remove("cd_color");
      }
    },
    pSubTab(no) {
      this.mtno = 0;
      this.smtno = no;
      this.special = false;
      document.getElementById("tab_active").style.left = "0px";
      document.getElementById("tab1").classList.add("cd_color");
      document.getElementById("tab2").classList.remove("cd_color");
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
    // get existing product list of seller
    getProducts() {
      const url = BASE_URL + "/seller/product";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.getproducts = response.data.products;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //repeat expired offer
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
            .then((response) => console.log(response), this.$router.go())
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
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
.loader_wrapper_1 {
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
  z-index: 90900000000;
  text-align: center;
  line-height: 130vh;
  vertical-align: middle;
}
.loader_1 {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -40px;
  margin-top: -40px;
  border: 8px solid #474747;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 80px;
  height: 80px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.dropbtn {
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 190px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 100;
}

.dropdown-content div {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content div:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}
.no_btn {
  display: none;
}
.s_dashboard {
  width: 100%;
  min-height: 100vh;
  background: rgb(248, 253, 255);
  font-family: "Rubik", sans-serif;
}
.sd_title {
  font-size: 28px;
  font-weight: 500 !important;
  color: rgb(22, 22, 26);
  padding: 10px 20px;
}
.sd_btn {
  font-size: 15px;
  border: 1px solid #0077ff;
  color: #0077ff;
  padding: 6px 12px;
  width: fit-content;
  margin: 14px 24px;
  float: right;
  border-radius: 6px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.sd_btn a {
  color: inherit;
  text-decoration: none;
}
.sd_btn:hover {
  color: rgb(241, 241, 255);
  background: #0077ff;
}
.cd_tab_nav {
  position: relative;
  border-bottom: 1px solid rgb(211, 211, 211);
  margin: 0px 20px;
  padding-bottom: 0px;
}
.cd_link_a {
  font-size: 16px;
  font-weight: 500 !important;
  color: grey;
  padding: 20px 20px 10px 0px;
  display: inline-block;
  width: 150px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.cd_title_desc {
  padding: 0px 20px 10px 20px;
  color: grey;
  font-size: 14px;
}
.cd_link_a a {
  color: inherit;
  text-decoration: none;
}
.cd_link_a:hover {
  color: #0077ff;
}
.cd_active {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100px;
  color: #0077ff;
  border-bottom: 2px solid #0077ff;
  transition: 0.4s ease-in;
}
.cd_color {
  color: #0077ff;
}
.padding20 {
  padding: 20px;
}
.of_label {
  font-size: 16px;
  font-weight: 600 !important;
  color: rgb(0, 33, 95) !important;
  padding: 10px 0px 0px 0px;
}
.of_name {
  width: 100%;
  font-size: 18px;
  padding: 4px 8px;
  border: 1px solid #25232c;
  margin: 6px 0px;
  border-radius: 4px;
  color: rgb(0, 57, 122);
}
.of_name_area {
  width: 100%;
  font-size: 18px;
  padding: 4px 8px;
  border: 1px solid #25232c;
  margin: 6px 0px;
  border-radius: 4px;
  min-height: 280px !important;
}
.of_name_area_2 {
  width: 100%;
  font-size: 18px;
  padding: 4px 8px;
  border: 1px solid #25232c;
  margin: 6px 0px;
  border-radius: 4px;
  min-height: 200px !important;
}
.of_label {
  font-size: 16px;
  font-weight: 600 !important;
  color: rgb(53, 53, 53);
}
.addwrap {
  padding: 20px 20px;
}
.selimg {
  height: 140px;
  width: 100%;
  margin: 10px auto;
  border: 1px dashed black;
  border-radius: 6px;
}
.addrow {
  display: flex;
  justify-content: space-around;
}
.proinput {
  height: 38px;
}
@media screen and (max-width: 767px) {
  .card-body {
    padding: 0 !important;
  }
  .of_name_area {
    min-height: 200px !important;
  }
}
</style>