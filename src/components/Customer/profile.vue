<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-info-circle"></i> About'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-shopping-cart"></i> Cart'
      link5='<i class="fa fa-lock"></i> Logout'
      url1="/"
      url2="/about"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
    ></topnav>

    <div class="w3-row">
      <div class="w3-col m3" style="padding: 1px"></div>

      <div class="w3-col m6">
        <b-card style="margin: 20px 0px">
          <h1>Your Account</h1>
          <center>
            <table style="width: 80%; text-align: center" class="accountable">
              <tr>
                <td class="detail">Full Name</td>
                <td class="description">{{ user.display_name }}</td>
              </tr>
              <tr>
                <td class="detail">Email</td>
                <td class="description">{{ user.email }}</td>
              </tr>
              <tr>
                <td class="detail">Password</td>
                <td class="description">******</td>
              </tr>
              <tr>
                <td class="detail">Location</td>
                <td class="description">
                  <select name="location" id="">
                    <option value="Bhilai">Bhilai</option>
                    <option value="Raipur">Raipur</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td class="detail">Phone no.</td>
                <td class="description">{{ user.phone }}</td>
              </tr>
            </table>
          </center>
        </b-card>
      </div>

      <div class="w3-col m3" style="padding: 1px"></div>
    </div>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
export default {
  components: { topnav, Sitefooter },

  data() {
    return {
      items: [
        {
          text: "Admin",
          href: "#",
        },
        {
          text: "Manage",
          href: "#",
        },
        {
          text: "Library",
          active: true,
        },
      ],
      user: {},
    };
  },

  mounted() {
    this.user = this.$session.get("user_data");
    console.log(this.user);
  },
};
</script>

<style scoped>
.accountable td {
  padding: 20px 10px;
}
.accountable tr {
  border-bottom: 1px solid rgb(228, 228, 228);
}
.detail {
  color: black;
  font-size: 15px;
  font-weight: 500;
}
.description {
  color: rgb(65, 65, 65);
  font-size: 15px;
}
.edit {
  padding: 6px 14px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
}
</style>
