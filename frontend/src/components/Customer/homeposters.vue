<template>
  <carousel
    :items="1"
    :stagePadding="0"
    :loop="true"
    :autoplay="true"
    :nav="false"
    :dots="false"
  >
    <div v-for="item in topoffers" v-bind:key="item.id">
      <img :src="item.img" width="100%" />
    </div>
  </carousel>
</template>

<script>
import carousel from "vue-owl-carousel";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: { carousel },
  data() {
    return {
      homeposters: undefined,
    };
  },
  mounted() {
    const homepostersurl = BASE_URL + "/seller/offer";
    axios.get(homepostersurl).then((resp) => {
      this.homeposters = resp.data.data;
      console.warn(resp.data.data);
    });
  },
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
</style>