<template>
  <div id="loading">
    <img
      class="img"
      src="../../assets/loader.gif"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style>
#loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19009000;
  background-color: rgb(255, 255, 255);
  height: 100%;
  width: 100%;
  text-align: center;
}
.img {
  top: 50%;
  margin: 0px auto;
  margin-left: -100px;
  width: 200px;
  line-height: 100vh;
  vertical-align: middle;
  position: absolute;
}
</style>