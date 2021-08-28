<template>
  <div>
    <GChart
      type="PieChart"
      :options="options"
      :data="data"
    />    
  </div>
</template>
 
<script>
import { GChart } from "vue-google-charts";

export default {
  name: "App",
  components: {
    GChart
  },
  data() {
    return {
      data: [
          ['type', 'value'],
          ['Money Saved',     500],
          ['Money Spent',      1250],
      ],
      options: {
        width: 500,
        height: 400
      }
    };
  }
};
</script>