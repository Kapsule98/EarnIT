<template>
  <div>
    <topnav
      v-if="this.$session.get('user_type') !== 'seller'"
      :searchbar="true"
      :display_categories="true"
      :landing="true"
    ></topnav>
    <topnav
      v-if="this.$session.get('user_type') === 'seller'"
      :searchbar="true"
      :display_categories="true"
      :landing="true"
    ></topnav>

    <loader v-if="isLoading"></loader>
    <homeposters style="margin-top: -30px; width: 100%"></homeposters>
    <product></product>
    <br /><br />
    <div class="backwrap">
      <bottomnav v-if="this.$session.get('user_type') !== 'seller'"></bottomnav>
      <sitefooter></sitefooter>
    </div>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import homeposters from "./homeposters.vue";
import Sitefooter from "./sitefooter.vue";
import loader from "../Seller/loader.vue";
import Bottomnav from "./bottomnav.vue";
import Product from "./product.vue";
export default {
  components: {
    topnav,
    Sitefooter,
    homeposters,
    Bottomnav,
    loader,
    Product,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
    if (this.$session.get("user_type") === "seller" && this.landing === true) {
      document.getElementsByClassName("topnav")[0].style.height = "70px";
      if (window.scrollX < 700) {
        document.getElementsByClassName("topnav")[0].style.height = "120px";
      }
    }
    if (this.$session.get("user_type") === "customer") {
      this.$nextTick(() => this.$refs.prose.focus());
    }
  },
};
</script>

<style scoped>
.vall {
  font-size: 14px;
  float: right;
  padding: 7px 10px;
  color: rgb(0, 119, 255);
  /* background: rgb(0, 119, 255); */
  font-weight: 600;
  text-transform: uppercase;
  margin-right: -30px;
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
  padding: 10px 10px 10px 10px;
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
.catimg {
  height: 150px;
  border-radius: 10px;
  width: 90%;
  margin: 10px 0px 0px 0px;
}

@media screen and (min-width: 800px) {
  .c-img {
    height: 250px;
  }
}
@media screen and (max-width: 800px) {
  .catimg {
    height: 100px;
    border-radius: 10px;
    width: 90%;
    margin: 10px 0px 0px 0px;
  }
  .offhead {
    font-size: 14px;
    font-weight: 500;
  }
  .top_categories {
    z-index: 1000;
    background: white;
    border: none;
    border-radius: 0;
    margin: 1px auto;
    width: 99%;
    padding: 0px;
  }
}

a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>