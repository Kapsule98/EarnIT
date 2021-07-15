<template>
  <carousel
    :autoplayTimeout="3000"
    :responsive="{
      0: { items: 1, nav: false },
      600: { items: 3, nav: true },
      1200: { items: 4 },
    }"
    :stagePadding="0"
    :loop="true"
    :autoplay="true"
    :nav="false"
    :dots="false"
  >
    <a href="">
      <div class="couponhome">
        <div class="c2-back">
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg?crop=0.669xw:1.00xh;0.300xw,0&resize=640:*"
          />
        </div>
        <div class="c2-off">40% OFF on Vegetables</div>
        <div class="c2-left">5 coupons left</div>
        <div class="c2-shop">Rakesh Digital</div>
        <div class="c2-location"><i class="fa fa-map-marker"></i> Sector-6</div>
        <div class="c2-validity">offer valid til 2 jun 2021</div>
      </div>
    </a>
     <a href="">
    <div class="couponhome">
      <div class="c2-back">
        <img
          src="https://cb.scene7.com/is/image/Crate/StainlessToolsGroupFHF16/$web_pdp_main_carousel_zoom_med$/190411135444/stainless-steel-utensils.jpg"
        />
      </div>
      <div class="c2-off">40% OFF on Utencils</div>
      <div class="c2-left">5 coupons left</div>
      <div class="c2-shop">Rakesh Digital</div>
      <div class="c2-location"><i class="fa fa-map-marker"></i> Sector-6</div>
      <div class="c2-validity">offer valid til 2 jun 2021</div>
    </div>
    </a>
    <a href="">
    <div class="couponhome">
      <div class="c2-back">
        <img
          src="https://assets.mspimages.in/wp-content/uploads/2019/10/Samsung-Galaxy-M30s-Review-Header-1024x683.jpg"
        />
      </div>
      <div class="c2-off">40% OFF on Samsung M30s</div>
      <div class="c2-left">5 coupons left</div>
      <div class="c2-shop">Rakesh Digital</div>
      <div class="c2-location"><i class="fa fa-map-marker"></i> Sector-6</div>
      <div class="c2-validity">offer valid til 2 jun 2021</div>
    </div>
    </a>
    <a href="">
    <div class="couponhome">
      <div class="c2-back">
        <img
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg?crop=0.669xw:1.00xh;0.300xw,0&resize=640:*"
        />
      </div>
      <div class="c2-off">40% OFF on Vegetables</div>
      <div class="c2-left">5 coupons left</div>
      <div class="c2-shop">Rakesh Digital</div>
      <div class="c2-location"><i class="fa fa-map-marker"></i> Sector-6</div>
      <div class="c2-validity">offer valid til 2 jun 2021</div>
    </div>
    </a>
    <a href="">
    <div class="couponhome">
      <div class="c2-back">
        <img
          src="https://cb.scene7.com/is/image/Crate/StainlessToolsGroupFHF16/$web_pdp_main_carousel_zoom_med$/190411135444/stainless-steel-utensils.jpg"
        />
      </div>
      <div class="c2-off">40% OFF on Utencils</div>
      <div class="c2-left">5 coupons left</div>
      <div class="c2-shop">Rakesh Digital</div>
      <div class="c2-location"><i class="fa fa-map-marker"></i> Sector-6</div>
      <div class="c2-validity">offer valid til 2 jun 2021</div>
    </div>
    </a>
    <div class="couponhome">
      <div class="c2-back">
        <img
          src="https://assets.mspimages.in/wp-content/uploads/2019/10/Samsung-Galaxy-M30s-Review-Header-1024x683.jpg"
        />
      </div>
      <div class="c2-off">40% OFF on Samsung M30s</div>
      <div class="c2-left">5 coupons left</div>
      <div class="c2-shop">Rakesh Digital</div>
      <div class="c2-location"><i class="fa fa-map-marker"></i> Sector-6</div>
      <div class="c2-validity">offer valid til 2 jun 2021</div>
    </div>
  </carousel>
</template>

<script>
import carousel from "vue-owl-carousel";

export default {
  components: { carousel },
};
</script>
<style scoped>
.couponhome {
  position: relative;
  width: 98%;
  height: 220px;
  margin: 10px auto;
  background: rgba(0, 0, 0, 0.479);
  padding: 10px;
  overflow: hidden;
}
.c2-off {
  font-size: 22px;
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  font-weight: 900;
  height: 80px;
  width: 100%;
  margin-top: 20px;
  display: block;
}
.c2-validity {
  font-size: 14px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 400;
  display: block;
}
.c2-shop {
  font-size: 17px;
  color: rgb(255, 255, 255);
  font-weight: 400;
  display: block;
  padding: 10px;
  border-bottom: 1px solid teal;
}
.c2-location {
  top: 5px;
  left: 5px;
  position: absolute;
  font-size: 11px;
  color: rgb(0, 0, 0);
  text-transform: lowercase;
  font-weight: 400;
  display: block;
  background: white;
  border: 2px solid rgba(0, 128, 128, 0.767);
  padding: 2px 3px;
  border-radius: 9px;
}
.c2-left {
  font-size: 17px;
  color: rgb(255, 255, 255);
  text-transform: lowercase;
  font-weight: 600;
  background: rgba(0, 128, 128, 0.719);
  width: fit-content;
  border-radius: 6px;
  padding: 2px 14px;
  margin: 5px auto;
}
.c2-back {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>