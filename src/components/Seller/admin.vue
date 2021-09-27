<template>
  <div class="admin_all">
    <h1 style="margin: 30px 20px">
      Your request has been recived by us. Try to login after some time!
    </h1>
    <h1 style="margin: 30px 20px; color: white">
      <router-link to="/"> Home</router-link>
    </h1>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.admin_all {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(120, 200, 255);
  background: radial-gradient(
    circle,
    rgba(120, 200, 255, 1) 20%,
    rgba(20, 153, 113, 1) 100%,
    rgba(230, 0, 255, 1) 100%
  );
}
</style>
