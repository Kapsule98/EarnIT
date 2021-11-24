<template>
  <div>
    <topnav></topnav>
    <b-card class="back">
      <div class="w3-col m3"><br /></div>
      <div class="w3-col m6">
        <b-card class="card">
          <div v-for="(req, idx) in reqList" :key="idx" class="admin-request">
            <div>{{req.email}}</div>
            <div>{{req.display_name}}</div>
            <button @click="decide(req, 1)" class="button">Approve</button>
            <button @click="decide(req, 0)" class="button deny">Deny</button>
          </div>
        </b-card>
        <div>
          <button @click="gotoAdminHome" class="button">
            Admin Home
          </button>
          <button @click="logout" class="button deny">Logout</button>
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
          if(res.status === 200) {
            alert(res.data);
          }
          this.$router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    gotoAdminHome() {
      this.$router.push("/admin/home");
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
.button {
  width: fit-content;
  padding: 7px 10px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 195, 255);
  color: white;
  font-size: 20px;
  background: rgb(0, 195, 255);
  margin: 20px 20px 0px 0px;
  transition: 0.2s ease-in-out;
}
.button:hover {
  opacity: 0.5;
}
.deny {
  background: rgba(165, 0, 0, 0.884);
  border: 1px solid rgba(165, 0, 0, 0.884);
}
.logout {
  background: rgba(165, 0, 0, 0.884);
  border: 1px solid rgba(165, 0, 0, 0.884);
}
</style>