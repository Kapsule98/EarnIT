<template>
  <div style="margin-top: -30px">
    <carousel
      :responsive="{
        0: { items: 3 },
        600: { items: 4 },
        1200: { items: 6 },
      }"
      :stagePadding="20"
      :loop="false"
      :autoplay="false"
      :nav="false"
      :dots="false"
    >
      <div class="cat">Health</div>
      <div class="cat">Fashion</div>
      <div class="cat">Furniture</div>
      <div class="cat">Electronics</div>
      <div class="cat">Food</div>
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
.round {
  width: 80px;
  border-radius: 50%;
  padding: 20px;
}

.cat {
  border: 1px solid rgb(0, 153, 255);
  font-size: 14px;
  text-align: center;
  margin: 5px auto;
  padding: 4px 70px;
  border-radius: 15px;
  width: fit-content;
}
</style>