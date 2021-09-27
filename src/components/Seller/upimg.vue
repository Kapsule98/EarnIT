<template>
  <div style="padding: 10px">
    <b-card>
      <div class="w3-row" style="margin: 20px; margin-top: 50px">
        <div class="w3-col m2"><br /></div>
        <div class="w3-col m8">
          <h2>Welcome to Lemmebuy.in!</h2>
          <h4>Set an profile image for your shop :</h4>
          <br /><br />

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
          <div style="margin-top: 10px">
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
          <br />
          <br />
          <router-link to="/verifycoupon">Skip this step for now</router-link>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  data() {
    return {
      coordinates: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
      },
      newimg: "",
      allcategories: [],
      dp: "",
    };
  },

  methods: {
    components: { Cropper },
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      this.dp = canvas.toDataURL();
      // this.encodeImageFileAsURL();  Multiple calls ???
    },
    loadFile(event) {
      this.dp = URL.createObjectURL(event.target.files[0]);
      document.getElementById("no_btn").style.display = "block";
    },
    encodeImageFileAsURL() {
      document.getElementById("crop").click();
      // var file = element.target.files[0];

      // var reader = new FileReader();
      // this.dp = reader.result.toString();
      // console.log("jwt now = ", this.jwt);
      //reader.onloadend = function () {
      // Upload image to api
      const profile_token = localStorage.getItem("newsptoken");
      const url = BASE_URL + "/seller/image";

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
          console.log(res);
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
</style>