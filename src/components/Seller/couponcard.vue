<template>
  <div>
    <div class="coupon_box">
      <div class="body">
        <div v-if="expired === true">
          <div class="remove" @click="repeat()">
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </div>
        </div>
        <div v-else>
          <div class="remove" @click="removeOffer(offer_text)">&#x2212;</div>
        </div>
        <div class="bodyback">{{ discount }}</div>
        <h4 class="title">{{ name }}</h4>

        <h2 class="how_much">
          <b> {{ discount }} </b>
        </h2>
        <h3>OFF</h3>
        {{ offer_price }} <del>{{ mrp }}</del>
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
  </div>
</template>

<script>
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
//import DatePicker from "vue2-datepicker";
//import "vue2-datepicker/index.css";
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
    "offer_price",
    "mrp",
  ],
  //components: { DatePicker },
  data() {
    return {
      rgetoffers: [],
      rquantity: "20",
      rvalidity: [],
      rproducts: [],
    };
  },
  methods: {
    repeat() {
      document.getElementById("repeatmodal1").style.display = "block";
    },

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
          })
          .finally(() => {
            this.$router.go();
          });
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
