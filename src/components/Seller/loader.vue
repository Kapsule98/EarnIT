<template>
  <div class="loader">
    <div class="boxcon">
      <div class="box1">
        <img
          width="100%"
          style="padding: 0px 15%"
          src="../../assets/flogo.png"
          alt=""
        />
      </div>
      <div class="box2"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const loader = document.querySelector(".loader");
    loader.className += " hidden"; // class "loader hidden"
  },
};
</script>

<style scoped>
.loader {
  position: fixed;
  z-index: 99000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader > img {
  width: 100px;
}

.loader.hidden {
  animation: fadeOut 1s;
  animation-fill-mode: forwards;
}

@keyframes fadeOut {
  100% {
    opacity: 0;
    visibility: hidden;
  }
}
</style>