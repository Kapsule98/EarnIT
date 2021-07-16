<template>
  <div>
    <div class="backwrap">
      <topnav
        link1='<i class="fa fa-home"></i> Home'
        link2='<i class="fa fa-info-circle"></i> About'
        link3='<i class="fa fa-user"></i> Account'
        link4='<i class="fa fa-shopping-cart"></i> Cart'
        link5='<i class="fa fa-lock"></i> Logout'
      >
      </topnav>

      <carousel style="margin-top: -30px"></carousel>

      <div class="lessm">
        <div class="w3-row">
          <div class="w3-quarter">
            <a href="">
            <b-card
              style="
                z-index: 1000;
                background: white;
                border: none;
                border-radius: 0;
              "
            >
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B08345R1ZW---372x232._SY232_CB667322346_.jpg"
                alt="ss"
                width="100%"
              />
              <p class="offhead">Upto 50% 0ff on Refregators</p>
            </b-card>
            </a>
          </div>
          <div class="w3-quarter">
            <a href="">
            <b-card
              style="
                z-index: 1000;
                background: white;
                border: none;
                border-radius: 0;
              "
            >
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg"
                alt="ss"
                width="100%"
              />
              <p class="offhead">Upto 50% 0ff on ACs</p>
            </b-card>
            </a>
          </div>
          <div class="w3-quarter">
            <a href="">
            <b-card
              style="
                z-index: 1000;
                background: white;
                border: none;
                border-radius: 0;
              "
            >
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08CPQVLZT._SY232_CB667322346_.jpg"
                alt="ss"
                width="100%"
              />
              <p class="offhead">Upto 50% 0ff on Washing Machines</p>
            </b-card>
            </a>
          </div>
          <div class="w3-quarter">
            <a href="">
            <b-card
              style="
                z-index: 1000;
                background: white;
                border: none;
                border-radius: 0;
              "
            >
              <img
                src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/B07G5J5FYP._SY232_CB667322346_.jpg"
                alt="ss"
                width="100%"
              />
              <p class="offhead">Upto 50% 0ff on Microwaves</p>
            </b-card>
            </a>
          </div>
        </div>
      </div>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h3 style="padding: 0px">Top Offers</h3>
        <div class="w3-container" style="padding: 20px 0px">
          <carousel2></carousel2>
        </div>
      </b-card>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">Tagline for Apparels</h2>
        <carousel2></carousel2>
        <div class="w3-row" style="padding: 10px 0px">
          <div class="w3-half">
            <div class="c-grid">
              <a href="">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/BRANDtiles/USPA._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
              </a>
            </div>

            <div class="c-grid">
              <a href="">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/SBC/Ess-9card_01._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
              </a>
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              <a href="">
              30% 0ff on U.S polo T-shirts
              </a>
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              <a href="">
              30% 0ff on U.S polo T-shirts
              </a>
            </div>
          </div>

          <div class="w3-half">
            <div class="c-grid">
              <a href="">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/SBC/Ess-9card_01._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
              </a>
            </div>
            <div class="c-grid">
              <a href="">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/BRANDtiles/USPA._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
              </a>
            </div>

            <div class="c-grid" style="padding: 0px 10px">
              <a href="">
              30% 0ff on U.S polo T-shirts
              </a>
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              <a href="">
              30% 0ff on U.S polo T-shirts
              </a>
            </div>
          </div>
        </div>
      </b-card>

      <b-card style="margin-top: 5px; border: none; border-radius: 0">
        <h2 style="padding: 20px">Tagline for Food</h2>
        <carousel2></carousel2>

        <div class="w3-row" style="padding: 10px 0px">
          <div class="w3-half">
            <div class="c-grid">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/BRANDtiles/USPA._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
            </div>

            <div class="c-grid">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/SBC/Ess-9card_01._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              30% 0ff on U.S polo T-shirts
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              30% 0ff on U.S polo T-shirts
            </div>
          </div>

          <div class="w3-half">
            <div class="c-grid">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/SBC/Ess-9card_01._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
            </div>
            <div class="c-grid">
              <img
                src="https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/EOSS21June/BRANDtiles/USPA._SY530_QL85_.jpg"
                alt="ss"
                width="100%"
                class="c-img"
                style="padding: 5px"
              />
            </div>

            <div class="c-grid" style="padding: 0px 10px">
              30% 0ff on U.S polo T-shirts
            </div>
            <div class="c-grid" style="padding: 0px 10px">
              30% 0ff on U.S polo T-shirts
            </div>
          </div>
        </div>
      </b-card>
      <sitefooter></sitefooter>
    </div>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import Carousel from "./carousel.vue";
import carousel2 from "./carousel2.vue";
import Sitefooter from './sitefooter.vue';
export default {
  components: { topnav, Carousel, carousel2, Sitefooter },
};
</script>

<style scoped>
.c-grid {
  display: inline-flex;
  width: 50%;
}

.card-body {
  padding: 10px 1.25rem !important;
}
.offhead {
  color: rgb(27, 27, 27);
  font-size: 17px;
  text-align: center;
  width: 100%;
  padding: 5px 10px 0px 10px;
  height: 52px;
  margin: 0px;
}
.lessm {
  margin-top: 0px;
  z-index: 1;
  background: rgb(224, 224, 224);
  text-align: center;
}
.backwrap {
  background-color: rgb(160, 160, 160);
}
.c-img{
  height: 200px;
}
@media screen and (min-width:800px) {
  .c-img{
  height: 250px;
}
}

a{
  text-decoration: none;
}
</style>