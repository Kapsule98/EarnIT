<template>
  <div>
    <spinner v-if="loading"></spinner>
    <div class="login-box">
      <div class="login-header-box">
        <div class="login-header" style="border-bottom: none">Register</div>
      </div>
      <div class="login-content-box">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="login-input"
          style="border-radius: 10px 10px 0 0"
        />

        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="login-input"
          style="border-top: none; border-radius: 0"
        />

        <input
          type="text"
          v-model="display_name"
          placeholder="Display Name"
          class="login-input"
          style="border-top: none; border-radius: 0"
        />

        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="login-input"
          style="border-top: none; border-radius: 0 0 10px 10px"
        />
        <button @click="register()" class="login-button">Register</button>
        <button
          @click="gotoLogin"
          class="login-button"
          style="margin-top: -10px"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Spinner from "../Customer/spinner.vue";
export default {
  compponents: { Spinner },
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      display_name: "",
      email: "",
    };
  },
  methods: {
    init() {
      this.username = "";
      this.password = "";
      this.display_name = "";
      this.email = "";
    },
    register() {
      this.loading = true;
      const url = BASE_URL + "/admin";
      const payload = {
        username: this.username,
        password: this.password,
        display_name: this.display_name,
        email: this.email,
      };
      axios
        .post(url, payload)
        .then((res) => {
          console.log(res);
          alert(res.data);
          this.$router.push("/admin/verifymail");
        })
        .catch((err) => {
          console.log(err);
          this.init();
        })
        .finally(() => (this.loading = false));
    },
    gotoLogin() {
      this.$router.push("/admin/login");
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