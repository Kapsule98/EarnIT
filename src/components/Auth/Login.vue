<template>
  <div>
    <topnav
      link1="Register"
      url1="/register"
      url2="/"
      url3="/"
      url4="/"
      url5="/"
      url6="/"
      link2=""
      link3=""
      link4=""
      link5=""
    >
    </topnav>
    <spinner v-if="loading"></spinner>
    <div class="login-box">
      <div class="login-header-box">
        <div class="login-header" style="border-bottom: none">Login as</div>

        <div class="w3-row">
          <a
            href="javascript:void(0)"
            v-on:click="openTab('customer')"
            id="defaultOpen"
          >
            <div class="reghead">Customer</div>
          </a>

          <a href="javascript:void(0)" v-on:click="openTab('shop')">
            <div class="reghead">Seller</div>
          </a>
        </div>
        <div class="actvcont">
          <div class="actvtab"></div>
        </div>
      </div>
      <div class="login-content-box">
        <div
          id="customer"
          class="regtab w3-animate-opacity"
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
            style="border-top: none; border-radius: 0"
          />
          <button @click="login('customer')" class="login-button">Login</button>
          <button @click="GoogleSignin()" class="login-button">
            Sign in with google
          </button>
          <a href="/forgotpassword" style="float: right">forgot password?</a>
          <a href="/register" style="float: left"
            >dont have an account? register here</a
          >
        </div>

        <div id="shop" class="regtab w3-animate-opacity" style="display: none">
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
            style="border-top: none; border-radius: 0"
          />
          <button @click="login('seller')" class="login-button">Login</button>
          <a href="/forgotpassword" style="float: right">forgot password?</a>
          <a href="/register" style="float: left"
            >dont have an account? register here</a
          >
        </div>
      </div>
    </div>

    <sitefooter></sitefooter>
  </div>
</template>
<script>
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import { auth, provider } from "../../firebase/firebaseConfig";
// import eventBus from "../../utils/eventBus";
import Sitefooter from "../Customer/sitefooter.vue";
import topnav from "../Seller/topnav.vue";
// import bcrypt from "bcryptjs";
import Spinner from "../Customer/spinner.vue";
export default {
  components: { topnav, Sitefooter, Spinner },
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  mounted() {
    if ("profile" in localStorage) {
      const data = JSON.parse(localStorage.getItem("profile"));
      console.log(data);
      if (data.user_type === "customer") {
        this.$session.start();
        this.$session.set("token", data.token);
        this.$session.set("user_data", data.user_data);
        this.$session.set("user_type", "customer");
        this.$session.set("logged_in", "true");
        this.$router.push("/");
      } else if (data.user_type === "seller") {
        this.$session.start();
        this.$session.set("token", data.token);
        this.$session.set("user_data", data.user_data);
        this.$session.set("user_type", "seller");
        this.$session.set("logged_in", "true");
        this.$router.push("/");
      }
    }
    document.getElementById("defaultOpen").click();
  },
  methods: {
    GoogleSignin() {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          let user = result.user;
          console.log(user); // User that was authenticated
          const payload = {
            email: user.email,
            display_name: user.displayName,
            uid: user.uid,
            phone: user.phoneNumber,
          };
          const url = BASE_URL + "/googleauth";
          axios
            .post(url, payload)
            .then((res) => {
              console.log(res);
              if (res.data.status === 200) {
                const user_data = res.data;
                this.$session.start();
                this.$session.set("token", user_data.jwt);
                this.$session.set("user_data", user_data.user);
                this.$session.set("user_type", "customer");
                this.$session.set("logged_in", "true");
                const storedata = {
                  token: user_data.jwt,
                  user_data: user_data.user,
                  user_type: "customer",
                  logged_in: "true",
                };
                localStorage.setItem("log", this.$session.get("logged_in"));
                localStorage.setItem(
                  "user_type",
                  this.$session.get("user_type")
                );
                localStorage.setItem("profile", JSON.stringify(storedata));
                this.$router.push("/");
              } else {
                alert(res.data.msg);
                this.loading = false;
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err);
            });
        })
        .catch((err) => {
          console.log(err); // This will give you all the information needed to further debug any errors
        });
    },
    login(type) {
      this.loading = true;
      if (this.username === "" || this.password === "") {
        alert("Please fill mandatory fields");
        this.init();
      } else {
        const user = {
          username: this.username,
          password: this.password,
        };
        if (type === "customer") {
          const url = BASE_URL + "/login";
          const payload = user;
          axios
            .post(url, payload)
            .then((res) => {
              console.log(res);
              if (res.data.status === 200) {
                const user_data = res.data;
                this.$session.start();
                this.$session.set("token", user_data.jwt);
                this.$session.set("user_data", user_data.user);
                this.$session.set("user_type", "customer");
                this.$session.set("logged_in", "true");
                const storedata = {
                  token: user_data.jwt,
                  user_data: user_data.user,
                  user_type: "customer",
                  logged_in: "true",
                };

                localStorage.setItem("log", this.$session.get("logged_in"));
                localStorage.setItem(
                  "user_type",
                  this.$session.get("user_type")
                );
                localStorage.setItem("profile", JSON.stringify(storedata));
                this.$router.push("/");
              } else {
                alert(res.data.msg);
                this.loading = false;
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err);
            })
            .finally(() => (this.loading = false));
        }
        if (type === "seller") {
          const url = BASE_URL + "/seller/login";
          const payload = user;
          axios
            .post(url, payload)
            .then((res) => {
              console.log(res);
              if (res.data.status === 200) {
                const seller_data = res.data;
                this.$session.start();
                this.$session.set("token", seller_data.jwt);
                this.$session.set("user_type", "seller");
                this.$session.set("user_data", seller_data.seller);
                this.$session.set("logged_in", "true");
                localStorage.setItem("log", this.$session.get("logged_in"));
                localStorage.setItem(
                  "user_type",
                  this.$session.get("user_type")
                );
                const storedata = {
                  token: seller_data.jwt,
                  user_data: seller_data.seller,
                  user_type: "seller",
                  logged_in: "true",
                };
                localStorage.setItem("profile", JSON.stringify(storedata));
                this.$router.push("/verifycoupon");
              } else if (res.data.status === 403) {
                this.$router.push("/waiting_for_admin_approval");
              } else {
                localStorage.clear();
                alert(res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              alert(err);
            });
        }
      }
    },
    openTab(type) {
      var i, x;
      x = document.getElementsByClassName("regtab");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(type).style.display = "block";

      if (type == "customer") {
        document.getElementsByClassName("actvtab")[0].style.right = "50%";
      } else {
        document.getElementsByClassName("actvtab")[0].style.right = "0%";
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
  height: 370px;
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