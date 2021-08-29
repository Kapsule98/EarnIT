<template>
  <div>
    <div class="coupon_box">
      <div class="body">
        <div v-if="expired === true">
          <div class="remove" v-on:click="repeat(offer_text)">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </div>
        </div>
        <div v-else>
          <div class="remove" v-on:click="removeOffer(offer_text)">
            &#x2212;
          </div>
        </div>
        <div class="bodyback">{{ discount }}</div>
        <h4 class="title">{{ name }}</h4>

        <h2 class="how_much">
          <b> {{ discount }} </b>
        </h2>
        <h3>OFF</h3>
      </div>
      <div class="usecode">{{ left }}</div>
      <h6>Code: {{ offer_text }}</h6>
      <div class="validity">
        <span v-if="planned === true">valid from {{ validfrom }}</span> Valid
        till {{ validity }}
      </div>
    </div>
    <b-modal id="modal-2" title="Reedem Coupon">
      <b-alert show variant="warning">
        Please note that after reedeming the coupon it will be valid for 5
        minutes only.</b-alert
      >
    </b-modal>
    <div id="repeatmodal" class="w3-modal">
      <div class="w3-modal-content w3-animate-zoom w3-card-4">
        <header class="w3-container w3-blue">
          <span
            onclick="document.getElementById('repeatmodal').style.display='none'"
            class="w3-button w3-display-topright"
            >&times;</span
          >
          <h2 style="padding: 10px">Repeat Coupon</h2>
        </header>
        <div class="w3-container">
          <br />
          <h4>Select number of coupons</h4>
          <br />
          <b-form-input
            id="range-3"
            v-model="rquantity"
            type="range"
            min="0"
            max="50"
            step="1"
          ></b-form-input>
          <div class="mt-2">Value: {{ rquantity }}</div>
          <label><span style="padding: 2px 5px">Validity</span> </label>
          <date-picker v-model="rvalidity" type="date" range></date-picker>
        </div>
        <footer class="w3-container w3-tblue">
          <button v-on:click="addrepeat(offer_text)">repeat offer</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  props: [
    "name",
    "discount",
    "left",
    "validity",
    "offer_text",
    "planned",
    "validfrom",
    "expired",
  ],
  components: { DatePicker },
  data() {
    return {
      rgetoffers: [],
      rquantity: "20",
      rvalidity: [],
      rproducts: [],
    };
  },
  methods: {
    /* repeat() {
      document.getElementById("repeatmodal").style.display = "block";
    },
    addrepeat(offer_text) {
      const url = BASE_URL + "/seller/offer";
      let JWTToken = this.$session.get("token");
      var repoch = [];
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          this.rgetoffers = response.data;
          var l = this.rgetoffers.active_offers;

          for (var i = 0; i < l.length; i++) {
            if (l[i].offer_text === offer_text) {
              this.rproducts = l[i].products;
              this.rdiscountType = l[i].discountType;
              this.rdiscount_percent = l[i].discount_percent;
              this.rmin_val = l[i].min_val;
              console.log(
                this.rproducts +
                  " " +
                  this.rdiscountType +
                  " " +
                  this.rdiscount_percent +
                  " " +
                  this.rmin_val
              );
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });

      repoch[0] = this.rvalidity[0].getTime() / 1000.0;
      repoch[1] = this.rvalidity[1].getTime() / 1000.0;
      //TODO validate input and store in db
      // POST request using axios with error handling
      const payload = {
        offer: {
          validity: repoch,
          type: this.rdiscountType,
          discount_percent: this.rdiscount_percent,
          offer_text: offer_text,
          quantity: parseInt(this.rquantity),
          min_val: this.rmin_val,
          products: this.rproducts,
        },
      };

      const options = {
        headers: {
          Authorization: `Bearer ${JWTToken}`,
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

      //this.$router.go();
    },*/
    removeOffer(offer_text) {
      var r = confirm("permanently remove coupon");
      if (r == true) {
        const offersurl = BASE_URL + "/seller/offer";
        let JWTToken = this.$session.get("token");
        const config = {
          data: {
            offer_text: offer_text,
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
      } else {
        document.getElementById("reedem").style.color = "white";
      }
    },
  },
};
</script>

<style scoped>
h1,
h2,
h3,
h4 {
  margin: 0;
}

.coupon_box {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  width: 80%;
  border-radius: 7px;
  padding: 1rem;
  text-align: center;
  color: #fff;
  font-family: "Tahoma", sans-serif;
  position: relative;
  margin: 20px auto;
  height: 280px;
  transition: 0.5s ease-in-out;
}
.coupon_box:hover {
  transform: scale(1.07);
}

.title {
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 20px;
}

.how_much {
  font-size: 55px;
}
h3 {
  font-size: 35px;
}

.how_much,
h3 {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.btn {
  padding: 0.5rem 3rem;
  background: #fff;
  border: none;
  border-radius: 30px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 18px;
  font-weight: 600;
  margin-top: 10px;
  cursor: pointer;
  outline: none;
  transition: 250ms;
}
.btn:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
}
.body {
  padding-bottom: 15px;
  border-bottom: 2px dashed rgba(0, 0, 0, 0.2);
  position: relative;
}
.bodyback {
  position: absolute;
  color: rgba(255, 255, 255, 0.15);
  top: 0%;
  left: 5%;
  font-size: 150px;
  font-weight: bold;
  user-select: none;
}
.usecode {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.671);
  font-size: 20px;
}
.validity {
  width: 100%;
  text-align: center;
  color: rgb(255, 193, 193);
  font-size: 16px;
  padding: 5px;
  margin-top: -5px;
}
.remove {
  position: absolute;
  top: -20px;
  right: -20px;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background-color: #ff4265;
  color: rgb(255, 255, 255);
  font-weight: 900;
  line-height: 30px;
  vertical-align: middle;
  font-size: 15px;
  cursor: pointer;
}

.remove:hover {
  animation: spin 1s 1;
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
  .coupon_box {
    width: 100%;
    margin: 5px auto;
  }
}
</style>
