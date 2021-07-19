<template>
  <div>
    <topnav
      link1='<i class="fa fa-home"></i> Home'
      link2='<i class="fa fa-info-circle"></i> About'
      link3='<i class="fa fa-user"></i> Account'
      link4='<i class="fa fa-shopping-cart"></i> Cart'
      link5='<i class="fa fa-lock"></i> Logout'
    ></topnav>

    <div class="w3-row">
      <div class="w3-col m2" style="padding: 1px"></div>

      <div class="w3-col m8">
        <b-card style="margin: 20px 0px">
          <b-breadcrumb :items="items" style="background: none"></b-breadcrumb>
          <h1>Your Account</h1>
          <table style="width: 100%" class="accountable">
            <tr>
              <td class="detail">User ID</td>
              <td class="description">narendramodi1</td>
              <td>
                <button class="edit"><i class="fa fa-edit"></i></button>
              </td>
            </tr>
            <tr>
              <td class="detail">Full Name</td>
              <td class="description">Narendra Modi</td>
              <td>
                <button class="edit"><i class="fa fa-edit"></i></button>
              </td>
            </tr>
            <tr>
              <td class="detail">Email</td>
              <td class="description">narendramodi@gmail.com</td>
              <td>
                <button class="edit"><i class="fa fa-edit"></i></button>
              </td>
            </tr>
            <tr>
              <td class="detail">Password</td>
              <td class="description">******</td>
              <td>
                <button class="edit"><i class="fa fa-edit"></i></button>
              </td>
            </tr>
            <tr>
              <td class="detail">Location</td>
              <td class="description">Bhilai</td>
              <td>
                <button class="edit"><i class="fa fa-edit"></i></button>
              </td>
            </tr>
          </table>
        </b-card>
      </div>

      <div class="w3-col m2" style="padding: 1px"></div>
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
    };
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
