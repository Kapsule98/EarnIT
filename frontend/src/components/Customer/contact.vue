<template>
<div>
        <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-info-circle"></i> About'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-shopping-cart"></i> Cart'
      link5='<i class="fa fa-lock"></i> Logout'
    ></topnav>
    <h1>Contact page</h1>
    <br><br><br>
    <sitefooter></sitefooter>
    </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from './sitefooter.vue';
export default {
  components: { topnav, Sitefooter },
};
</script>

<style scoped>

</style>
