<template>
  <div>
    <topnav link1='<i class="fa fa-home"></i> Home' link2='<i class="fa fa-rupee"></i> Customer Bill' link3='<i class="fa fa-user"></i> Account' link4='<i class="fa fa-lock"></i> logout'></topnav>
    <div class="w3-container">
      <div class="w3-row">
        <div class="w3-third form">
          <p class="heading">Rakesh Digital</p>
          <h4>Fill coustomer details</h4>

          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Customer ID  "
              label-for="input-1"
              description=""
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter Customer Id"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Coupon Code"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.name"
                placeholder="enter coupon code"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Total Amount:"
              label-for="input-3"
            >
              <b-form-input
                id="input-3"
                placeholder="enter total amount"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Discounted Amount:"
              label-for="input-4"
            >
              <b-form-input
                id="input-4"
                placeholder="enter discounted amount"
                required
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" style="float: right;background:teal;"
              >Save</b-button
            >
          </b-form>
        </div>
        <div class=" w3-twothird" style="padding:20px">
          <h2 style="color:#4f4f4f">
            <div class="percent">
            Live Offers
            </div>
          </h2>
          <div class="w3-row">
            <div class="w3-third">
              <couponcard name="ELECTRONICS" discount="50%"></couponcard>
              </div>
              <div class="w3-third">
              <couponcard name="Vegetables" discount="30%"></couponcard>
              </div><div class="w3-third">
              <couponcard name="Beauty products" discount="20%"></couponcard>
              </div>
              <div class="w3-third">
              <couponcard name="NCERT Books" discount="40%"></couponcard>
              </div>
              <div class="w3-third">
              <couponcard name="Grocery" discount="10%"></couponcard>
              </div>
              <div class="w3-third">
              <div class="addoffer"><button onclick="document.getElementById('id01').style.display='block'" class=" w3-large"><div class="plus"> <i class="fa fa-plus"></i></div> </button></div>
              </div>
          </div>
        </div>
      </div>
    </div>


  <div id="id01" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

      <div class="w3-center"><br>
        <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span>
        <h2>Add Coupon</h2>
      </div>

      <form class="w3-container" action="/action_page.php">
        <div class="w3-section">
          <label><b>Item</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter Item name or category" name="itemname" required>

          <label><b>Discount</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Enter percentage off" name="discount" required>

          <label><b>Validity</b></label>
          <input class="w3-input w3-border w3-margin-bottom" type="date" placeholder="Enter validity of coupon" name="itemname" required>
         
          <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Add Coupon</button>
        </div>
      </form>

      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-button w3-red">Cancel</button>
      </div>

    </div>
  </div>

  </div>
</template>

<script>
import topnav from "./topnav.vue";
import couponcard from "./couponcard.vue";

export default {
  components: { couponcard,topnav },
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  overflow-x: hidden;
}
.heading {
  font-size: 30px;
  font-weight: 700;
  color: teal;
}
h4 {
  color: rgb(139, 139, 139);
}

.fire {
  font-size: 30px;
  animation: fire 1s infinite linear;
  width: fit-content;
  display: inline-table;
}

@keyframes fire {
  50% {
    transform: scale(1.2);
  }
}
.form{
  position: sticky;
  padding: 0px 30px;
  border-right:1px solid rgb(233, 233, 233) ;
}
.percent{
  letter-spacing: 2px;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid rgb(233, 233, 233);
  padding-bottom: 20px;
}
.addoffer{
  width: 80%;
 border-radius: 7px;
  padding: auto;
  padding-top: 70px;
  text-align: center;
  color: rgb(226, 226, 226);
  font-family: 'Tahoma', sans-serif;
  position: relative;
  margin: 40px auto;
  height: 250px;
  transition: 0.5s ease-in-out;
  background: rgb(241, 241, 241);
}
.plus{
  margin: auto;
  font-size: 50px;
  padding: 12px 30px;
  border-radius: 50px;
  width: fit-content;
  background: rgb(199, 199, 199);
  color: white;
}
.plus:hover{
  animation: spin 1s 1;
}

.addoffer button{
  border:none;
  background: none;
}



@keyframes spin{
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
}
</style>
