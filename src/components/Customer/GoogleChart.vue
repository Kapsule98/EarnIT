<template>
  <div>
    <GChart type="PieChart" :options="options" :data="data" />
  </div>
</template>
 
<script>
import { GChart } from "vue-google-charts";

export default {
  name: "App",
  components: {
    GChart,
  },
  props: ["moneyspent", "moneysaved"],
  data() {
    return {
      data: [
        ["type", "value"],
        ["Money Saved", this.moneysaved],
        ["Money Spent", this.moneyspent],
      ],
      options: {
        width: 500,
        height: 400,
      },
    };
  },
};
</script>