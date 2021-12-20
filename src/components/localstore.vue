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
    if (!("raipur_offers" in sessionStorage)) {
      this.func4();
    }
    if (!("bhilai_offers" in sessionStorage)) {
      this.func5();
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
      if (sessionStorage.getItem("get_location") === "Raipur") {
        if ("raipur_offers" in sessionStorage) {
          sessionStorage.setItem(
            "get_all_offers",
            sessionStorage.getItem("raipur_offers")
          );
        }
      } else if (sessionStorage.getItem("get_location") === "Bhilai") {
        if ("bhilai_offers" in sessionStorage) {
          sessionStorage.setItem(
            "get_all_offers",
            sessionStorage.getItem("bhilai_offers")
          );
        }
      }
      if (!("get_all_offers" in sessionStorage)) {
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
          .finally(() => {
            this.$router.go();
          });
      } else {
        this.$router.go();
      }
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
    func4() {
      const url = BASE_URL + "/get_offers_in_city/Raipur";
      axios
        .get(url)
        .then((response) => {
          sessionStorage.setItem(
            "raipur_offers",
            JSON.stringify(response.data)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    func5() {
      const url = BASE_URL + "/get_offers_in_city/Bhilai";
      axios
        .get(url)
        .then((response) => {
          sessionStorage.setItem(
            "bhilai_offers",
            JSON.stringify(response.data)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>