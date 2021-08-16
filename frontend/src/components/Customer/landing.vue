<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url3="/account"
      url4="/cart"
      url5="/login"
      url6="/"
      :searchbar="true"
    ></topnav>
    <homeposters style="margin-top: -30px; width: 100%"></homeposters>
    <div class="backwrap">
      <div class="lessm">
        <div class="w3-row" style="background-color: #e8e8e8">
          <!--5-6 Categories like pharmacy etc on clicking on it more products of this kind will be shown>-->
          <div class="w3-col m2 s6">
            <router-link
              :to="{ path: '/search', query: { category: 'Fashion' } }"
            >
              <b-card class="top_categories">
                <img
                  src="../../assets/fashion.jpg"
                  alt="ss"
                  width="100%"
                  class="catimg"
                />
                <p class="offhead">Fashion</p>
              </b-card>
            </router-link>
          </div>
          <div class="w3-col m2 s6">
            <router-link
              :to="{ path: '/search', query: { category: 'Electronics' } }"
            >
              <b-card class="top_categories">
                <img
                  src="../../assets/electronics.jpg"
                  alt="ss"
                  width="100%"
                  class="catimg"
                />
                <p class="offhead">Electronics</p>
              </b-card>
            </router-link>
          </div>
          <div class="w3-col m2 s6">
            <router-link
              :to="{ path: '/search', query: { category: 'Furnishing' } }"
            >
              <b-card class="top_categories">
                <img
                  src="../../assets/furnishing.jpg"
                  alt="ss"
                  width="100%"
                  class="catimg"
                />
                <p class="offhead">Furnishing</p>
              </b-card>
            </router-link>
          </div>
          <div class="w3-col m2 s6">
            <router-link
              :to="{ path: '/search', query: { category: 'Health' } }"
            >
              <b-card class="top_categories">
                <img
                  src="../../assets/health.jpg"
                  alt="ss"
                  width="100%"
                  class="catimg"
                />
                <p class="offhead">Health</p>
              </b-card>
            </router-link>
          </div>
          <div class="w3-col m2 s6">
            <router-link :to="{ path: '/search', query: { category: 'Food' } }">
              <b-card class="top_categories">
                <img
                  src="../../assets/food.jpg"
                  alt="ss"
                  width="100%"
                  class="catimg"
                />
                <p class="offhead">Food</p>
              </b-card>
            </router-link>
          </div>
          <div class="w3-col m2 s6">
            <router-link
              :to="{ path: '/search', query: { category: 'Sports' } }"
            >
              <b-card class="top_categories">
                <img
                  src="../../assets/sports.png"
                  alt="ss"
                  width="100%"
                  class="catimg"
                />
                <p class="offhead">Sports</p>
              </b-card>
            </router-link>
          </div>
        </div>
      </div>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h3 style="padding: 0px">
          Top Offers
          <router-link :to="{ path: '/search', query: { alloffers: true } }"
            ><a href="" style="font-size: 11px">View all</a>
          </router-link>
        </h3>

        <div class="w3-container" style="padding: 20px 0px">
          <topoffers alloffers="true"></topoffers>
        </div>
      </b-card>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Food
          <router-link :to="{ path: '/search', query: { category: 'Food' } }"
            ><a href="" style="font-size: 11px">View all</a></router-link
          >
        </h2>

        <topoffers category="Health"></topoffers>

        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Electronics
          <router-link
            :to="{ path: '/search', query: { category: 'Electronics' } }"
            ><a href="" style="font-size: 11px">View all</a></router-link
          >
        </h2>

        <topoffers></topoffers>
        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Fashion
          <router-link :to="{ path: '/search', query: { category: 'Fashion' } }"
            ><a href="" style="font-size: 11px">View all</a></router-link
          >
        </h2>

        <topoffers></topoffers>
        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Medical<router-link
            :to="{ path: '/search', query: { category: 'Health' } }"
            ><a href="" style="font-size: 11px">View all</a></router-link
          >
        </h2>

        <topoffers></topoffers>
        <catoffers></catoffers>
      </b-card>
      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">
          Sports<router-link
            :to="{ path: '/search', query: { category: 'Sports' } }"
            ><a href="" style="font-size: 11px">View all</a></router-link
          >
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
  width: 99%;
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