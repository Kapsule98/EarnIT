<template>
  <div>
    <div class="cat_tab">
      <router-link :to="{ path: '/search', query: { category: 'Fashion' } }">
        <img class="cat_cir_img" src="../../assets/fashion.jpg" alt=".." />
        <div class="caption">fashion</div></router-link
      >
      <router-link :to="{ path: '/search', query: { category: 'Health' } }">
        <img class="cat_cir_img" src="../../assets/health.jpg" alt=".." />
        <div class="caption">health</div>
      </router-link>
      <router-link :to="{ path: '/search', query: { category: 'Grocery' } }">
        <img class="cat_cir_img" src="../../assets/grocery.jpg" alt=".." />
        <div class="caption">grocery</div>
      </router-link>
      <router-link :to="{ path: '/search', query: { category: 'Furnishing' } }">
        <img class="cat_cir_img" src="../../assets/furnishing.jpg" alt=".." />
        <div class="caption">furniture</div>
      </router-link>
      <router-link :to="{ path: '/search', query: { category: 'Food' } }">
        <img class="cat_cir_img" src="../../assets/food.jpg" alt=".." />
        <div class="caption">food</div>
      </router-link>
      <router-link
        :to="{ path: '/search', query: { category: 'Electronics' } }"
      >
        <img class="cat_cir_img" src="../../assets/electronics.jpg" alt=".." />
        <div class="caption">electronics</div>
      </router-link>
    </div>
    <carousel
      :autoplayTimeout="5000"
      :responsive="{
        0: { items: 1, stagePadding: 10 },
        600: { items: 1, stagePadding: 0 },
        1200: { items: 1, stagePadding: 0 },
      }"
      :loop="true"
      :autoplay="true"
      :nav="false"
      :dots="false"
      video:true
    >
      <img
        src="../../assets/new1.jpg"
        width="100%"
        alt="poster"
        class="homeposters"
      />
      <img
        src="../../assets/new2.jpg"
        width="100%"
        alt="poster"
        class="homeposters"
      />
      <img
        src="../../assets/new3.jpg"
        width="100%"
        alt="poster"
        class="homeposters"
      />
    </carousel>
  </div>
</template>

<script>
import carousel from "vue-owl-carousel";
export default {
  components: { carousel },
};
</script>
<style scoped>
.next {
  position: absolute;
  top: 40%;
  right: 0;
  font-size: 50px;
  background: rgba(0, 0, 0, 0.596);
  color: white;
  z-index: 2;
  padding: 10px 20px;
}
.prev {
  display: block !important;
  position: absolute;
  top: 40%;
  left: 0;
  font-size: 50px;
  background: rgba(0, 0, 0, 0.596);
  color: white;
  z-index: 1000;
  padding: 10px 20px;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.homeposters {
  width: 100%;
}

.cat_tab {
  display: block;
  width: fit-content;
  height: 110px;
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  padding: 0px 5px;
  text-align: center;
  margin: 2px auto;
}
.cat_tab::-webkit-scrollbar {
  display: none;
}
.cat_cir_img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 10px 20px 2px 20px;
}
.caption {
  display: block;
  font-size: 18px;
  color: black;
  line-height: 1;
  text-align: center;
  text-transform: capitalize;
}

@media screen and (max-width: 600px) {
  .homeposters {
    width: 98% !important;
    margin: 10px auto;
    border-radius: 10px;
  }
  .cat_tab {
    display: block;
    width: 100%;
    height: 110px;
    overflow-y: hidden;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    padding: 0px 5px;
  }
  .cat_tab::-webkit-scrollbar {
    display: none;
  }
  .cat_cir_img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 10px 7px 2px 7px;
  }
  .caption {
    display: block;
    font-size: 18px;
    color: black;
    line-height: 1;
    text-align: center;
    text-transform: capitalize;
  }
}
</style>