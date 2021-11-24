<template>
  <div v-if="def">
    <img src="../../assets/def.png" width="100%" height="220px" />
  </div>
  <div v-else>
    <img :src="image" width="100%" height="140px" />
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  props: ["email", "category"],
  components: {},
  data() {
    return {
      image: "",
      def: false,
      furdef: false,
    };
  },
  mounted() {
    const offersurl = BASE_URL + "/seller_image/" + this.email;

    axios
      .get(offersurl)
      .then((response) => {
        this.image = response.data.image;

        if (response.status === 200 && response.data.status === 200) {
          this.image = response.data.image;
          this.def = false;
        } else {
          this.def = true;
          if (this.category === "Furniture") {
            this.furdef = true;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>