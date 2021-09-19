<template>
  <div>
    <input type="file" id="readUrl" />

    <img
      id="uploadedImage"
      src="#"
      alt="Uploaded Image"
      accept="image/png, image/jpeg"
      style="display: none"
    />
    <cropper
      class="cropper"
      :stencil-props="{
        aspectRatio: 16 / 9,
      }"
      ref="cropper"
    ></cropper>
  </div>
</template>
<style scoped>
</style>
<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  components: { Cropper },
  data() {
    return {
      image: "",
    };
  },
  mounted() {
    document.getElementById("readUrl").addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("uploadedImage")
            .setAttribute("src", event.target.result);
          this.image = event.target.result;
          document.getElementById("uploadedImage").style.display = "block";
        });
      }
    });
  },
};
</script>