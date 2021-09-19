<template>
  <div>
    <topnav
      v-if="this.$session.get('user_type') !== 'seller'"
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
      :landing="true"
    ></topnav>
    <topnav
      v-if="this.$session.get('user_type') === 'seller'"
      link3="Account"
      link4="Dashboard"
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/account"
      url4="/verifycoupon"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :searchbar="true"
      :display_categories="true"
      :landing="true"
    ></topnav>
    <loader v-if="isLoading"></loader>
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
              :to="{ path: '/search', query: { category: 'Grocery' } }"
            >
              <b-card class="top_categories">
                <img
                  src="../../assets/grocery.png"
                  alt="ss"
                  width="100%"
                  class="catimg"
                />
                <p class="offhead">Grocery</p>
              </b-card>
            </router-link>
          </div>
        </div>
      </div>

      <b-card style="margin-top: 4px; border: none; border-radius: 0">
        <h3 style="padding: 0px">
          Grab maximum discounts!
          <router-link :to="{ path: '/search', query: { alloffers: true } }"
            ><a href="" class="vall">View all</a>
          </router-link>
        </h3>

        <div class="w3-container" style="padding: 20px 0px">
          <allapi></allapi>
        </div>
      </b-card>

      <b-card
        style="margin-top: 4px; border: none; border-radius: 0"
        v-if="showFoodBlock === true"
      >
        <h2 style="padding: 20px">
          Food
          <router-link :to="{ path: '/search', query: { category: 'Food' } }"
            ><a href="" class="vall">View all</a></router-link
          >
        </h2>

        <topoffers category="/get_offers_by_category/Food"></topoffers>

        <!--<catoffers category="/get_offers_by_category/Food"></catoffers>-->
      </b-card>
      <b-card
        style="margin-top: 4px; border: none; border-radius: 0"
        v-if="showElectronicsBlock === true"
      >
        <h2 style="padding: 20px">
          Electronics
          <router-link
            :to="{ path: '/search', query: { category: 'Electronics' } }"
            ><a href="" class="vall">View all</a></router-link
          >
        </h2>

        <topoffers category="/get_offers_by_category/Electronics"></topoffers>
        <!--<catoffers category="/get_offers_by_category/Electronics"></catoffers>-->
      </b-card>
      <b-card
        style="margin-top: 4px; border: none; border-radius: 0"
        v-if="showFashionBlock === true"
      >
        <h2 style="padding: 20px">
          Fashion
          <router-link :to="{ path: '/search', query: { category: 'Fashion' } }"
            ><a href="" class="vall">View all</a></router-link
          >
        </h2>

        <topoffers category="/get_offers_by_category/Fashion"></topoffers>
        <!--<catoffers category="/get_offers_by_category/Fashion"></catoffers>-->
      </b-card>
      <b-card
        style="margin-top: 4px; border: none; border-radius: 0"
        v-if="showHealthBlock === true"
      >
        <h2 style="padding: 20px">
          Health<router-link
            :to="{ path: '/search', query: { category: 'Health' } }"
            ><a href="" class="vall">View all</a></router-link
          >
        </h2>

        <topoffers category="/get_offers_by_category/Health"></topoffers>
        <!--<catoffers category="/get_offers_by_category/Health"></catoffers>-->
      </b-card>
      <b-card
        style="margin-top: 4px; border: none; border-radius: 0"
        v-if="showFurnitureBlock === true"
      >
        <h2 style="padding: 20px">
          Furiniture<router-link
            :to="{ path: '/search', query: { category: 'Furniture' } }"
            ><a href="" class="vall">View all</a></router-link
          >
        </h2>

        <topoffers category="/get_offers_by_category/Furniture"></topoffers>
        <!--<catoffers category="/get_offers_by_category/Health"></catoffers>-->
      </b-card>

      <bottomnav v-if="this.$session.get('user_type') !== 'seller'"></bottomnav>
      <sitefooter></sitefooter>
    </div>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import homeposters from "./homeposters.vue";
import topoffers from "./topoffers.vue";
import Sitefooter from "./sitefooter.vue";
//import Catoffers from "./catoffers.vue";
import Allapi from "./allapi.vue";
import loader from "../Seller/loader.vue";
import Bottomnav from "./bottomnav.vue";

export default {
  components: {
    topnav,
    Sitefooter,
    topoffers,
    homeposters,
    Allapi,
    Bottomnav,
    loader,
  },
  data() {
    return {
      showFashionBlock: false,
      showHealthBlock: false,
      showFoodBlock: false,
      showElectronicsBlock: false,
      showFurnitureBlock: false,
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    if (this.$session.get("user_type") === "seller" && this.landing === true) {
      document.getElementsByClassName("topnav")[0].style.height = "70px";
      if (window.scrollX < 700) {
        document.getElementsByClassName("topnav")[0].style.height = "120px";
      }
    }
    if (this.$session.get("user_type") === "customer") {
      this.$nextTick(() => this.$refs.prose.focus());
    }
    if (
      localStorage.getItem("/get_offers_by_category/Fashionempty?") === "true"
    ) {
      this.showFashionBlock = false;
    } else {
      this.showFashionBlock = true;
    }

    if (
      localStorage.getItem("/get_offers_by_category/Healthempty?") === "true"
    ) {
      this.showHealthBlock = false;
    } else {
      this.showHealthBlock = true;
    }
    if (localStorage.getItem("/get_offers_by_category/Foodempty?") === "true") {
      this.showFoodBlock = false;
    } else {
      this.showFoodBlock = true;
    }
    if (
      localStorage.getItem("/get_offers_by_category/Electronicsempty?") ===
      "true"
    ) {
      this.showElectronicsBlock = false;
    } else {
      this.showElectronicsBlock = true;
    }
    if (
      localStorage.getItem("/get_offers_by_category/Furnitureempty?") === "true"
    ) {
      this.showFurnitureBlock = false;
    } else {
      this.showFurnitureBlock = true;
    }
  },
};
</script>

<style scoped>
.vall {
  font-size: 15px;
  float: right;
  padding: 7px 12px;
  color: white;
  background: rgb(0, 119, 255);
}
.top_categories {
  z-index: 1000;
  background: white;
  border: none;
  border-radius: 0;
  margin: 1px auto;
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
  background-color: rgb(224, 224, 224);
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
    height: 150px;
    border-radius: 10px;
  }
}

a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>