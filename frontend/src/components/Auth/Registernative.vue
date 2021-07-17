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
        <div class="login-header" style="border-bottom: none">Register as</div>

        <div class="w3-row">
          <a href="javascript:void(0)" v-on:click="openCity('London')" id="defaultOpen">
            <div class="reghead">Customer</div>
          </a>

          <a href="javascript:void(0)" v-on:click="openCity('Paris')">
            <div class="reghead">Shop</div>
          </a>
        </div>
        <div class="actvcont">
          <div class="actvtab"></div>
        </div>
      </div>
      <div class="login-content-box">
        <div
          id="London"
          class=" regtab w3-animate-opacity"
          style="display: none"
        >
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
          style="border-top: none; border-radius:0"
        />
        <input
          v-model="displayname"
          type="text"
          class="login-input"
          placeholder="Name"
          style="border-top: none;border-radius:  0px"
        />
        <input
         v-model="email"
          type="email"
          placeholder="Email"
          class="login-input"
          style="border-top: none; border-radius: 0px 0px 5px 5px"
        />


        <button @click="signup()" class="login-button">Register</button>
        <a href="" style="float: right">already have an account? login here</a>
        </div>

        <div
          id="Paris"
          class=" regtab w3-animate-opacity"
          style="display: none"
        >
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
          style="border-top: none; border-radius:0"
        />
        <input
          v-model="displayname"
          type="text"
          class="login-input"
          placeholder="Name"
          style="border-top: none;border-radius:  0px"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="login-input"
          style="border-top: none; border-radius: 0px 0px 5px 5px"
        />

        <button @click="signup()" class="login-button">Register</button>
        <a href="/loginnative" style="float: right">already have an account? login here</a>
        </div>
      </div>
    </div>

<!--
    <b-form-group label="Seller or customer??" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>

    -->

    <sitefooter></sitefooter>
  </div>
</template>
<script>
import db from "../../firebase";
import Sitefooter from "../Customer/sitefooter.vue";
import topnav from "../Seller/topnav.vue";
// import bcrypt from 'bcryptjs'

export default {
    
  components: { topnav, Sitefooter },
  data() {
    return {
      username: "",
      password: "",
      displayname: "",
      email: "",
      selected: [],
      options: [
        {
          text: "Seller",
          value: "seller",
          id:"Seller"
        },
        {
          text: "Customer",
          value: "customer",
          id:"xemn"
        },
      ],
    };
  },
  
  methods: {
    signup() {
      if (
        this.username === "" ||
        this.password === "" ||
        this.displayname === "" ||
        !this.selected ||
        this.selected.length === 0
      ) {
        alert("validation failed");
      } else {
        const userref = db.collection("users").doc(this.username);
        userref.get().then((snapshot) => {
          if (snapshot.exists) {
            alert("Username taken");
            this.init();
          } else {
            // const saltRounds = 10;
            console.log(this.password);
            const userprofile = {
              uid: this.username,
              displayName: this.displayname,
              email: this.email,
              seller: this.selected.includes("seller"),
              customer: this.selected.includes("customer"),
              c_saving: 0,
              s_earning: 0,
              password: this.password,
            };
            db.collection("users").doc(this.username).set(userprofile);
            this.$router.push("/loginnative");
          }
        });
      }
    },
    openCity: function opencity(cityName) {
      var i, x;
      x = document.getElementsByClassName("regtab");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(cityName).style.display = "block";

      if (cityName == "London") {
        document.getElementsByClassName("actvtab")[0].style.right = "50%";
      } else {
        document.getElementsByClassName("actvtab")[0].style.right = "0%";
         
      }
      
    },
  },
};
window.onload= function(){document.getElementById("defaultOpen").click();}
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
  height: fit-content;
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
  font-size: 16px;
  color: #6d6d6d;
}
.login-button {
  width: 100%;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 195, 255);
  color: rgb(0, 195, 255);
  font-size: 20px;
  background: none;
  margin: 20px 0px;
  transition: 0.2s ease-in-out;
}
.login-button:hover {
  background: rgb(0, 195, 255);
  color: white;
}
@media screen and (max-width: 800px) {
  .login-box {
    margin: 40px auto;
    width: 90%;
  }
}
.actvcont {
  position: relative;
  margin-top: 5px;
}
.actvtab {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 2px;
  background: #008cff;
  transition: 0.5s ease-in-out;
  border-radius: 1px;
}
.reghead {
    display: inline-block;
    text-align: center;
    width: 50%;
  font-size: 17px;
  color: rgb(53, 53, 53);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 15px 0px 0px 8px;
  font-weight: 500;
}

</style>