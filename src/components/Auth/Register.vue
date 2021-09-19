<template>
  <div>
    <topnav
      link2="Login"
      link1=""
      link3=""
      link4=""
      link5=""
      url2="/login"
      url1="/"
      url3="/"
      url4="/"
      url5="/"
      url6="/"
    >
    </topnav>

    <div class="login-box">
      <div class="login-header-box">
        <div class="login-header" style="border-bottom: none">Register as</div>

        <div class="w3-row">
          <a
            href="javascript:void(0)"
            v-on:click="openTab('customer')"
            id="defaultOpen"
          >
            <div class="reghead">Customer</div>
          </a>

          <a href="javascript:void(0)" v-on:click="openTab('shop')">
            <div class="reghead">Shop</div>
          </a>
        </div>
        <div class="actvcont">
          <div class="actvtab"></div>
        </div>
      </div>
      <div class="login-content-box">
        <div
          id="customer"
          class="regtab w3-animate-opacity"
          style="display: none"
        >
          <input
            v-model="username"
            type="text"
            class="login-input"
            placeholder="Username"
            style="border-radius: 5px 5px 0px 0px"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="login-input"
            style="border-top: none; border-radius: 0"
          />
          <input
            v-model="displayname"
            type="text"
            class="login-input"
            placeholder="Name"
            style="border-top: none; border-radius: 0px"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="login-input"
            style="border-top: none; border-radius: 0px 0px 5px 5px"
          />

          <button @click="CustomerSignup()" class="login-button">
            Register
          </button>
          <a href="/loginnative" style="float: right"
            >already have an account? login here</a
          >
        </div>

        <div id="shop" class="regtab w3-animate-opacity" style="display: none">
          <input
            v-model="username"
            type="text"
            class="login-input"
            placeholder="Username"
            style="border-radius: 5px 5px 0px 0px"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="login-input"
            style="border-top: none; border-radius: 0"
          />
          <input
            v-model="displayname"
            type="text"
            class="login-input"
            placeholder="Your Shop Name"
            style="border-top: none; border-radius: 0px"
          />
          <input
            v-model="contact_no"
            type="text"
            class="login-input"
            placeholder="Contact number"
            style="border-top: none; border-radius: 0px"
          />
          <input
            v-model="address"
            type="text"
            class="login-input"
            placeholder="address"
            style="border-top: none; border-radius: 0px"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="login-input"
            style="border-top: none"
          />
          <select
            required
            class="select"
            name="categories"
            v-model="shop_category"
            style="border-top: none"
          >
            <option class="option" value="" disabled selected hidden>
              Choose Category...
            </option>
            <option
              class="option"
              v-for="items in allcategories"
              :key="items.length"
              :value="items"
            >
              {{ items }}
            </option>
          </select>

          <input
            v-model="shop_name"
            type="text"
            placeholder="Registered Shop Name"
            class="login-input"
            style="border-top: none; border-radius: 0px 0px 5px 5px"
          />
          <br />
          <br />
          <h6>Choose shop image</h6>
          <input
            type="file"
            placeholder="Shop Image"
            class="login-input"
            @change="encodeImageFileAsURL"
          />

          <button @click="Sellersignup()" class="login-button">Register</button>
          <a href="/login" style="float: right"
            >already have an account? login here</a
          >
        </div>
      </div>
    </div>

    <sitefooter></sitefooter>
  </div>
</template>
<script>
import Sitefooter from "../Customer/sitefooter.vue";
import topnav from "../Seller/topnav.vue";
import bcrypt from "bcryptjs";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
export default {
  components: { topnav, Sitefooter },
  data() {
    return {
      active_time: [],
      opening_time: "",
      closing_time: "",
      days: [
        { day: "M", index: 0 },
        { day: "T", index: 1 },
        { day: "W", index: 2 },
        { day: "Th", index: 3 },
        { day: "F", index: 4 },
        { day: "S", index: 5 },
        { day: "Su", index: 6 },
      ],
      username: "",
      password: "",
      displayname: "",
      email: "",
      contact_no: "",
      address: "",
      shop_category: "",
      shop_name: "",
      location: "",
      allcategories: [],
      options: [
        {
          text: "Seller",
          value: "seller",
          id: "Seller",
        },
        {
          text: "Customer",
          value: "customer",
          id: "xemn",
        },
      ],
      context: null,
    };
  },
  mounted() {
    document.getElementById("defaultOpen").click();
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
    onContext(ctx) {
      this.context = ctx;
    },
    get_date(index) {
      for (var i = 0; i < this.days.length; i++) {
        if (i !== index) {
          document.getElementsByClassName("week")[i].style.background =
            "rgba(0, 174, 255, 0.336)";
          document.getElementsByClassName("week")[i].style.color = "black";
        }
      }
      document.getElementsByClassName("week")[index].style.background =
        "#315da3";
      document.getElementsByClassName("week")[index].style.color = "white";

      this.active_time[index] = [this.opening_time];
    },
    Sellersignup() {
      if (
        this.username === "" ||
        this.password === "" ||
        this.displayname === "" ||
        this.contact_no === "" ||
        this.address === "" ||
        this.email === "" ||
        this.shop_category.length === 0
      ) {
        alert("Please fill mandatory fields");
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.location = [
              position.coords.longitude,
              position.coords.latitude,
            ];
          },
          (error) => {
            console.log(error.message);
            alert(error.message);
          }
        );
        const hash_pass = this.encryptPassword(this.password);
        console.log(hash_pass);
        const seller = {
          password: this.password,
          username: this.username,
          display_name: this.displayname,
          contact_no: this.contact_no,
          address: this.address,
          category: this.shop_category,
          shop_name: this.shop_name,
          location: this.location,
          email: this.email,
        };
        const url = BASE_URL + "/seller/register";
        const payload = seller;
        axios
          .post(url, payload)
          .then((res) => {
            alert(res.data.msg);
            if (res.data.status === 200) {
              this.$router.push("/seller/verifymail");
            } else {
              this.init();
            }
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    CustomerSignup() {
      if (
        this.username === "" ||
        this.password === "" ||
        this.displayname === ""
      ) {
        alert("pls fill mandaatory fields");
        this.init();
        return;
      } else {
        const hash_pass = this.encryptPassword(this.password);
        console.log(hash_pass);
        const user = {
          username: this.username,
          password: this.password,
          display_name: this.displayname,
          email: this.email,
        };
        const url = BASE_URL + "/register";
        axios
          .post(url, user)
          .then((res) => {
            console.log(res);
            alert(res.data.msg);
            if (res.data.status === 200) {
              this.$router.push("/verifymail");
            } else {
              this.init();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    openTab(type) {
      var i, x;
      x = document.getElementsByClassName("regtab");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(type).style.display = "block";

      if (type == "customer") {
        document.getElementsByClassName("actvtab")[0].style.right = "50%";
      } else {
        document.getElementsByClassName("actvtab")[0].style.right = "0%";
      }
    },
    init() {
      this.username = "";
      this.password = "";
      this.displayname = "";
      this.email = "";
      this.contact_no = "";
      this.address = "";
      this.shop_category = [];
      this.shop_name = "";
      this.location = "";
    },
    encryptPassword(password) {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(password, salt);
    },
    encodeImageFileAsURL(element) {
      var file = element.target.files[0];

      var reader = new FileReader();
      this.newimg = reader.result.toString();
      console.log("jwt now = ", this.jwt);
      reader.onloadend = function () {
        // Upload image to api
        const profile_token = JSON.parse(localStorage.getItem("profile")).token;
        const url = BASE_URL + "/seller/image";
        console.log(this.jwt);
        const options = {
          headers: {
            Authorization: `Bearer ${profile_token}`,
          },
        };
        console.log(options);
        const payload = {
          image: reader.result,
        };
        console.log(payload);
        axios
          .post(url, payload, options)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      reader.readAsDataURL(file);
    },
  },
};
window.onload = function () {
  document.getElementById("defaultOpen").click();
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.weekco {
  width: 100%;
  justify-content: space-between;
  display: flex;
  text-align: center;
}
.week {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 20px;
  background: rgba(0, 174, 255, 0.336);
  text-align: center;
  color: rgba(0, 140, 255, 0.815);
  line-height: 40px;
  vertical-align: middle;
  border: none;
  cursor: pointer;
}
.login-box {
  margin: 80px auto;
  width: 35%;
}
.login-header-box {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 10px 10px 0px 0px;
  padding: 20px;
  background: rgb(93, 217, 255);
}
.login-header {
  color: #242424;
  padding: 5px 20px;
  border-bottom: 2px solid #242424;
  width: fit-content;
  margin: 0px auto;
  font-size: 17px;
  letter-spacing: 2px;
}
.login-content-box {
  height: fit-content;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 0px 0px 10px 10px;
  padding: 30px;
}
.login-input {
  height: 60px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
.login-input:focus {
  border: 4px solid rgba(0, 183, 255, 0.322);
  outline: none;
}
.login-input::placeholder {
  font-size: 16px;
  color: #6d6d6d;
}
.login-button {
  width: 100%;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 195, 255);
  color: rgb(0, 195, 255);
  font-size: 20px;
  background: none;
  margin: 20px 0px;
  transition: 0.2s ease-in-out;
}
.login-button:hover {
  background: rgb(0, 195, 255);
  color: white;
}
@media screen and (max-width: 800px) {
  .login-box {
    margin: 40px auto;
    width: 90%;
  }
}
.actvcont {
  position: relative;
  margin-top: 5px;
}
.actvtab {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 2px;
  background: #008cff;
  transition: 0.5s ease-in-out;
  border-radius: 1px;
}
.reghead {
  display: inline-block;
  text-align: center;
  width: 50%;
  font-size: 17px;
  color: rgb(53, 53, 53);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 15px 0px 0px 8px;
  font-weight: 500;
}
.select {
  height: 60px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
select:focus {
  border: 4px solid rgba(0, 183, 255, 0.322);
  outline: none;
}
.option {
  height: 60px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
</style>