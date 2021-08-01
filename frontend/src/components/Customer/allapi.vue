<template>
  <div>
    <customerlisting datalist="{{alldata}}"></customerlisting>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import { BASE_URL } from "../../utils/constants";
import customerlisting from "./customerlisting.vue";
Vue.use(VueAxios, axios);
export default {
  components: { customerlisting },
  data() {
    return {
      alldata: undefined,
    };
  },
  mounted() {
    const urla = BASE_URL + "/seller/add_category";
    const urlb = BASE_URL + "/seller/add_category";
    Vue.axios.get(urla, urlb).then((resp) => {
      this.alldata = resp.data.data;
      console.warn(resp.data.data);
    });
  },
};
</script>
