<template>
  <div>
    <topnav
      link3="Account"
      link4='<i class="fa fa-shopping-cart"></i> Cart '
      link5='<i class="fa fa-user"></i> Login'
      url1="/"
      url2="/"
      url3="/dashboard"
      url4="/cart"
      url5="/login"
      url6="/"
      link1=""
      link2=""
      :searchbar="true"
      :display_categories="true"
    ></topnav>
    <b-container>
      <b-row>
        <b-col sm="6" cols="12">
          <img src="../../assets/0001.jpg" alt=".." class="product" />
        </b-col>
        <b-col sm="6" cols="12">
          <h1 class="name">JBL Headphones WE90X</h1>
          <h6>
            <del><i class="fa fa-rupee"></i> 650</del>
            <div class="cost"><i class="fa fa-rupee"></i> 500</div>
            <div class="offer">You Save: &#8377; 150.00(30%)</div>
          </h6>
          <div class="cartbtn">Add to cart</div>
          <div class="info">
            <h5>Product Info</h5>
            <div class="i_con">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates aliquam numquam nemo, aut assumenda voluptas autem
              architecto placeat, soluta modi velit et nisi in nobis. Quod
              impedit voluptatem amet soluta.
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import topnav from "../Seller/topnav.vue";
import Sitefooter from "./sitefooter.vue";
export default {
  components: { topnav, Sitefooter },
};
</script>
<style scoped>
.product {
  width: 80%;
  margin: 22px auto;
  border: 1px solid black;
}
.name {
  padding: 10px;
  margin-top: 10px;
}
.cost {
  font-size: 1.5em;
  display: inline;
  margin-left: 10px;
  color: rgb(44, 44, 44);
  font-weight: 500;
  color: #00325a;
}
.cartbtn {
  width: 80%;
  max-width: 350px;
  margin: 30px 0px 10px 10px;
  background: #008cff;
  color: white;
  text-align: center;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 48px;
  cursor: pointer;
}
.cartbtn:hover {
  opacity: 0.5;
}

.info {
  width: 80%;
  padding: 15px 5px;
  margin: 30px 0px;
  border-radius: 14px;
}
.i_con {
  font-size: 14px;
  color: rgb(31, 31, 31);
}
.offer {
  font-size: 17px;
  margin: 10px 0px;
  color: rgb(59, 22, 0);
}

@media screen and (max-width: 700px) {
  .product {
    width: 100%;
    margin: 0px;
  }
  .name {
    padding: 10px 0px;
    margin-top: 10px;
  }
}
</style>