<template>
  <div>
    <carousel
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
    >
      <img
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/8/12/e0a239e2-46df-4308-81e9-843f14ee18821628771628414-Wrogn_Desk_Banner--1-.jpg"
        style="width: 100%"
      />
      <img
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/8/12/0115163a-c65c-47a2-9828-eddc637253d11628778790401-Kidswear_Dk.jpg"
        width="100%"
      />
      <img
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/8/12/a37b36d9-4e64-4f25-bb0e-97524745cf051628771671703-Dressberry_Desk.jpg"
        width="100%"
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
</style>