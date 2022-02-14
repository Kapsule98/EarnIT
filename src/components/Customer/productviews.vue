<template>
  <div>
    <div class="views">
      <b-icon-eye></b-icon-eye>
      {{ count }}
    </div>
  </div>
</template>

<script>
import { BIconEye } from "bootstrap-vue";

export default {
  components: {
    BIconEye,
  },
  props: ["count"],
};
</script>

<style scoped>
.views {
  position: absolute;
  top: 30px;
  right: 20px;
  color: rgb(255, 255, 255);
  background: rgba(0, 153, 255, 0.74);
  backdrop-filter: blur(10px);
  border-radius: 6px;
  padding: 0px 4px;
  font-weight: 500;
}
</style>