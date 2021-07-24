<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-info-circle"></i> About'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-shopping-cart"></i> Cart'
      link5='<i class="fa fa-lock"></i> Logout'
    ></topnav>
    <div class="w3-container">
      <div class="w3-row">
        <div class="w3-twothird">
          <h1>Your Coupons</h1>
          <b-card style="margin: 10px 0px">
            <template #header>
              <div class="w3-row">
                <div class="w3-threequarter">
                  <h6 class="mb-0" style="width: fit-content">
                    50% off on Earphones
                  </h6>
                </div>
                <div class="w3-quarter">
                  <div>
                    <i class="fa fa-bolt" style="color: gold"></i> 50 Lemme
                    coins earned
                  </div>
                </div>
              </div>
            </template>
            <div class="a-date">Reedemed 26-jul-2021</div>
            <div>
              <div class="w3-row">
                <div class="w3-col" style="width: 30%">
                  <img
                    src="https://images.unsplash.com/photo-1560243562-f480284a881f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHNob3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                    width="100%"
                    alt=""
                    style="float: left; padding: 10px"
                  />
                </div>
                <div class="w3-col" style="width: 70%">
                  <div class="a-seller">
                    Sold by - Rakesh Digital shop no-142, Supela, Bhilai
                  </div>
                  <div class="a-spend">
                    Money Spend: <i class="fa fa-rupee"></i> 680
                  </div>
                  <div class="a-spend">
                    Money Saved: <i class="fa fa-rupee"></i> 680
                  </div>
                  <div class="a-btn">
                    <a href=""
                      ><i class="fa fa-list-alt" aria-hidden="true"></i> View
                      Similar Coupons</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card>

          <b-card style="margin: 10px 0px">
             <template #header>
              <div class="w3-row">
                <div class="w3-threequarter">
                  <h6 class="mb-0" style="width: fit-content">
                    50% off on Earphones
                  </h6>
                </div>
                <div class="w3-quarter">
                  <div>
                    <i class="fa fa-bolt" style="color: gold"></i> 50 Lemme
                    coins earned
                  </div>
                </div>
              </div>
             </template>
            <div class="a-date">Reedemed 26-jul-2021</div>
            <div>
              <div class="w3-row">
                <div class="w3-col" style="width: 30%">
                  <img
                    src="https://images.unsplash.com/photo-1560243562-f480284a881f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHNob3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                    width="100%"
                    alt=""
                    style="float: left; padding: 10px"
                  />
                </div>
                <div class="w3-col" style="width: 70%">
                  <div class="a-seller">
                    Sold by - Rakesh Digital shop no-142, Supela, Bhilai
                  </div>
                  <div class="a-spend">
                    Money Spend: <i class="fa fa-rupee"></i> 680
                  </div>
                  <div class="a-spend">
                    Money Saved: <i class="fa fa-rupee"></i> 680
                  </div>
                  <div class="a-btn">
                    <a href=""
                      ><i class="fa fa-list-alt" aria-hidden="true"></i> View
                      Similar Coupons</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card>
          <b-card style="margin: 10px 0px">
              <template #header>
              <div class="w3-row">
                <div class="w3-threequarter">
                  <h6 class="mb-0" style="width: fit-content">
                    50% off on Earphones
                  </h6>
                </div>
                <div class="w3-quarter">
                  <div>
                    <i class="fa fa-bolt" style="color: gold"></i> 50 Lemme
                    coins earned
                  </div>
                </div>
              </div>
              </template>
            <div class="a-date">Reedemed 26-jul-2021</div>
            <div>
              <div class="w3-row">
                <div class="w3-col" style="width: 30%">
                  <img
                    src="https://images.unsplash.com/photo-1560243562-f480284a881f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHNob3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
                    width="100%"
                    alt=""
                    style="float: left; padding: 10px"
                  />
                </div>
                <div class="w3-col" style="width: 70%">
                  <div class="a-seller">
                    Sold by - Rakesh Digital shop no-142, Supela, Bhilai
                  </div>
                  <div class="a-spend">
                    Money Spend: <i class="fa fa-rupee"></i> 680
                  </div>
                  <div class="a-spend">
                    Money Saved: <i class="fa fa-rupee"></i> 680
                  </div>
                  <div class="a-btn">
                    <a href=""
                      ><i class="fa fa-list-alt" aria-hidden="true"></i> View
                      Similar Coupons</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </div>
        <div class="w3-third">
          <b-card style="overflow-x: scroll" class="g-card">
            <div style="margin-left: -80px; margin-top: -70px">
              <GoogleChart />
            </div>
            <div class="a-spend" style="font-size: 20px">
              total Money Saved: <i class="fa fa-rupee"></i> 500.
            </div>
            <div class="a-spend" style="font-size: 20px">
              total Money Spent: <i class="fa fa-rupee"></i> 1250.
            </div>
            <div class="a-spend" style="font-size: 20px">
              total Coins Earned:  <i class="fa fa-bolt" style="color: gold"></i> 300.
            </div>
          </b-card>
        </div>
      </div>
    </div>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
import GoogleChart from "./GoogleChart.vue";

export default {
  components: { topnav, Sitefooter, GoogleChart },
};
</script>

<style scoped>
.a-date {
  font-size: 20px;
  font-weight: 600;
  padding: 7px;
}
.a-seller {
  font-size: 18px;
  font-weight: 500;
  padding: 7px;
  color: rgb(51, 51, 51);
}
.a-spend {
  font-size: 15px;
  padding: 7px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgb(0, 80, 0);
}

.a-btn a {
  text-decoration: none;
  border: none;
  padding: 7px 10px;
  background: #008cff;
  font-size: 16px;
  width: fit-content;
  float: right;
  border-radius: 6px;
  font-weight: 400;
  color: rgb(255, 255, 255);
  margin: 10px 0px 10px 0px;
}
.a-btn a:hover {
  opacity: 0.8;
  cursor: pointer;
}
.g-card {
  margin: 55px 10px;
}

@media screen and (max-width: 800px) {
  .g-card {
    margin: 10px 0px;
  }
}
</style>
