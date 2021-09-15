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
        <br /><br /><br />
        <div class="upcontain">
          <div class="circle">
            <i class="fa fa-check" style="padding: 0; margin: 0"></i>
            <div class="line"></div>
            <div class="text">20 Coins</div>
          </div>
          <div class="circle">
            <i class="fa fa-check" style="padding: 0; margin: 0"></i>
            <div class="line" style="background: #dbdbdb"></div>
            <div class="text">80 Coins</div>
          </div>
          <div class="circle" style="border-color: #dbdbdb; color: #dbdbdb">
            <i class="fa fa-close"></i>
            <div class="line" style="background: #dbdbdb"></div>
            <div class="text">20 Coins</div>
          </div>
          <div class="circle" style="border-color: #dbdbdb; color: #dbdbdb">
            <i class="fa fa-close"></i>

            <div class="text">80 Coins</div>
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
export default {
  components: { topnav, Sitefooter },
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
  border: 3px solid #008cff;
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
  color: #008cff;
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
  background-color: #008cff;
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