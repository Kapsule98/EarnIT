<template>
  <div>
    <img :src="image" width="100%" height="220px" />
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  props: ["email"],
  components: {},
  data() {
    return {
      image: "",
    };
  },
  mounted() {
    const offersurl = BASE_URL + "/seller_image/" + this.email;

    axios
      .get(offersurl)
      .then((response) => {
        this.image = response.data.toString();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>