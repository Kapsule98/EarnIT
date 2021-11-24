<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :searchbar="true"
      :display_categories="true"
    ></topnav>

    <div class="w3-row">
      <div class="w3-col m3" style="padding: 1px"></div>

      <div class="w3-col m6">
        <b-card style="margin: 20px 0px">
          <h1>Your Account</h1>

          <table style="width: 80%" class="accountable">
            <tr>
              <td style="width: 70%" class="detail">Full Name</td>
              <td class="description">{{ user.display_name }}</td>
            </tr>
            <tr>
              <td class="detail">Email</td>
              <td class="description">{{ user.email }}</td>
            </tr>
            <!-- <tr>
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
            </tr>-->
            <tr>
              <router-link to="/logout">
                <b-button variant="danger" style="float: right"
                  ><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                  logout</b-button
                ></router-link
              >
            </tr>
          </table>
        </b-card>
      </div>

      <div class="w3-col m3" style="padding: 1px"></div>
    </div>
    <bottomnav></bottomnav>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Bottomnav from "./bottomnav.vue";
import Sitefooter from "./sitefooter.vue";
export default {
  components: { topnav, Sitefooter, Bottomnav },

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

.detail {
  color: black;
  font-size: 15px;
  font-weight: 500;
}
.description {
  color: rgb(65, 65, 65);
  font-size: 15px;
  text-transform: capitalize;
}
.edit {
  padding: 6px 14px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
}
</style>
