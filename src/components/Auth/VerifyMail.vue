<template>
  <div>
    <div class="login-box">
      <div class="login-header-box">
        <div class="login-header" style="border-bottom: none">Verify Email</div>
      </div>
      <div class="login-content-box">
        <div>
          <input
            v-model="email"
            type="email"
            class="login-input"
            placeholder="Email"
            style="border-radius: 5px 5px 0px 0px"
          />
          <input
            v-model="otp"
            type="text"
            class="login-input"
            placeholder="OTP"
            style="border-radius: 0px 0px 5px 5px"
          />
          <button class="login-button" @click="verifyEmail()">
            Verify Email
          </button>
        </div>
        An OTP has been sent to your mail. Check in spam if not found.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  data() {
    return {
      otp: "",
      email: "",
      class: "",
      sptoken: localStorage.getItem("sptoken"),
    };
  },
  // mounted() {
  //   alert(this.sptoken);
  // },
  methods: {
    init() {
      (this.otp = 0), (this.email = "");
    },
    verifyEmail() {
      var url;
      if (this.$route.name === "SellerVerifyMail") {
        url = BASE_URL + "/seller/register";
      } else {
        url = BASE_URL + "/register";
      }
      const jwt = this.sptoken;

      const payload = {
        email: this.email,
        otp: parseInt(this.otp),
      };
      axios
        .put(url, payload, { headers: { Authorization: `Bearer ${jwt}` } })
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            alert("Verify Successful! Please login again.");

            this.$router.push("/login");
          } else if (res.data.status === 403) {
            this.$router.push("/waiting_for_admin_approval");
          } else {
            alert(res.data.msg);
            this.init();
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  height: 300px;
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