<template>
  <div>
    <topnav></topnav>
    <b-card class="back">
      <div class="w3-col m3"><br /></div>
      <div class="w3-col m6">
        <div v-for="(req, idx) in reqList" :key="idx">
          {{ req }}
          <button @click="decide(req, 1)" class="login-button">Approve</button>
          <button @click="decide(req, 0)" class="login-button">Deny</button>
        </div>
        <div>
          <button @click="gotoShopManagement" class="login-button">
            Shop management
          </button>
          <button @click="logout" class="login-button logout">Logout</button>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
import topnav from "../Seller/topnav.vue";
export default {
  components: { topnav },
  data() {
    return {
      reqList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const url = BASE_URL + "/admin/permission";
      const accessToken = localStorage.adminJWT;
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios
        .get(url, options)
        .then((res) => {
          if (res.status === 200) {
            this.reqList = res.data;
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    decide(req, action) {
      const url = BASE_URL + "/admin/permission";
      const payload = {
        email: req["email"],
        opcode: action,
      };
      const accessToken = localStorage.adminJWT;
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios
        .post(url, payload, options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    gotoShopManagement() {
      this.$router.push("/admin/shop");
    },
  },
};
</script>

<style scoped>
.back {
  margin: 10px;
  background: rgb(215, 239, 250);
  padding: 40px 10px;
}
.login-button {
  width: 100%;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 195, 255);
  color: white;
  font-size: 20px;
  background: rgb(0, 195, 255);
  margin: 20px 0px;
  transition: 0.2s ease-in-out;
}
.login-button:hover {
  opacity: 0.5;
}
.logout {
  background: rgba(165, 0, 0, 0.884);
  border: 1px solid rgba(165, 0, 0, 0.884);
}
</style>