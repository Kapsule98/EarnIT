<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      link1=""
      link2=""
      url1="/"
      url2="/"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
      url6="/"
      :searchbar="true"
      :display_categories="true"
    ></topnav>
    <div class="w3-container">
      <div class="w3-card" style="padding: 10px">
        <h3 style="border-bottom: 1px solid #cccccc; padding: 10px">
          Your Milestones
        </h3>
        <h5>
          You are having {{ credit }} Lemmecoins in your account. Shop more
          coupons to get more LemmeCoins!
        </h5>
        <br /><br /><br />
        <div class="upcontain">
          <div class="circle" id="circle1">
            <i
              v-if="reach1 === true"
              class="fa fa-check"
              style="padding: 0; margin: 0"
            ></i>
            <i v-else class="fa fa-close" style="padding: 0; margin: 0"></i>

            <div class="line" id="line1"></div>
            <div class="text">50 Coins</div>
          </div>
          <div class="circle" id="circle2">
            <i
              v-if="reach2 === true"
              class="fa fa-check"
              style="padding: 0; margin: 0"
            ></i>
            <i v-else class="fa fa-close" style="padding: 0; margin: 0"></i>
            <div class="line" id="line2"></div>
            <div class="text">100 Coins</div>
          </div>
          <div class="circle" id="circle3">
            <i
              v-if="reach3 === true"
              class="fa fa-check"
              style="padding: 0; margin: 0"
            ></i>
            <i v-else class="fa fa-close" style="padding: 0; margin: 0"></i>
            <div class="line" id="line3"></div>
            <div class="text">150 Coins</div>
          </div>
          <div class="circle" id="circle4">
            <i
              v-if="reach4 === true"
              class="fa fa-check"
              style="padding: 0; margin: 0"
            ></i>
            <i v-else class="fa fa-close" style="padding: 0; margin: 0"></i>

            <div class="text">200 Coins</div>
          </div>
        </div>
        <br /><br /><br />
        <h3 style="margin: 20px">How Coins can be used?</h3>
        <p style="margin: 20px">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
          dolorum similique, aliquid id voluptatem laudantium veritatis, illo
          molestias magni tempore praesentium quidem quas animi adipisci?
          Adipisci consequuntur, illo perferendis minus autem suscipit voluptas
          quis nesciunt sunt tenetur alias consequatur accusantium fugiat sequi
          ut, dolor a id excepturi earum distinctio nulla maxime sint. Quas
          velit, corporis sed vero minus debitis ad? Soluta veniam cupiditate
          dolore, repellendus ea error ullam excepturi nesciunt sequi cumque
          vero laudantium non necessitatibus obcaecati ipsa iusto delectus
          porro. Non vitae consectetur quod eius vel tempore illum officiis,
          deleniti laudantium et mollitia velit modi sapiente cumque molestias
          ad?
        </p>
        <br /><br /><br />
      </div>
    </div>
    <sitefooter> </sitefooter>
  </div>
</template>
<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: { topnav, Sitefooter },
  data() {
    return {
      credit: "",
      reach1: false,
      reach2: false,
      reach3: false,
      reach4: false,
    };
  },
  mounted() {
    const offersurl = BASE_URL + "/credit";
    let JWTToken = this.$session.get("token");
    axios
      .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
      .then((response) => {
        this.credit = parseInt(response.data.credit_points);

        if (this.credit > 49) {
          document.getElementById("circle1").style.border = "3px solid #008cff";
          document.getElementById("circle1").style.color = "#008cff";
          this.reach1 = true;
        }
        if (this.credit > 99) {
          document.getElementById("circle2").style.border = "3px solid #008cff";
          document.getElementById("circle2").style.color = "#008cff";
          document.getElementById("line1").style.background = "#008cff";
          this.reach2 = true;
        }
        if (this.credit > 149) {
          document.getElementById("circle3").style.border = "3px solid #008cff";
          document.getElementById("circle3").style.color = "#008cff";
          document.getElementById("line2").style.background = "#008cff";
          this.reach3 = true;
        }
        if (this.credit > 199) {
          document.getElementById("circle4").style.border = "3px solid #008cff";
          document.getElementById("circle4").style.color = "#008cff";
          document.getElementById("line3").style.background = "#008cff";
          this.reach4 = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.upcontain {
  padding: 20px;
  display: flex;
  width: fit-content;
  text-align: center;
  margin: 10px auto;
}
.circle {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #dbdbdb;
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
  color: #dbdbdb;
  padding: 0;
  margin: 0;
  margin-left: 45px;
}
.circle:nth-child(1) {
  margin-left: 0;
}

.line {
  position: absolute;
  top: 50%;
  right: -50px;
  height: 3px;
  width: 50px;
  vertical-align: middle;

  background-color: #dbdbdb;
  z-index: -2;
}
.text {
  width: 200%;
  margin-left: -25px;
  text-align: center;
  margin-top: -10px;
  font-weight: 700;
  color: rgb(255, 153, 0);
}
@media screen and (max-width: 600px) {
  .line {
    right: -30px;

    width: 30px;
  }
  .circle {
    margin-left: 25px;
  }
}
</style>