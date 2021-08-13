<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-info-circle"></i> About'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-shopping-cart"></i> Cart'
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/about"
      url3="/account"
      url4="/cart"
      url5="/login"
      url6="/"
    ></topnav>
    <homeposters style="margin-top: -30px; width: 100%"></homeposters>
    <div class="backwrap">
      <div class="lessm">
        <div class="w3-row" style="background-color: #e8e8e8">
          <!--5-6 Categories like pharmacy etc on clicking on it more products of this kind will be shown>-->
          <div class="w3-col m4 s6">
            <a href="">
              <b-card class="top_categories">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                  alt="ss"
                  width="100%"
                  style="max-height: 250px"
                  class="catimg"
                />
                <p class="offhead">Fashion</p>
              </b-card>
            </a>
          </div>
          <div class="w3-col m4 s6">
            <a href="">
              <b-card class="top_categories">
                <img
                  src="https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                  alt="ss"
                  width="100%"
                  style="max-height: 250px"
                  class="catimg"
                />
                <p class="offhead">Electronics</p>
              </b-card>
            </a>
          </div>
          <div class="w3-col m4 s6">
            <a href="">
              <b-card class="top_categories">
                <img
                  src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80"
                  alt="ss"
                  width="100%"
                  style="max-height: 250px"
                  class="catimg"
                />
                <p class="offhead">Sports</p>
              </b-card>
            </a>
          </div>
          <div class="w3-col m4 s6">
            <a href="">
              <b-card class="top_categories">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                  alt="ss"
                  width="100%"
                  style="max-height: 250px"
                  class="catimg"
                />
                <p class="offhead">Pharmacy</p>
              </b-card>
            </a>
          </div>
          <div class="w3-col m4 s6">
            <a href="">
              <b-card class="top_categories">
                <img
                  src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                  alt="ss"
                  width="100%"
                  style="max-height: 250px"
                  class="catimg"
                />
                <p class="offhead">Food</p>
              </b-card>
            </a>
          </div>
          <div class="w3-col m4 s6">
            <a href="">
              <b-card class="top_categories">
                <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
                  alt="ss"
                  width="100%"
                  style="max-height: 250px"
                  class="catimg"
                />
                <p class="offhead">grocery</p>
              </b-card>
            </a>
          </div>
        </div>
      </div>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h3 style="padding: 0px">
          Top Offers <a href="" style="font-size: 11px">View all</a>
        </h3>

        <div class="w3-container" style="padding: 20px 0px">
          <topoffers></topoffers>
        </div>
      </b-card>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Food <a href="" style="font-size: 11px">View all</a>
        </h2>

        <topoffers></topoffers>

        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Electronics<a href="" style="font-size: 11px">View all</a>
        </h2>

        <topoffers></topoffers>
        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Fashion <a href="" style="font-size: 11px">View all</a>
        </h2>

        <topoffers></topoffers>
        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Medical <a href="" style="font-size: 11px">View all</a>
        </h2>

        <topoffers></topoffers>
        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Sports<a href="" style="font-size: 11px">View all</a>
        </h2>

        <topoffers></topoffers>
        <catoffers></catoffers>
      </b-card>
      <sitefooter></sitefooter>
    </div>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import homeposters from "./homeposters.vue";
import topoffers from "./topoffers.vue";
import Sitefooter from "./sitefooter.vue";
import Catoffers from "./catoffers.vue";

export default {
  components: { topnav, Sitefooter, topoffers, homeposters, Catoffers },
};
</script>

<style scoped>
.top_categories {
  z-index: 1000;
  background: white;
  border: none;
  border-radius: 0;
  margin: 2px auto;
  width: 98%;
}
.c-grid {
  display: inline-flex;
  width: 50%;
}

.card-body {
  padding: 10px 1.25rem !important;
}
.offhead {
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  padding: 5px 10px 0px 10px;
  height: 52px;
  margin: 0px;
}
.lessm {
  margin-top: 0px;
  z-index: 1;
  background: rgb(224, 224, 224);
  text-align: center;
}
.backwrap {
  background-color: rgb(160, 160, 160);
}
.c-img {
  height: 200px;
}
@media screen and (min-width: 800px) {
  .c-img {
    height: 250px;
  }
}
@media screen and (max-width: 800px) {
  .catimg {
    height: 120px;
  }
}

a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>