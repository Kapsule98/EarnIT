<template>
  <div>
    <div class="l-footer" style="margin-top: 5px">
      <div class="f-box">
        <div style="float: left; color: white; font-size: 25px" class="f-logo">
          <a href="/"
            ><img
              src="../../assets/flogo.png"
              class="footlogo"
              alt="logo"
              style="margin-top: -65px; margin-bottom: -85px"
          /></a>
        </div>
        <div
          style="float: right"
          v-if="this.$session.get('logged_in') !== 'true'"
        >
          <a href="/register"
            ><button
              class="f-register"
              style="background: #008cff; color: white"
            >
              Register
            </button></a
          >

          <a href="/login"
            ><button class="f-register" style="background: white">
              Login
            </button></a
          >
        </div>
      </div>
      <div
        class="w3-row"
        style="margin-top: 50px; border-bottom: 1px solid white; padding: 20px"
      >
        <div class="w3-col m2 s6" style="margin-top: 10px">
          <a href=""><div class="coltop">ABOUT</div></a>
          <a href="/about"><div>About Us</div></a>
          <a href="/admin/register"><div>Admin</div></a>
        </div>
        <!-- <div class="w3-col m3 s6" style="margin-top: 10px">
          <a href=""><div class="coltop">HELP</div></a>
          <a href=""><div>FAQs</div></a>
        </div> -->
        <div class="w3-col m3 s6" style="margin-top: 10px">
          <router-link to="/contact">
            <div
              class="coltop"
              style="display: block; font-weight: 600; color: white"
            >
              Contact Us
            </div>
          </router-link>
          <br /><br />
          <a href="https://www.facebook.com/Lemmebuyin-267448181767528/"
            ><i
              class="fa fa-facebook"
              style="margin-right: 20px; font-size: 20px"
            ></i
          ></a>
          <a href="https://www.instagram.com/lemmebuy.in?r=nametag"
            ><i
              class="fa fa-instagram"
              style="margin-right: 10px; font-size: 20px"
            ></i
          ></a>
        </div>
        <!-- <div class="w3-col m4 s6 f-address">
          <br /><br /><br />

          <a href=""
            ><i class="fa fa-twitter" style="margin-right: 10px"></i
          ></a>
        </div> -->
      </div>
      <!--   <div class="w3-row" style="margin-top: 20px">
        <div class="w3-col m8">
         <a href=""
            ><span style="padding: 0px 40px 0px 0px"> Sell on Lemmebuy</span></a
          >
          <a href=""
            ><span style="padding: 0px 40px 0px 0px"> Advertise</span></a
          >
          <a href=""
            ><span style="padding: 0px 40px 0px 0px">Gift Card </span></a
          >
          <a href=""><span style="padding: 0px 40px 0px 0px">Center</span></a>-->
    </div>
    <!-- <div class="w3-col m4">
          <i class="fa fa-copyright"></i> 2021-20XX Lemmebuy.in
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = this.$session.get("user_data");
    localStorage.setItem("log", this.$session.get("logged_in"));
  },
  methods: {},
};
</script>

<style scoped>
.footlogo {
  width: 200px;
  margin-top: -5px;
}
.l-footer {
  position: relative;
  z-index: 100;
  width: 100%;
  background: #08041f;
  padding: 40px;
  height: fit-content;
  color: white;
}
.f-register {
  border: none;
  width: 120px;
  border-radius: 5px;
  font-size: 17px;
  padding: 8px 12px;
  margin: 5px 10px;
}
.f-register:hover {
  opacity: 0.7;
}
.f-box {
  width: 100%;
  margin-bottom: 50px;
}
.coltop {
  color: #c9c9c9;
  margin-bottom: 5px;
  font-size: 18px;
}
.f-address {
  border-left: 1px solid white;
  padding: 0px 20px;
  min-height: 150px;
  margin-top: 10px;
}
@media screen and (max-width: 800px) {
  .l-footer {
    padding: 10px;
    padding-bottom: 70px;
  }
  .f-address {
    border-left: none;
    padding: 0px 0px;
    min-height: 150px;
    margin-top: 10px;
  }
  .f-logo {
    display: none;
  }
}
.l-footer a {
  text-decoration: none;
  color: white;
}
.l-footer a:hover {
  color: rgb(0, 183, 255);
}
</style>