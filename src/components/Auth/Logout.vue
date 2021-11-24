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
      alert("Logged out successfully");
      eventBus.$emit("login", false);
      eventBus.$emit("seller", false);
      eventBus.$emit("customer", false);
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>