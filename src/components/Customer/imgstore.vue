<template>
  <div v-if="def">
    <div v-if="furdef">
      <img src="../../assets/furnituredef.jpg" width="100%" height="140px" />
    </div>
    <div v-if="eledef">
      <img src="../../assets/electronicsdef.jpg" width="100%" height="140px" />
    </div>
    <div v-if="grodef">
      <img src="../../assets/grocerydef.jpg" width="100%" height="140px" />
    </div>
    <div v-if="foodef">
      <img src="../../assets/Fooddef.jpg" width="100%" height="140px" />
    </div>
    <div v-if="headef">
      <img src="../../assets/pharmacydef.jpg" width="100%" height="140px" />
    </div>
    <div v-if="fasdef">
      <img src="../../assets/fashiondef.jpg" width="100%" height="140px" />
    </div>
    <!-- <div v-else>
      <img src="../../assets/def.png" width="100%" height="220px" />
    </div> -->
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
      fasdef: false,
      eledef: false,
      grodef: false,
      foodef: false,
      headef: false,
    };
  },
  mounted() {
    const offersurl = BASE_URL + "/seller_image/" + this.email;

    axios
      .get(offersurl)
      .then((response) => {
        this.image = response.data.image;
        console.log(response);
        if (response.status === 200 && response.data.status === 200) {
          this.image = response.data.image;
          this.def = false;
        } else {
          this.def = true;
          // alert(this.category);
          if (this.category === "Furniture") {
            this.furdef = true;
          } else if (this.category === "Electronics") {
            this.eledef = true;
          } else if (this.category === "Grocery") {
            this.grodef = true;
          } else if (this.category === "Health") {
            this.headef = true;
          } else if (this.category === "Food") {
            this.foodef = true;
          } else if (this.category === "Fashion") {
            this.fasdef = true;
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