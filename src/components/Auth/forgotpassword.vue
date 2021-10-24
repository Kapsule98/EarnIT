<template>
  <div>
    <topnav
      link1="Register"
      link2="Login"
      url1="/register"
      url2="/login"
      url3="/"
      url4="/"
      url5="/"
      url6="/"
      link3=""
      link4=""
      link5=""
    >
    </topnav>
    <spinner v-if="loading"></spinner>
    <div class="login-box">
      <div class="login-header-box">
        <div class="login-header" style="border-bottom: none">
          Forgot password!
        </div>
      </div>
      <div class="login-content-box">
        <div id="msg"></div>
        <div id="customer" class="regtab w3-animate-opacity">
          <b-form-group
            label="You are a -"
            v-slot="{ ariaDescribedby }"
            style="padding: 10px 5px"
          >
            <b-form-radio-group
              v-model="usertype"
              :options="usertypeoptions"
              :aria-describedby="ariaDescribedby"
              name="radio-options"
            ></b-form-radio-group>
          </b-form-group>

          <div id="step1">
            <input
              v-model="username"
              type="text"
              class="login-input"
              placeholder="Username"
              style="border-radius: 5px 5px 0px 0px"
            />
          </div>
          <div id="step2">
            <input
              v-model="otp"
              type="number"
              placeholder="Enter the OTP here..."
              class="login-input"
              style="border-top: none; border-radius: 0"
            />
            <input
              v-model="password"
              type="password"
              class="login-input"
              placeholder="enter a new password"
              style="border-top: none; border-radius: 0px"
            />
            <input
              v-model="cnfpassword"
              type="password"
              placeholder="confirm password..."
              class="login-input"
              style="border-top: none; border-radius: 0px 0px 5px 5px"
            />
          </div>

          <div id="sendmailbtn">
            <button @click="sendmail()" class="login-button">send mail</button>
          </div>
          <div id="resetbtn">
            <button @click="resetPassword()" class="login-button">
              Reset Password
            </button>
          </div>
          <div id="relogbtn">
            <button @click="openlogin()" class="login-button">Login</button>
          </div>
        </div>
      </div>
    </div>

    <sitefooter></sitefooter>
  </div>
</template>
<script>
import Sitefooter from "../Customer/sitefooter.vue";
import topnav from "../Seller/topnav.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../Customer/spinner.vue";
export default {
  components: { topnav, Sitefooter, Spinner },
  data() {
    return {
      loading: false,
      username: "",
      otp: "",
      password: "",
      cnfpassword: "",
      finalpassword: "",
      usertype: "",
      usertypeoptions: [
        { text: "Customer", value: "Customer" },
        { text: "Seller", value: "Seller" },
        //{ text: "Extra Items", value: "ITEM_FREE" },
      ],
    };
  },
  mounted() {},
  methods: {
    sendmail() {
      this.loading = true;
      const payload = {
        username: this.username,
      };
      var request;
      if (this.usertype === "Seller") {
        request = "/seller/cred";
      } else if (this.usertype === "Customer") {
        request = "/cred";
      }
      const url = BASE_URL + request;
      axios
        .post(url, payload)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            document.getElementById("msg").style.display = "block";
            document.getElementById("msg").innerHTML =
              "an OTP has been sent to you. " + response.data.msg + ".";
            document.getElementById("sendmailbtn").style.display = "none";
            document.getElementById("step2").style.display = "block";
            document.getElementById("resetbtn").style.display = "block";
          } else {
            alert(response.data.msg);
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => (this.loading = false));
    },
    resetPassword() {
      this.loading = true;
      if (this.password === this.cnfpassword) {
        this.finalpassword = this.password;
      } else {
        alert("Passwords do not match!");
      }

      var request;
      if (this.usertype === "Seller") {
        request = "/seller/cred";
      } else if (this.usertype === "Customer") {
        request = "/cred";
      }
      const payload = {
        username: this.username,
        otp: parseInt(this.otp),
        password: this.finalpassword,
      };

      const url = BASE_URL + request;
      axios
        .put(url, payload)
        .then((response) => {
          console.log(response.data);
          if (response.data.status === 200) {
            document.getElementById("msg").innerHTML = response.data.msg + "!";
            document.getElementById("step2").style.display = "none";
            document.getElementById("resetbtn").style.display = "none";
            document.getElementById("step1").style.display = "none";
            document.getElementById("relogbtn").style.display = "block";
            this.$router.push("/login");
          } else {
            alert(response.data.msg);
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        })
        .finally(() => (this.loading = false));
    },
    openlogin() {
      this.$router.push("/login");
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
#relogbtn {
  display: none;
}
#msg {
  display: none;
  color: white;
  background: rgb(64, 165, 44);
  padding: 10px 10px;
  margin: 10px 0px;
  border-radius: 7px;
}
#resetbtn {
  display: none;
}
#step2 {
  display: none;
}
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
.select {
  height: 60px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
select:focus {
  border: 4px solid rgba(0, 183, 255, 0.322);
  outline: none;
}
.option {
  height: 60px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
</style>