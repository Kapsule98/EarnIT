<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-info-circle"></i> About'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-shopping-cart"></i> Cart'
      link5='<i class="fa fa-lock"></i> Logout'
    >
    </topnav>

    <div class="login-box">
      <div class="login-header-box">
        <div class="login-header">LOGIN</div>
      </div>
      <div class="login-content-box">
        <input
          v-model="username"
          type="text"
          class="login-input"
          placeholder="Username"
          style="border-radius: 5px 5px 0px 0px"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="login-input"
          style="border-top: none; border-radius: 0px 0px 5px 5px"
        />

        <button @click="login()" class="login-button">Login</button>
        <a href="" style="float:right">dont have an account? Register here</a>
      </div>
    </div>
    <sitefooter></sitefooter>
  </div>
</template>
<script>
import db from "../../firebase";
import eventBus from "../../utils/eventBus";
import Sitefooter from "../Customer/sitefooter.vue";
import topnav from "../Seller/topnav.vue";
// import bcrypt from 'bcryptjs'
export default {
  components: { topnav, Sitefooter },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username === "" || this.password === "") {
        alert("Validation failed");
        this.init();
      } else {
        const userref = db.collection("users").doc(this.username);
        userref.get().then((snapshot) => {
          if (snapshot.exists) {
            const snapdata = snapshot.data();
            console.log(snapdata);
            // bcrypt.compare(this.password, snapdata.password, function(err, result) {
            //     // result == true
            //     if(result === true){
            //         this.$session.start()
            //         this.$session.set('loggedin',true);
            //         this.$session.set('customer',snapdata.customer)
            //         this.$session.set('seller',snapdata.seller)
            //         this.$router.push('/')
            //     }
            // });
            console.log(this.password);
            if (this.password === snapdata.password) {
              console.log("in here");
              this.$session.start();
              this.$session.set("loggedin", true);
              this.$session.set("customer", snapdata.customer);
              this.$session.set("seller", snapdata.seller);
              eventBus.$emit("login", true);
              eventBus.$emit("customer", snapdata.customer);
              eventBus.$emit("seller", snapdata.seller);
              this.$router.push("/");
            }
          } else {
            alert("invalid credentials");
            this.init();
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.login-box {
  margin: 80px auto;
  width: 35%;
}
.login-header-box {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 10px 10px 0px 0px;
  padding: 20px;
  background: rgb(93, 217, 255);
}
.login-header {
  color: #242424;
  padding: 5px 20px;
  border-bottom: 2px solid #242424;
  width: fit-content;
  margin: 0px auto;
  font-size: 17px;
  letter-spacing: 2px;
}
.login-content-box {
  height:fit-content;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 0px 0px 10px 10px;
  padding: 30px;
}
.login-input {
  height: 60px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
.login-input:focus {
  border: 4px solid rgba(0, 183, 255, 0.322);
  outline: none;
}
.login-input::placeholder {
  font-size: 20px;
  color: #6d6d6d;
}
.login-button{
    width:100%;
    padding:10px;
    text-align: center;
    border-radius: 5px;
    border:1px solid rgb(0, 195, 255);
    color: rgb(0, 195, 255);
    font-size: 20px;
    background: none;
    margin: 20px 0px;
    transition: 0.2s ease-in-out;
}
.login-button:hover{
    background:rgb(0, 195, 255);
    color: white;
}
@media screen and (max-width:800px) {
    .login-box {
  margin: 40px auto;
  width: 90%;
}
}
</style>