<template>
  <div>
    <topnav
      v-if="this.$session.get('user_type') !== 'seller'"
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :searchbar="true"
      :display_categories="true"
      :landing="true"
    ></topnav>
    <topnav
      v-if="this.$session.get('user_type') === 'seller'"
      link3="Account"
      link4="Dashboard"
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/account"
      url4="/verifycoupon"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :searchbar="true"
      :display_categories="true"
      :landing="true"
    ></topnav>
    <div class="w3-container">
      <b-card>
        <h1 class="heading">About Us</h1>
        <div class="w3-row">
          <div class="w3-col m6">
            <p>
              Launching in 2021, Our highly skilled team is working to connect
              customers and retailers in a better way so that customers can
              discover fresh exciting deals and build a new relationship with
              them. We are making a great effort so that customers can enjoy
              <span style="color: #008cff; font-weight: 600">
                अपनी दुकान का सामान
              </span>
              guaranteed quality products at the best price.
            </p>
            <p>
              We are making a new world for customers where they can redeem
              fascinating offers and earn
              <span style="color: #008cff; font-weight: 600">Super coins</span>,
              which can be used to get mega offers by reaching different
              milestones.
            </p>
            <p>
              Lemmebuy is offering retailers a digital existence where they can
              show their exciting offers while building their own customer
              network. Besides, we are providing analytical tools which can
              generate status of their offers and business reports.
            </p>
          </div>
          <div class="w3-col m6" style="padding: 20px">
            <img src="../assets/0001.jpg" alt="" width="100%" />
          </div>
        </div>

        <br /><br />
        <h1 class="heading">Our Team</h1>
        <div class="w3-row team_wrap">
          <div class="w3-col m4">
            <team
              name="Sameer Ranjan"
              designation="Founder"
              :image="require('../assets/sameer.jpg')"
            ></team>
          </div>
          <div class="w3-col m4">
            <team
              name="Shishir Ranjan"
              designation="Co-founder"
              :image="require('../assets/shishir.jpg')"
            ></team>
          </div>
          <div class="w3-col m4">
            <team
              name="Aditya Ray"
              designation="Web Developer"
              :image="require('../assets/aditya.jpg')"
            ></team>
          </div>
        </div>
      </b-card>
    </div>
    <br /><br /><br /><br />
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../components/Seller/topnav.vue";
import Sitefooter from "../components/Customer/sitefooter.vue";
import Team from "./team.vue";
export default {
  components: { topnav, Sitefooter, Team },
};
</script>

<style scoped>
.heading {
  padding: 10px;
  border-bottom: 2px solid #008cff;
  color: #008cff;
  margin-bottom: 40px;
}
.team_wrap {
  padding: 0px 10%;
}
@media screen and (max-width: 700px) {
  .team_wrap {
    padding: 0px;
  }
}
</style>
