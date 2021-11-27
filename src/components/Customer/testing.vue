<template>
  <div>
    <div class="nav_out">
      <i class="fa fa-bars menubtn" v-on:click="openmenu"></i>
      <div class="nav_logo">
        <router-link to="/"
          ><img src="../../assets/flogo.png" alt="" class="company_logo"
        /></router-link>
      </div>
      <div class="nav_search">
        <div class="category_dropdown">
          All Categories <i class="fa fa-angle-down"></i>
          <div class="cat_drop">
            <div class="cd_ele">fashion</div>
            <div class="cd_ele">electronics</div>
            <div class="cd_ele">furinture</div>
            <div class="cd_ele">food</div>
            <div class="cd_ele">health</div>
            <div class="cd_ele">grocery</div>
          </div>
        </div>

        <div class="search_inpt">
          <input type="text" placeholder="search..." />
        </div>
        <div class="search_btn">
          <i class="fa fa-search"></i>
        </div>
      </div>
      <div class="nav_info">
        <div class="info_ele"><b-icon-person></b-icon-person></div>
        <div class="info_ele">
          <b-icon-handbag></b-icon-handbag>
          <div class="cart_noti"></div>
        </div>
      </div>
    </div>
    <div class="backwhite">
      <div class="nav_out_s">
        <div class="nav_out_s_cat">
          <b-icon-basket3></b-icon-basket3> All Categories
        </div>
        <div class="nav_out_s_ele">Home</div>
        <div class="nav_out_s_ele">About</div>
        <div class="nav_out_s_ele">Blog</div>
        <div class="nav_out_s_ele">Contact</div>
        <div class="nav_out_s_name">Hi Aditya Mega Mart!</div>
      </div>
      <div class="s_poster">
        <div class="s_cat">
          <div class="s_cat_ele">
            <b-icon-watch class="s_ri"></b-icon-watch> fashion
          </div>
          <div class="s_cat_ele">
            <i class="fa fa-desktop s_ri" aria-hidden="true"></i> electronics
          </div>
          <div class="s_cat_ele">
            <i class="fas fa-couch s_ri"></i> furinture
          </div>
          <div class="s_cat_ele"><i class="fa fa-hamburger s_ri"></i> food</div>
          <div class="s_cat_ele">
            <i class="fa fa-heartbeat s_ri"></i> health
          </div>
          <div class="s_cat_ele">
            <b-icon-handbag class="s_ri"></b-icon-handbag> grocery
          </div>
        </div>

        <div class="n_posters"><homeposters></homeposters></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BIconPerson,
  BIconHandbag,
  BIconBasket3,
  BIconWatch,
} from "bootstrap-vue";
import Homeposters from "./homeposters.vue";

export default {
  components: {
    BIconPerson,
    BIconHandbag,
    BIconBasket3,
    BIconWatch,
    Homeposters,
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
  mounted() {
    document.querySelectorAll(".filter")[0].style.backgroundColor =
      " linear-gradient(#ff007700, #ff007700, #cc00ff)";
  },
  methods: {},
};
</script>

<style scoped>
.cat_drop {
  position: relative;
  display: none;
  width: 200px;
  background: white;
  box-shadow: 4px 4px 2px 2px rgba(0, 0, 0, 0.158);
  z-index: 100;
  transition: 0.1 s ease-out;
}
.cd_ele {
  font-size: 15px !important;
  padding: 0px 10px !important;
  text-transform: capitalize;
  color: #000f52 !important;
  text-align: left !important;
}
.cd_ele:hover {
  background: #008cff;
  color: white !important;
}
.category_dropdown:hover .cat_drop {
  display: block;
}
.menubtn {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 25px;
  color: rgb(0, 5, 53);
  float: right;
  padding-top: 0px;
}
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap");

input[type="text"] {
  width: 100%;
}
.nav_out {
  position: relative;
  width: 100%;
  height: 80px;
  padding: 15px 20px;
  /* border-bottom: 1px solid #4242423f; */
  background: linear-gradient(to right, rgb(93, 217, 255), rgb(82, 255, 212));
}
.nav_logo {
  width: 25%;
  float: left;
}
.company_logo {
  width: 70%;
}
.nav_search {
  float: left;
  position: relative;
  width: 50%;
}
.category_dropdown {
  width: 27%;
  border: 1px solid #4242423f;
  border-right: none;
  height: 50px;
  border-radius: 25px 0px 0px 25px;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  color: rgba(66, 66, 66, 0.774);
  font-weight: 500;
  float: left;
  background: white;
}

input[type="text"] {
  width: 73%;
  height: 50px;
  border: 1px solid #4242423f;
  border-radius: 0px 25px 25px 0px;
  font-size: 18px;
  padding: 10px 5px;
}
input[type="text"]:focus {
  outline: 1px solid #008cff;
}
.search_btn {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 5px;
  top: 5px;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  background: #008cff;
  color: white;
  font-weight: 900px;
}
.nav_info {
  float: left;
  width: 25%;
}
.info_ele {
  position: relative;
  float: right;
  width: 60px;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  color: #000f52;
}
.cart_noti {
  position: absolute;
  top: 10px;
  left: 35px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: #008cff;
  color: white;
  font-size: 20px;
}
.nav_out_s {
  position: relative;
  width: 100%;
  height: 60px;
  padding: 0px 10px;
  border-bottom: 1px solid #4242423f;
  background: white;
}
.nav_out_s_cat {
  width: 20%;
  background: #008cff;
  color: white;
  line-height: 50px;
  vertical-align: middle;
  font-size: 17px;
  font-weight: 500;
  float: left;
  padding: 5px 15px;
  text-transform: uppercase;
  margin: 0px 20px 0px 0px;
}
.nav_out_s_ele {
  width: 100px;
  line-height: 60px;
  vertical-align: middle;
  float: left;
  padding: 0px 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(71, 71, 71);
  font-family: "Roboto", sans-serif;
}
.nav_out_s_ele:hover {
  color: #008cff;
}

.nav_out_s_name {
  width: 25%;
  float: right;
  text-transform: uppercase;
  line-height: 60px;
  vertical-align: middle;
  padding: 0px 10px;
  font-weight: 500;
  color: #008cff;
  font-size: 16px;
  text-align: right;
}

.s_cat {
  background: white;

  width: 20%;
  margin: 0px 0px 0px 10px;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.13);
  padding: 20px 0px 40px 0px;
  float: left;
}

.s_cat_ele {
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
  font-weight: 400;
  text-transform: capitalize;
  color: rgb(44, 44, 44);
  font-size: 16px;
  padding: 5px 20px;
  font-family: "Roboto", sans-serif;
}

.s_cat_ele:hover {
  color: #008cff;
}

.s_ri {
  margin: 0px 15px 0px 0px;
  font-size: 20px;
  color: #414141;
}
.n_posters {
  width: 77%;
  float: left;
  margin: 20px 10px;
  overflow: hidden;
  border-radius: 16px !important;
  height: fit-content;
}
.homeposters {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .menubtn {
    display: block;
  }

  .category_dropdown {
    width: 28%;
    font-size: 13px;
    padding: 0px 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav_out {
    position: relative;
    width: 100%;
    height: 130px;
    padding: 15px 10px;
    border-bottom: 1px solid #4242423f;
  }
  .nav_logo {
    width: 100%;
    float: left;
  }
  .company_logo {
    width: 50%;
  }
  .nav_search {
    width: 100%;
    padding: 10px 0px;
  }

  input[type="text"] {
    width: 72%;
  }
  .search_btn {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 5px;
    top: 15px;
    border-radius: 20px;
    line-height: 40px;
    text-align: center;
    background: #008cff;
    color: white;
    font-weight: 900px;
  }
  .nav_info {
    float: left;
    width: 25%;
    display: none;
  }
  .info_ele {
    position: relative;
    float: right;
    width: 60px;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    color: rgb(129, 129, 129);
  }

  .nav_out_s {
    display: none;
  }
  .nav_out_s_cat {
    display: none;
  }
  .nav_out_s_ele {
    display: none;
  }

  .nav_out_s_name {
    display: none;
  }

  .s_cat {
    display: none;
  }

  .n_posters {
    width: 100%;
    overflow: hidden;
    margin: 0;
  }
}
</style>