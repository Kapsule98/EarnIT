<template>
  <div id="app">
    <div id="nav" class="topnav">
      <i class="fa fa-bars menubtn" v-on:click="openmenu"></i>
      <div class="topnavlink left" style="font-weight: 900">
        <router-link to="/">Lemmebuy.in</router-link>
      </div>
      <div class="left searchbar">
        <form class="example" action="action_page.php">
          <input type="text" placeholder="Search.." name="search" />
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>

      <div class="right">
        <i class="fa fa-times closebtn" v-on:click="closemenu"></i>
        <div
          class="resp hiwel"
          style="font-weight: 500; color: black; padding-right: 20px"
        >
          Hi {{ user.shop_name }}!
          <div v-bind:class="'topnavlink ' + active6">
            <router-link :to="url6"><span v-html="link6"></span></router-link>
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
        <div class="resp">
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
          <div v-bind:class="'topnavlink ' + active5">
            <router-link :to="url5"><span v-html="link5"></span></router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import { BASE_URL } from "../../utils/constants";
import axios from "axios";
export default {
  data() {
    return {
      user: {},
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
  ],

  methods: {
    openmenu: function () {
      document.getElementsByClassName("right")[0].style.left = "0%";
    },
    closemenu: function () {
      document.getElementsByClassName("right")[0].style.left = "-70%";
    },
  },
  mounted() {
    this.user = this.$session.get("user_data");
    console.log(this.user);
    const topoffersurl = BASE_URL + "/seller/add_category";
    axios.get(topoffersurl).then((resp) => {
      this.topoffers = resp.data.data;
      console.warn(resp.data.data);
    });
  },
};
</script>
<style>
form.example input[type="text"] {
  padding: 10px;
  font-size: 14px;
  border: none;
  float: left;
  display: flex;
  width: 200px;
  background: #cfeeff;
  margin-top: 0px;
}

/* Style the submit button */
form.example button {
  float: left;
  width: 50px;
  padding: 10px;
  background: rgb(0, 119, 255);
  color: rgb(255, 255, 255);
  font-size: 14px;
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
  margin-bottom: 30px;
  background: linear-gradient(
    90deg,
    rgb(93, 217, 255),
    rgb(93, 217, 255),
    rgb(169, 255, 219)
  );
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 30%);
}

.topnavlink a {
  color: rgb(68, 68, 68);
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
