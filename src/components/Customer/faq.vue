<template>
  <div>
    <topnav :searchbar="true" :display_categories="true"></topnav>
    <b-container>
      <b-card>
        <h1>FAQs</h1>
        <hr />
        <p><b> 1. How to register as a shopkeeper?</b></p>
        <p>
          Go to login page, click “<a href="/register">register </a>” and fill
          all your details. At the end, click “<a href="/register">register</a>”
          and you will get registered in this community. Please go to “edit”
          section if you need to change any of your information and photo of
          your shop.
        </p>

        <p><b>2. How to register as a customer?</b></p>
        <p>
          Go to login page, click “<a href="/register">register</a> ” and fill
          all your details. At the end, click “register” and you will get
          registered to avail all the offers given by the shopkeepers linked
          with us.
        </p>

        <p><b>3. How to redeem any offer shown in lemmebuy.in?</b></p>
        <p>
          Add the fascinating offers in your cart and once you go for shopping
          at the shop, click on the redeem button provided in your cart as that
          window will be open only for 5 minutes after which OTP (one time
          password) will not be valid.
        </p>

        <p><b>4.How to use Super Coins?</b></p>
        <p>
          Once you reach the milestone by earning the Super Coins, you will be
          eligible for your surprise gifts.
        </p>

        <p>
          <b>
            5. If OTP is not working or the offer is not getting redeemed, what
            shall be done?
          </b>
        </p>
        <p>
          If this ever happens, please delete that coupon from your cart and
          re-add this coupon. This will work.
        </p>

        <p>
          <b>
            6. If any discrepancy happens between the shopkeeper and the
            customer, what shall be done?
          </b>
        </p>
        <p>
          In this case, please report it to us on mail (
          <a href="mailto:contact@lemmebuy.in">contact@lemmebuy.in</a> ). We
          will take stringent action after knowing exactly about that situation.
        </p>

        <p>
          <b>
            7. In case, if a person faces abusive offers from fake or invalid
            shops, what shall be done?
          </b>
        </p>
        <p>
          Please report it to us. Contact us at
          <a href="mailto:contact@lemmebuy.in">contact@lemmebuy.in</a> and we
          will strictly inspect that shop and remove that account permanently.
        </p>

        <p>
          <b>
            8. In any case, if you find any difficulty related to our website or
            if you want to give your review, please contact us at
            <a href="mailto:contact@lemmebuy.in">contact@lemmebuy.in</a> .
          </b>
        </p>
      </b-card>
    </b-container>
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
</style>

