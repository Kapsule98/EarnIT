<template>
  <div>
    <p>
      <input
        type="file"
        accept="image/*"
        name="image"
        id="file"
        @change="loadFile"
        style="display: none"
      />
    </p>
    <p><label for="file" style="cursor: pointer">Upload Image</label></p>

    <cropper
      :src="dp"
      class="cropper"
      :stencil-props="{
        aspectRatio: 16 / 9,
      }"
      ref="cropper"
    ></cropper>
    <button @click="crop">Crop</button>
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
      dp: "",
    };
  },
  mounted() {},
  methods: {
    crop() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      this.dp = canvas.toDataURL();
      this.encodeImageFileAsURL();
    },
    loadFile(event) {
      this.dp = URL.createObjectURL(event.target.files[0]);
    },
  },
};
</script>