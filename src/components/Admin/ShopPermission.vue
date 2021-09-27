<template>
  <div>
    <topnav></topnav>
    <b-card class="back">
      <div v-for="(req, idx) in reqList" :key="idx">
        <b-card style="card">
          <!--{ "email": "bqn77116@zwoho.com", "shop_name": "vjkabk", "category": "Health", "display_name": "vjhh", "contact_no": "7608689" } -->
          <div><b> Email</b> : {{ req.email }}</div>
          <div><b>Shop Name</b> : {{ req.shop_name }}</div>
          <div><b>Category</b> : {{ req.category }}</div>
          <div><b>Display Name</b> : {{ req.display_name }}</div>
          <div><b>Contact</b> : {{ req.contact_no }}</div>

          <button @click="decide(req, 1)" class="button">Approve</button>
          <button @click="decide(req, 0)" class="button deny">Deny</button>
        </b-card>
      </div>
      <div>
        <button
          @click="gotoAdminManagement"
          class="button"
          style="float: right"
        >
          Admin management
        </button>
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
      const url = BASE_URL + "/admin/shop";
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
      const url = BASE_URL + "/admin/shop";
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
    gotoAdminManagement() {
      this.$router.push("/admin/permission");
    },
  },
};
</script>

<style scoped>
.back {
  margin: 10px !important;
  background: rgb(243, 243, 243);
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
.card {
  margin: 10px 0px;
  font-size: 17px;
}
</style>