<template>
  <div>
    <topnav
      link1='<i class="fa fa-cubes"></i> Dashboard'
      link2='<i class="fa fa-money"></i> Customer Bill'
      link3='<i class="fa fa-user"></i> Account'
      url1="/verifycoupon"
      url2="/customerbill"
      url3="/account"
      link4=""
      link5=""
    ></topnav>

    <div class="w3-row">
      <div class="w3-col m2" style="padding: 1px"></div>

      <div class="w3-col m8">
        <!-- take image input from seller for shop image -->

        <b-card style="margin: 20px 0px">
          <h1>Edit Your Shop Details</h1>
          <hr />
          <div class="w3-row" style="margin-top: 50px">
            <div class="w3-col m2"><b>Shop Image</b></div>

            <div class="w3-col m10">
              <!--   <img v-bind:src="image" style="width: 100%" id="proimg" />-->
              <cropper
                :src="dp"
                class="cropper"
                :stencil-props="{
                  aspectRatio: 16 / 10,
                }"
                ref="cropper"
              ></cropper>

              <br />
              <div class="no_btn" id="no_btn">
                <b-button
                  variant="primary"
                  @click="crop"
                  id="crop"
                  style="margin: 10px"
                  >Crop</b-button
                >
                <b-button variant="primary" @click="encodeImageFileAsURL"
                  >set profile image</b-button
                >
              </div>
              <div style="float: right; margin-top: 10px">
                <!-- <input @change="handleImage" type="file" accept="image/*"> -->
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="file"
                  @change="loadFile"
                />
              </div>
              <img :src="image" alt="" width="50%" />
            </div>
          </div>

          <form action="">
            <table style="width: 100%" class="accountable">
              <tr>
                <td class="detail">Shop Name</td>
                <td class="description">
                  <b-form-input type="text" v-model="shop_name"></b-form-input>
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
                <td class="detail">Shop Bio</td>
                <td class="description">
                  <b-form-input type="text" v-model="bio"></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="detail">Location</td>
                <td class="description">
                  <b-form-input type="text" v-model="location"></b-form-input>
                </td>
              </tr>
              <tr>
                <td class="detail"><a :href="location">View on map</a></td>
              </tr>
            </table>
          </form>
          <!-- <GmapMap
            :center="{ lat: 21.1938, lng: 81.3509 }"
            :zoom="12"
            map-type-id="terrain"
            style="width: 100%; height: 500px"
            @click="mark"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
            />
          </GmapMap> -->
          <b-button
            variant="primary"
            style="float: right; margin: 10px"
            @click="updateDetails()"
            >Edit</b-button
          >
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
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  components: { topnav, Sitefooter, Cropper },

  data() {
    return {
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      newimg: "",
      user: {},
      shop_name: this.$session.get("user_data").shop_name,

      shop_address: this.$session.get("user_data").address,
      shop_contact: this.$session.get("user_data").contact_no,
      shop_category: this.$session.get("user_data").category,
      location: this.$session.get("user_data").location,
      bio: "",
      image: "",
      allcategories: [],
      dp: "",
    };
  },
  mounted() {
    this.getShopBio();
    if (this.$session.get("user_type") === "seller") {
      document.getElementsByClassName("topnav")[0].style.height = "70px";
    }
    const offersurl = BASE_URL + "/categories";
    let JWTToken = this.$session.get("token");
    console.log(this.$session.get("user_data"));
    axios
      .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
      .then((response) => {
        this.allcategories = response.data.categories;
      })
      .catch((err) => {
        console.log(err);
      });
    this.user = this.$session.get("user_data");
    console.log(this.$session.get("user_data"));
    this.getImageBinary();
  },

  methods: {
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      this.dp = canvas.toDataURL("image/jpeg");
      this.encodeImageFileAsURL();
    },
    loadFile(event) {
      this.dp = URL.createObjectURL(event.target.files[0]);
      document.getElementById("no_btn").style.display = "block";
    },
    getImageBinary() {
      const url = BASE_URL + "/seller/image";
      const jwt = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      axios
        .get(url, options)
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.status === 200) {
            this.dp = res.data.image;
            console.log(res);
          } else {
            console.log("Some error occured");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateDetails() {
      var r = confirm("You will need to signin again to update your changes!");
      if (r == true) {
        if (this.shop_name) {
          this.updateShopName();
        }
        if (this.location) {
          console.log("updating location");
          this.updateLocation();
        }
        if (this.shop_contact) {
          this.updateContact();
        }
        if (this.address) {
          this.updateAddress();
        }
        if (this.bio) {
          this.updateBio();
        }
        this.$router.push("/logout");
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
      console.log("updating location", this.location);
      const payload = {
        location: this.location,
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
    },
    getShopBio() {
      const url = BASE_URL + "/seller/bio";
      const accessToken = this.$session.get("token");
      const options = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      axios
        .get(url, options)
        .then((res) => {
          if (res.status === 200 && res.data.status === 200) {
            this.bio = res.data.bio;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateBio() {
      const url = BASE_URL + "/seller/bio";
      const payload = {
        bio: this.bio,
      };
      const accessToken = this.$session.get("token");
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
    encodeImageFileAsURL() {
      document.getElementById("crop").click();
      // var file = element.target.files[0];

      // var reader = new FileReader();
      // this.dp = reader.result.toString();
      // console.log("jwt now = ", this.jwt);
      //reader.onloadend = function () {
      // Upload image to api
      const profile_token = JSON.parse(localStorage.getItem("profile")).token;
      const url = BASE_URL + "/seller/image";
      console.log(this.jwt);
      const options = {
        headers: {
          Authorization: `Bearer ${profile_token}`,
        },
      };
      console.log(options);
      const payload = {
        image: this.dp,
      };
      console.log(payload);
      axios
        .post(url, payload, options)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
      // };
      // // reader.readAsDataURL(file);
      document.getElementById("no_btn").style.display = "none";
    },
  },
};
</script>
<style scoped>
.no_btn {
  display: none;
}
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
.select {
  height: 40px;
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
  height: 40px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
</style>
