<template>
  <div>
    <carousel
      :autoplayTimeout="12000"
      :responsive="{
        0: { items: 1 },
        600: { items: 1 },
        1200: { items: 1 },
      }"
      :stagePadding="0"
      :loop="true"
      :autoplay="true"
      :nav="false"
      :dots="false"
      video:true
    >
      <img src="../../assets/0001.jpg" width="100%" class="homeposters" />
      <img src="../../assets/0002.jpg" width="100%" class="homeposters" />
      <img src="../../assets/0003.jpg" width="100%" class="homeposters" />
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
@media screen and (max-width: 600px) {
  .homeposters {
    width: 100% !important;
  }
}
</style>