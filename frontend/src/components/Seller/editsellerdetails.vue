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
      <div class="w3-col m2" style="padding: 1px"></div>

      <div class="w3-col m8">
        <b-card style="margin: 20px 0px">
          <h1>Edit Your Shop Details</h1>

          <form action="">
            <table style="width: 100%" class="accountable">
              <tr>
                <td class="detail">Shop Name</td>
                <td class="description">
                  <b-form-input type="text" v-model="shop_name"></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="detail">Owner Name</td>
                <td class="description">
                  <b-form-input
                    type="text"
                    v-model="shop_owner_name"
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="detail">Email</td>
                <td class="description">
                  <b-form-input
                    type="email"
                    v-model="shop_email"
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="detail">Location</td>
                <td class="description">
                  <b-form-select
                    id="input-3"
                    v-model="shop_location"
                    :options="location"
                  ></b-form-select>
                </td>
              </tr>
              <tr>
                <td class="detail">Phone no.</td>
                <td class="description">
                  <b-form-input
                    type="text"
                    v-model="shop_contact"
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="detail">Address</td>
                <td class="description">
                  <b-form-input
                    type="text"
                    v-model="shop_address"
                  ></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="detail">Categories</td>
                <td class="description">
                  <multiselect
                    v-model="shop_category"
                    :options="categories"
                    :multiple="true"
                  />
                </td>
              </tr>
            </table>
            <b-button
              variant="primary"
              style="float: right; margin: 10px"
              @click="updateDetails()"
              >Edit</b-button
            >
          </form>
        </b-card>
      </div>

      <div class="w3-col m2" style="padding: 1px"></div>
    </div>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "../Customer/sitefooter.vue";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  components: { topnav, Sitefooter },

  data() {
    return {
      user: {},
      shop_name: this.$session.get("user_data").shop_name,
      shop_owner_name: this.$session.get("user_data").owner_name,
      shop_address: this.$session.get("user_data").address,
      shop_contact: this.$session.get("user_data").contact_no,
      shop_email: this.$session.get("user_data").email,
      shop_location: this.$session.get("user_data").location,
      location: [
        {
          text: "Select location",
          value: this.$session.get("user_data").location,
        },
        "Bhilai",
        "Raipur",
      ],
      shop_category: [],
      categories: ["food", "electronics", "fashion", "medical", "sports"],
    };
  },

  mounted() {
    this.user = this.$session.get("user_data");
  },
  methods: {
    updateDetails() {
      if (this.shop_name) {
        this.updateShopName();
      }
      if (this.shop_location) {
        this.updateLocation();
      }
      if (this.shop_email) {
        this.updateEmail();
      }
      if (this.shop_contact) {
        this.updateContact();
      }
      if (this.address) {
        this.updateAddress();
      }
      if (this.shop_owner_name) {
        this.updateOwnerName();
      }
      if (this.shop_category) {
        this.updateCategory();
      }
    },
    updateShopName() {
      const payload = {
        shop_name: this.shop_name,
      };
      const url = BASE_URL + "/seller/update_shop_name";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      console.log(this.shop_name);
    },

    updateLocation() {
      const payload = {
        shop_location: this.shop_location,
      };
      const url = BASE_URL + "/seller/update_location";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      console.log(this.shop_location);
    },
    updateEmail() {
      const payload = {
        email: this.shop_email,
      };
      const url = BASE_URL + "/seller/update_email";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      console.log(payload);
      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      console.log(this.shop_email);
    },
    updateContact() {
      const payload = {
        contact: this.shop_contact,
      };
      const url = BASE_URL + "/seller/update_contact";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      console.log(this.shop_contact);
    },
    updateAddress() {
      const payload = {
        address: this.shop_adress,
      };
      const url = BASE_URL + "/seller/update_address";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      console.log(this.shop_address);
    },
    updateOwnerName() {
      const payload = {
        owner_name: this.shop_owner_name,
      };
      const url = BASE_URL + "/seller/update_owner_name";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });

      console.log(this.shop_location);
    },
    updateCategory() {
      const payload = {
        category: {
          categories: this.shop_category,
        },
      };
      const url = BASE_URL + "/seller/category";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      axios
        .post(url, payload, options)
        .then((response) => console.log(response))
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.accountable td {
  padding: 20px 10px;
}
.accountable tr {
  border-bottom: 0px solid rgb(228, 228, 228);
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
