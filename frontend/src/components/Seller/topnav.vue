<template>
  <div id="app">
    <div id="nav" class="topnav">
      <i class="fa fa-bars menubtn" v-on:click="openmenu"></i>
      <div class="topnavlink left" style="font-weight: 900">
        <router-link to=""
          ><img
            src="../../assets/flogo.png"
            alt=""
            style="width: 200px; margin-top: -10px"
        /></router-link>
      </div>
      <div
        class="left searchbar"
        v-if="this.$session.get('user_type') !== 'seller'"
      >
        <form class="example" v-if="searchbar === true">
          <input
            type="text"
            placeholder="Search.."
            name="search"
            v-on:click="search"
            autocomplete="off"
          />
          <button v-on:click="search">
            <i class="fa fa-search"></i>
          </button>
        </form>
        <form class="example" v-if="productsearch === true">
          <input
            type="text"
            placeholder="Search.."
            name="search"
            v-on:keyup="productSearch()"
            v-model="searchvalue"
            autocomplete="off"
          />
          <button v-on:click="productSearch()">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>

      <div class="right">
        <i class="fa fa-times closebtn" v-on:click="closemenu"></i>
        <div
          class="resp hiwel"
          style="font-weight: 500; color: black; padding-right: 20px"
        >
          <div
            v-if="
              this.$session.get('logged_in') === 'true' &&
              this.$session.get('user_type') === 'customer'
            "
          >
            Hi {{ user.display_name }}!
          </div>
          <div
            v-else-if="
              this.$session.get('logged_in') === 'true' &&
              this.$session.get('user_type') === 'seller'
            "
          >
            Hi {{ user.shop_name }}!
          </div>
          <div v-bind:class="'topnavlink ' + active6">
            <div :to="url6"><span v-html="link6"></span></div>
          </div>
        </div>
        <div class="resp">
          <div v-bind:class="'topnavlink ' + active1">
            <router-link :to="url1"><span v-html="link1"></span></router-link>
          </div>
        </div>
        <div class="resp">
          <div v-bind:class="'topnavlink ' + active2">
            <router-link :to="url2"><span v-html="link2"></span></router-link>
          </div>
        </div>
        <div class="resp" v-if="this.$session.get('user_type') !== 'seller'">
          <div class="dropdown">
            <button class="dropbtn">
              Categories <i class="fa fa-angle-down"></i>
            </button>
            <div class="dropdown-content">
              <div v-for="items in allcategories" :key="items.length">
                <router-link
                  :to="{ path: '/search', query: { category: items } }"
                  >{{ items }}</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="resp" v-if="this.$session.get('logged_in') === 'true'">
          <div v-bind:class="'topnavlink ' + active3">
            <router-link :to="url3"><span v-html="link3"></span></router-link>
          </div>
        </div>
        <div class="resp">
          <div v-bind:class="'topnavlink ' + active4">
            <router-link :to="url4"><span v-html="link4"></span></router-link>
          </div>
        </div>
        <div class="resp">
          <div
            v-bind:class="'topnavlink ' + active5"
            v-if="this.$session.get('logged_in') !== 'true'"
          >
            <router-link :to="url5"><span v-html="link5"></span></router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  data() {
    return {
      user: {},
      status: undefined,
      allcategories: [],
      searchvalue: "",
    };
  },
  props: [
    "link1",
    "link2",
    "link3",
    "link4",
    "link5",
    "link6",
    "url1",
    "url2",
    "url3",
    "url4",
    "url5",
    "url6",
    "active1",
    "active2",
    "active3",
    "active4",
    "active5",
    "active6",
    "searchbar",
    "productsearch",
  ],
  mounted() {
    this.user = this.$session.get("user_data");
    const offersurl = BASE_URL + "/categories";
    let JWTToken = this.$session.get("token");
    axios
      .get(offersurl, { headers: { Authorization: `Bearer ${JWTToken}` } })
      .then((response) => {
        this.allcategories = response.data.categories;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    productSearch() {
      var input, filter, ul, li, a, i, txtValue;
      input = this.searchvalue;
      filter = input.toUpperCase();

      ul = document.getElementById("Sproducts");
      li = ul.getElementsByClassName("Scard");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("name")[0];

        txtValue = a.textContent || a.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    },
    search() {
      this.$router.push("/search?alloffers=true");
    },
    openmenu: function () {
      document.getElementsByClassName("right")[0].style.left = "0%";
    },
    closemenu: function () {
      document.getElementsByClassName("right")[0].style.left = "-70%";
    },
  },
};
</script>
<style>
.dropbtn {
  background-color: #4caf4f00;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

form.example input[type="text"] {
  padding: 10px;
  font-size: 18px;
  border: none;
  float: left;
  display: flex;
  width: 400px;
  background: #f7fcff;
  margin-top: 0px;
  margin-left: 40px;
}
form.example input[type="text"]:focus {
  outline: none;
  border: 4px 0px 4px 4px solid rgb(255, 17, 0);
}

/* Style the submit button */
form.example button {
  float: left;
  width: 50px;
  padding: 10px;
  background: rgb(0, 119, 255);
  color: rgb(255, 255, 255);
  font-size: 18px;
  border: none;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
  margin-top: 0px;
  border-radius: 0 5px 5px 0;
}

form.example button:hover {
  opacity: 0.6;
}

/* Clear floats */
form.example::after {
  content: "";
  clear: both;
  display: table;
}
.topnav {
  position: relative;
  width: 100%;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
  padding: 14px 20px;
  height: 70px;
  font-size: 18px;
  margin-bottom: 40px;
  background: rgb(93, 217, 255);
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 30%);
}

.topnavlink a {
  color: rgb(34, 34, 34);
  width: fit-content;
  padding: 8px 16px;
  margin: 0px 2px;
  text-decoration: none;
  transition: 0.2s ease-in-out;
}

.topnavlink a:hover {
  background: #008cff;
  color: rgb(233, 255, 234);
}
.active_nav a {
  background: #008cff;
  color: rgb(233, 255, 234);
}

.left {
  float: left !important;
  font-size: 30px;
}
.left a:hover {
  background: none !important;
  color: rgb(0, 0, 0) !important;
  border: none !important;
}

.right {
  margin: 5px 0px;
  float: right;
  display: flex;
  transition: 0.5s ease-in-out;
}
.active a {
  color: #08041f !important;
}

.menubtn {
  display: none;
  font-size: 25px;
  color: black;
  float: right;
  padding-top: 10px;
}
.closebtn {
  display: none;
}
.login a {
  background: #008cff;
  color: rgb(233, 255, 234);
}
@media screen and (max-width: 1050px) {
  .topnav {
    height: 120px;
    margin: 0 0 30px 0px;
  }
  .right {
    position: fixed;
    width: 70%;
    height: 120%;
    display: block;
    top: -10%;
    left: -70%;
    background-color: rgb(248, 248, 248);
    z-index: 2000;
    padding-top: 20%;
  }
  .topnavlink.left {
    font-size: 25px;
    color: white !important;
  }
  .right a {
    padding: 20px 36px !important;
    width: 100%;
  }
  .hiwel {
    margin: 20px;
    font-size: 30px !important;
  }
  .menubtn {
    display: block;
  }
  .closebtn {
    display: block;
    position: absolute;
    right: 20px;
    top: 10%;
    color: teal;
    font-size: 20px;
  }
  form.example input[type="text"] {
    padding: 10px;
    font-size: 14px;
    border: 2px 0px 2px 2px solid rgb(197, 197, 197);
    float: left;
    display: flex;
    width: 83%;
    background: #ffffff;
    margin-top: 10px;
    border: none;
    margin-left: 0px;
  }
  .searchbar {
    width: 100%;
  }
  form.example button {
    float: left;
    width: 15%;
    padding: 10px;
    background: #008cff;
    color: white;
    font-size: 14px;
    border: none;
    border-left: none; /* Prevent double borders */
    cursor: pointer;
    margin-top: 9px;
    border-radius: 0 5px 5px 0;
  }
  .resp {
    padding: 4px 0px;
    font-size: 20px;
  }
}
</style>
