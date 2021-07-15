<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-rupee"></i> Customer Bill'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-lock"></i> logout'
    ></topnav>

    <div class="w3-card c-m" style="background: white; margin-top: -30px">
      <div class="w3-row">
        <div class="w3-twothird" style="padding: 10px">
          <b-card>
            <button class="w3-button w3-teal" style="font-weight: 600">
              ACTIVE
            </button>
            <p class="c-domain">Electronics</p>
            <p class="c-shopname">Rakesh Digitals</p>
            <p class="c-shoplocation">Address : 342, West Bank, Amroli, C.G</p>
            <p class="c-shoplocation">Phone No. : +91888**939</p>
            <p class="s-details">
              Date Joined : 2 jun 2021 | user since 2 months
            </p>
            <div class="w3-row">
              <div class="w3-third">
                <b-card style="margin: 10px;text-align:center">
                 
                    <span class="tealbg">67</span>
                 
                  <template #footer>
                    <div class="c-head">Number of Customers</div>
                  </template>
                </b-card>
              </div>
              <div class="w3-third">
                <b-card style="margin: 10px;text-align:center">
                  <span class="tealbg">654</span>
                  <template #footer>
                    <div class="c-head">Number of Coupons Sold</div>
                  </template>
                </b-card>
              </div>
              <div class="w3-third">
                <b-card style="margin: 10px;text-align:center">
                  <span class="tealbg"><i class="fa fa-rupee"></i> 65,466</span>
                  <template #footer>
                    <div class="c-head">Revenue Generated Through Us:</div>
                  </template>
                </b-card>
              </div>
            </div>
          </b-card>
        </div>
        <div class="w3-third" style="padding: 20px">
          <b-card>
            <ul style="list-style-type: none">
              <li><a href="">Edit shop details</a></li>
              <li><a href="">View your customers</a></li>
              <li><a href="">Add or delete coupons</a></li>
              <li><a href="">Verify a coupon</a></li>
              <li><a href="">Report a problem</a></li>
              <li><a href="">Give feedback</a></li>
            </ul>
          </b-card>
        </div>
      </div>
    </div>
    <div class="c2-footer">FOOTER!</div>
  </div>
</template>
<script>
import topnav from "./topnav.vue";
export default {
  components: {
    topnav,
  },
};
</script>
<style scoped>
.c2-footer {
  height: 300px;
  width: 100%;
  background: rgb(0, 128, 100);
  text-align: center;
  font-size: 50px;
  font-weight: 900;
}
.c-domain {
  color: rgb(90, 90, 90);
  font-weight: 600;
  margin: 15px 5px 5px 5px;
  font-size: 15px;
  text-transform: uppercase;
}
.c-shopname {
  color: teal;
  font-weight: 700;
  font-size: 30px;
  line-height: 0.9;
}

.c-shoplocation {
  color: rgb(90, 90, 90);
  font-size: 18px;
}
.s-details {
  color: rgb(90, 90, 90);
  font-size: 15px;
}
.tealbg {
  background: rgb(255, 255, 255);
  padding: 0px 7px;
  border-radius: 10px;
  color: teal;
  font-weight: 700;
  width: fit-content;
  margin: 5px auto;
  font-size: 25px;
}
.c-head {
  font-size: 15px;
  color: rgb(90, 90, 90);
  font-weight: 700;
  line-height: 2;
}
.c-m {
  padding: 10px 30px;
}
@media screen and (max-width: 600px) {
  .c-m {
    padding: 10px 0px;
  }
}
@media screen and (max-width: 600px) {

  .w3-container{
    padding: 0px 0px 10px 0px !important;
  }

}
</style>