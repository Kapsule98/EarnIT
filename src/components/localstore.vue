<template>
  <div></div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../utils/constants";
export default {
  mounted() {
    if (!("get_all_offers" in sessionStorage)) {
      this.func1();
    }
    if (!("categories" in sessionStorage)) {
      this.func2();
    }
    if (!("shops" in sessionStorage)) {
      this.func3();
    }
  },
  methods: {
    func1() {
      var url = BASE_URL + "/get_all_offers";
      if ("get_location" in sessionStorage) {
        url =
          BASE_URL +
          "/get_offers_in_city/" +
          sessionStorage.getItem("get_location");
      }
      axios
        .get(url)
        .then((response) => {
          sessionStorage.setItem(
            "get_all_offers",
            JSON.stringify(response.data)
          );
          console.log(response);
        })
        .catch((err) => {
          console.error(err);
        })
        .then(() => {
          this.$router.go();
        });
    },
    func2() {
      const url = BASE_URL + "/categories";
      let JWTToken = this.$session.get("token");
      axios
        .get(url, { headers: { Authorization: `Bearer ${JWTToken}` } })
        .then((response) => {
          sessionStorage.setItem("categories", JSON.stringify(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    func3() {
      const url = BASE_URL + "/get_shops/all";
      axios
        .get(url)
        .then((response) => {
          sessionStorage.setItem("shops", JSON.stringify(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>