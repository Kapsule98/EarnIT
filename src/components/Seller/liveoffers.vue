<template>
  <div class="of_wrap">
    <b-card style="background: white">
      <b-row>
        <b-col sm="3" cols="12">
          <div class="of_img_wrap">
            <carousel
              :autoplayTimeout="3000"
              :responsive="{
                0: { items: 1, stagePadding: 0 },
                600: { items: 1, stagePadding: 0 },
                1200: { items: 1, stagePadding: 0 },
              }"
              :loop="true"
              :autoplay="true"
              :nav="false"
              :dots="true"
            >
              <div v-for="n in images" :key="n">
                <img
                  :src="imgsrc[n - 1]"
                  width="100%"
                  alt="poster"
                  class="of_pro_img"
                />
              </div>
            </carousel></div
        ></b-col>
        <b-col sm="5" cols="12">
          <div class="of_details_wrap">
            <div class="of_label">Product Name</div>
            <div :id="offer_text">
              <input class="of_name" type="text" :value="name" disabled />
            </div>
            <b-tooltip :target="offer_text">{{ name }}</b-tooltip>
            <div style="columns: 2">
              <div class="of_label">Offer Price</div>
              <input
                class="of_name"
                type="text"
                :value="offer_price"
                disabled
              />
              <div class="of_label">MRP</div>
              <input
                class="of_name strikeoff"
                type="text"
                :value="mrp"
                disabled
              />
            </div>
            <div style="columns: 2">
              <div class="of_label">Discount</div>
              <input class="of_name" type="text" :value="discount" disabled />
              <div class="of_label">Coupon Code</div>
              <input class="of_name" type="text" :value="offer_text" disabled />
            </div>
            <div class="of_label">Validity</div>
            <input
              class="of_name"
              type="text"
              :value="validfrom + ' ~' + validity"
              disabled
            /></div
        ></b-col>
        <b-col sm="4" cols="12"
          ><div class="of_label">Product Description</div>
          <textarea
            class="of_name_area"
            type="text"
            :value="description"
            disabled
          /></b-col
      ></b-row>
      <div class="sd_btn" @click="removeOffer(offer_text)">Delete Product</div>
    </b-card>
  </div>
</template>

<script>
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import carousel from "vue-owl-carousel";

export default {
  components: { carousel },

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
    "imgsrc",
    "description",
    "imglength",
  ],

  //components: { DatePicker },
  data() {
    return {
      rgetoffers: [],
      rquantity: "20",
      rvalidity: [],
      rproducts: [],
      images: this.imglength,
    };
  },
  methods: {
    repeat() {
      document.getElementById("repeatmodal").style.display = "block";
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
.of_pro_img {
  width: 80%;
  border-radius: 6px;
}
.of_img_wrap {
  position: relative;
  width: 80%;
  border-radius: 6px;
  overflow: hidden;
}
.of_label {
  font-size: 16px;
  font-weight: 600 !important;
  color: rgb(53, 53, 53);
}
.of_wrap {
  margin: 10px 20px;
  padding-bottom: 20px;
  margin-top: 10px;
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
  min-height: 250px !important;
}
.strikeoff {
  text-decoration: line-through;
}
.sd_btn {
  font-size: 15px;
  border: 1px solid #ff0000;
  color: #ff0000;
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
  background: #ff0000;
}
@media screen and (max-width: 767px) {
  .of_img_wrap {
    position: relative;
    width: 80%;
    border-radius: 6px;
    overflow: hidden;
    margin: 0px auto;
  }
  .of_pro_img {
    width: 80%;
    border-radius: 6px;
    margin-bottom: 20px !important;
  }
}
</style>
