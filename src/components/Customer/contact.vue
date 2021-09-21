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
    <b-card style="padding: 20px">
      <h1>Contact Us</h1>
      <hr />
      <br />
      <br />
      <p><i class="fa fa-envelope"></i> Email : contact@lemmebuy.in</p>
      <p><i class="fa fa-phone"></i> Phone no. 9752614409</p>
      <br /><br />
    </b-card>
    <br /><br /><br />
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
