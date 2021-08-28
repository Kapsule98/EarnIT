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
    <div class="couponcard">
      <div class="card_remaining">Hurry only 9 left!</div>
      <b-form-checkbox
        id="checkbox-1"
        v-model="status"
        name="checkbox-1"
        value="accepted"
        unchecked-value="not_accepted"
      >
        <div class="card_item">40% off on Samsung Fast Chargers</div>
      </b-form-checkbox>

      <div class="w3-row">
        <div class="w3-third">
          <div class="card_leftcoupons">9/30 Coupons Left</div>
        </div>
        <div class="w3-third">
          <div class="card_validity">
            valid till 4 jun 2021
            <i class="fa fa-info-circle"></i>
          </div>
        </div>
      </div>
    </div>

    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
export default {
  components: { topnav, Sitefooter },
};
</script>

<style scoped>
.couponcard {
  width: 95%;
  padding: 20px;
  margin: 10px auto;
  border-bottom: 1px solid rgb(214, 214, 214);
}

.card_item {
  font-size: 20px;
  color: teal;
  float: left;
  margin-top: -5px;
  width: fit-content;
  display: block;
  font-weight: 400;
}
.card_discount {
  padding: 20px;
  font-size: 20px;
  color: rgb(49, 49, 49);
}
.card_validity {
  padding: 25px;
  font-size: 14px;
  color: rgb(85, 85, 85);
}
.card_leftcoupons {
  padding: 20px;
  font-size: 18px;
  color: rgb(61, 61, 61);
}
.card_remaining {
  font-size: 15px;
  color: rgb(252, 88, 88);
  display: block;
  width: 100%;
  padding: 10px 20px;
}

@media screen and (max-width: 600px) {
  .card_validity {
    padding: 0px 22px;
  }
  .mopad {
    margin: -20px !important;
  }
}
</style>