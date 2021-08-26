<template>
  <div></div>
</template>
<script>
import eventBus from "../../utils/eventBus";
export default {
  created() {
    this.logout();
  },
  methods: {
    logout() {
      this.$session.destroy();
      localStorage.clear();
      alert("Logged out successfully");
      eventBus.$emit("login", false);
      eventBus.$emit("seller", false);
      eventBus.$emit("customer", false);
      this.$router.push("/");
    },
  },
};
</script>