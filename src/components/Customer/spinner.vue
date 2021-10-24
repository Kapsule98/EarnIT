<template>
  <div class="loader_wrapper">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader_wrapper {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.89);
  width: 100%;
  height: 100%;
  z-index: 90900000000;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -60px;
  margin-top: -60px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>