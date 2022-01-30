<template>
  <div>
    <localstore :key="componentKey"></localstore>
    <div class="strip" id="strip" v-if="type !== 'seller'">
      <i class="fa fa-map-marker"></i> Select Location

      <select name="location" class="droplo" id="local" @change="setlocation">
        <option value="all" disabled selected>Select</option>
        <option value="Bhilai">Bhilai</option>
        <option value="Raipur">Raipur</option>
      </select>
      <div style="float: right">
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
        <div class="restxt" v-else>Please Signin!</div>
      </div>
    </div>
    <div id="nav" class="topnav">
      <i class="fa fa-bars menubtn" v-on:click="openmenu"></i>
      <div class="topnavlink left" style="font-weight: 900">
        <router-link to="/"
          ><img src="../../assets/flogo.png" alt="" class="mainlogo"
        /></router-link>
      </div>
      <div class="left searchbar">
        <div class="example" v-if="searchbar === true">
          <input
            ref="prose"
            type="text"
            placeholder="Search.."
            name="search"
            :value="input"
            @input="input = $event.target.value"
            autocomplete="off"
            v-on:click="search"
            v-on:keyup.enter="divert"
          />
          <button v-on:click="divert">
            <i class="fa fa-search"></i>
          </button>
        </div>
        <form
          action="javascript:void(0);"
          class="example"
          v-if="productsearch === true"
        >
          <input
            ref="prose"
            type="text"
            placeholder="Search.."
            name="search"
            :value="input"
            @input="input = $event.target.value"
            autocomplete="off"
            v-on:click="search"
            v-on:keyup.enter="divert"
          />
          <button type="submit" v-on:click="proSearch()">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div class="right">
        <i class="fa fa-times closebtn" v-on:click="closemenu"></i>
        <div
          class="resp hiwel"
          style="
            font-weight: 500;
            color: black;
            padding-right: 20px;
            height: 60px;
          "
        ></div>
        <div class="indate">
          <div
            class="resp"
            v-if="user !== 'seller' && display_categories === true"
          >
            <div class="dropdown">
              <button class="dropbtn">
                Categories <i class="fa fa-angle-down"></i>
              </button>
              <div class="dropdown-content">
                <div
                  v-for="items in allcategories"
                  :key="items.index"
                  v-on:click="closemenu"
                >
                  <router-link
                    :to="{ path: '/search', query: { category: items } }"
                    >{{ items }}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="resp">
            <div v-bind:class="'topnavlink ' + active1">
              <div v-if="type !== 'seller'">
                <router-link to="/profile"
                  ><b-icon-person></b-icon-person> Account
                </router-link>
              </div>
              <div v-if="type === 'seller'">
                <router-link to="/account"
                  ><b-icon-person></b-icon-person> Account
                </router-link>
              </div>
            </div>
          </div>
          <div class="resp">
            <div v-bind:class="'topnavlink ' + active2">
              <div v-if="type !== 'seller'">
                <router-link to="/cart"
                  ><b-icon-heart></b-icon-heart> Wishlist
                </router-link>
              </div>
              <div v-if="type === 'seller'">
                <router-link to="/seller/dashboard"
                  ><b-icon-layers></b-icon-layers> Dashboard
                </router-link>
              </div>
            </div>
          </div>
          <div class="resp">
            <div class="topnavlink">
              <div v-if="this.$session.get('logged_in') !== 'true'">
                <router-link to="/login">Login </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="searchtab" id="searchtab">
        <div class="backbtn" @click="closeSearch">
          <b-icon-arrow-return-left></b-icon-arrow-return-left>
        </div>
        <div id="result"></div>
      </div>
    </div>
    <div class="idle"></div>

    <router-view />
    <div class="reduce"></div>
  </div>
</template>
<script>
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Localstore from "../localstore.vue";
import {
  BIconArrowReturnLeft,
  BIconPerson,
  BIconHeart,
  BIconLayers,
} from "bootstrap-vue";
export default {
  components: {
    Localstore,
    BIconArrowReturnLeft,
    BIconPerson,
    BIconHeart,
    BIconLayers,
  },
  data() {
    return {
      type: "",
      user: {},
      status: undefined,
      allcategories: [],
      searchvalue: "",
      input: "",
      componentKey: 0,
      searchon: false,
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
    "display_categories",
    "focus",
    "landing",
  ],
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.type = this.$session.get("user_type");
    if ("get_location" in sessionStorage) {
      document.getElementById("local").value =
        sessionStorage.getItem("get_location");
    }

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
  watch: {
    input: function () {
      document.getElementById("searchtab").style.display = "block";

      document.getElementById("nav").style.position = "fixed !important";
      document.getElementById("nav").style.top = "0 !important";
      this.searchon = true;
      var count = 0;
      document.getElementById("result").innerHTML = "";
      var filter = this.input.toUpperCase();
      var sdata = JSON.parse(sessionStorage.getItem("get_all_offers"));
      var sndata = JSON.parse(sessionStorage.getItem("shops"));

      for (var i = 0; i < sdata.active_offers.length; i++) {
        var name = "";
        var url = "";
        var type = "";
        if (sdata.active_offers[i].type === "FIXED") {
          name = sdata.active_offers[i].products[0];
          url =
            "/product_description?seller=" +
            sdata.active_offers[i].seller_email +
            "&offer_text=" +
            sdata.active_offers[i].offer_text;
        }
        // if (sdata.active_offers[i].type === "BILL_DISCOUNT") {
        //   name = "Discount on total bill";
        //   url = "/seller?seller=" + sdata.active_offers[i].seller_email;
        // }
        if (name.toUpperCase().indexOf(filter) > -1 && count < 10) {
          count++;

          document.getElementById("result").innerHTML +=
            "<div class='seresw'><a href='" +
            url +
            "' class='seres'>" +
            name +
            " by " +
            sdata.active_offers[i].seller_display_name +
            " in " +
            sdata.active_offers[i].category +
            type +
            "</a></a><div class='stype'>in Offer</div></div></div>" +
            "<br>";
        }
      }
      for (var k = 0; k < sndata.sellers.length; k++) {
        var surl = "/seller?seller=" + sndata.sellers[k].email;
        var sname = sndata.sellers[k].shop_name;

        if (sname.toUpperCase().indexOf(filter) > -1 && count < 10) {
          count++;

          document.getElementById("result").innerHTML +=
            "<div class='seresw'><a href='" +
            surl +
            "'class='seres'>" +
            sname +
            "</a><div class='stype'>in Seller</div></div>" +
            "<br> ";
        }
      }
    },
  },
  methods: {
    handleScroll() {
      if (!this.searchon) {
        var navbar = document.getElementById("nav");
        var sticky = navbar.offsetTop;
        navbar.classList.remove("smsticky");

        if (window.pageYOffset > sticky) {
          navbar.classList.add("sticky");
          // alert(sticky);
        } else {
          navbar.classList.remove("sticky");
        }
      } else {
        navbar.classList.remove("sticky");
        navbar.classList.add("smsticky");
      }
    },
    setlocation() {
      sessionStorage.setItem(
        "get_location",
        document.getElementById("local").value
      );
      sessionStorage.setItem(
        "temp_offers",
        sessionStorage.removeItem("get_all_offers")
      );
      sessionStorage.removeItem("get_all_offers");

      this.componentKey += 1;
    },
    divert() {
      document.getElementById("searchtab").style.display = "none";
      document.getElementById("nav").style.position = "relative";
      this.$router.push("/get_result?value=" + this.input);
      this.searchon = false;

      // this.$router.go("/");
    },
    closeSearch() {
      document.getElementById("searchtab").style.display = "none";
      document.getElementById("nav").style.position = "relative";
      this.searchon = false;
    },
    proSearch() {},
    productSearch() {
      // var input, filter, ul, li, a, i, j, txtValue;
      // input = this.searchvalue;
      // filter = input.toUpperCase();
      // ul = document.getElementById("Sproducts");
      // li = ul.getElementsByClassName("Scard");
      // for (i = 0; i < li.length; i++) {
      //   a = li[i].getElementsByTagName("nav");
      //   for (j = 0; j < a.length; j++) {
      //     txtValue = a[j].textContent || a[j].innerText;
      //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
      //       li[i].style.display = "";
      //     } else {
      //       li[i].style.display = "none";
      //     }
      //   }
      // }
    },
    search() {
      document.getElementById("searchtab").style.display = "block";
      document.getElementById("nav").style.position = "fixed";
      document.getElementById("strip").style.position = "fixed";

      document.getElementById("nav").style.top = "0";
      document.getElementById("strip").style.top = "0";

      // this.$router.push("/search?alloffers=true");
    },
    openmenu: function () {
      document.getElementsByClassName("right")[0].style.left = "0%";
      document.getElementsByClassName("reduce")[0].style.display = "block";
    },
    closemenu: function () {
      document.getElementsByClassName("right")[0].style.left = "-70%";
      document.getElementsByClassName("reduce")[0].style.display = "none";
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Assistant:wght@400&display=swap");

body {
  font-family: "Assistant", sans-serif;
}
.idle {
  display: none;
  height: 100px;
  padding-top: 60px;
}

.fa-map-marker {
  padding: 0px 5px;
  padding-bottom: 4px;
  color: rgb(255, 255, 255);
  font-size: 14px;
}
.droplo {
  background: rgba(255, 255, 255, 0.788);
  border-radius: 4px;
  border: none;
}
.droplo:focus {
  outline-color: rgb(0, 98, 209);
}
.strip {
  position: relative;
  top: 0;
  width: 100%;
  padding: 0px 6px;
  font-size: 14px;
  height: 30px;
  background: #002c52;
  color: white;
  line-height: 30px;
  vertical-align: middle;
  z-index: 499;
  /* border-bottom: 2px solid rgb(255, 255, 255); */
}
.backbtn {
  margin-top: -10px;
  font-size: 25px;
  padding: 0px 10px 0px 20px;
  width: 100%;
  border-bottom: 1px solid rgba(110, 110, 110, 0.459);
  margin-bottom: 10px;
}
@media screen and (min-width: 1050px) {
  .wlcm {
    width: 160px;
    height: 1.4em;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 20px;
    white-space: nowrap;
  }
  .sticky {
    position: fixed !important;
    top: 0;
    width: 100%;
    margin-top: 0px !important;
    margin-bottom: 70px !important;
  }
}
.seresw {
  position: relative;
  padding: 0px 20px 10px 20px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.123);
}

.seres {
  font-size: 16px;
  color: #474747;
}
.stype {
  color: #858585;
}
.searchtab {
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: 110%;
  background: #ffffff;
  z-index: 999999999999;
  padding: 20px 0px;
  overflow: scroll;
  padding-bottom: 20%;
}
.mainlogo {
  width: 200px;
  margin-top: -5px;
}
.restxt {
  display: none;
}
.catstrip {
  width: 100%;
  background: #ffffff;
  margin-bottom: 40px;
  color: rgb(92, 92, 92);
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 30%);
  padding: 10px 20px;
}
.catlink {
  width: fit-content;
  padding: 2px 10px;
  font-size: 20px;
  border-right: 1px solid rgb(68, 68, 68);
  display: inline;
}
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
  z-index: 100;
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

.example input[type="text"] {
  padding: 10px;
  font-size: 18px;
  border: none;
  float: left;
  display: flex;
  width: 370px;
  background: #f7fcff;
  margin-top: 0px;
  margin-left: 40px;
  border-radius: 6px 0px 0px 6px;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.137);
}
form.example input[type="text"]:focus {
  outline: none;
  border: 4px 0px 4px 4px solid rgb(255, 17, 0);
}

/* Style the submit button */
.example button {
  float: left;
  width: 50px;
  padding: 10px;
  background: #0077ff;
  color: rgb(255, 255, 255);
  font-size: 18px;
  border: none;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
  margin-top: 0px;
  border-radius: 0 6px 6px 0;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.137);
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
  margin-bottom: 40px;
  width: 100%;
  padding: 14px 20px;
  height: 70px;
  font-size: 18px;
  z-index: 500;
  background: linear-gradient(to right, rgb(93, 217, 255), rgb(82, 255, 212));
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
  color: rgb(0, 5, 53);
  float: right;
  padding-top: 0px;
}
.closebtn {
  display: none;
}
.login a {
  background: #008cff;
  color: rgb(233, 255, 234);
}
.indate {
  display: inline-flex;
}

@media screen and (max-width: 1050px) {
  .searchtab {
    position: fixed;
    top: 120px;
    left: 0;
    width: 100%;
    height: 110%;
    background: #ffffff;
    z-index: 9;
    padding: 20px 0px;
  }
  .mainlogo {
    width: 150px;
    margin-top: -5px;
  }
  .restxt {
    display: block;
  }
  .reduce {
    position: fixed;
    display: none;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 499;
    backdrop-filter: blur(10px);
  }
  .indate {
    padding-left: 20px;
    display: block;
  }
  .topnav {
    height: 120px;
    margin: 0px 0 10px 0px;
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
    margin-top: -10px;
  }
  .topnavlink.left {
    font-size: 25px;
    color: white !important;
  }
  .right a {
    padding: 4px 6px !important;
    width: 100%;
  }
  .hiwel {
    margin: 0px;
    margin-bottom: 20px;
    padding: 12px 10px !important;
    font-size: 25px !important;
    border-bottom: 1px solid#008cff;
    background: #008cff;
    color: white !important;
  }
  .menubtn {
    display: block;
  }
  .closebtn {
    display: block;
    position: absolute;
    right: 20px;
    top: 11%;
    color: rgb(255, 255, 255);
    font-size: 25px;
  }
  .example input[type="text"] {
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
  .example button {
    float: left;
    width: 15%;
    padding: 10px;
    background: #008cff;
    color: white;
    font-size: 14px;
    border: none;
    border-left: none; /* Prevent double borders */
    cursor: pointer;
    margin-top: 10px;
    border-radius: 0 5px 5px 0;
  }
  .resp {
    padding: 4px 0px;
    font-size: 20px;
  }
  .dropdown-content {
    display: block;
    position: relative;
    background-color: #ffffff00;
    width: 100%;
    box-shadow: none;
    z-index: 3;
    border-bottom: 1px solid #858585;
  }

  .dropdown-content a {
    color: rgb(92, 92, 92);
    padding: 0px 16px;
    text-decoration: none;
    display: block;
    margin: 0px !important;
  }
  .smsticky {
    position: fixed !important;
    top: 0;
  }
}
</style>
