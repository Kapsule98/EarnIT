<template>
  <div id="app">
    <div class="topstrip">
      <div class="leftstrip"><i class="fa fa-map-marker"></i> <div class="city">select location</div> <button class="location"> select city <i class="fa fa-caret-down"></i></button></div>
      <div class="welcome"> Welcome to lemmebuy.in !</div>
      <div class="rightstrip">
      <div class="topstriplink active"><router-link to="/"><i class="fa fa-home"></i> |</router-link></div> 
      <div class="topstriplink"><router-link to="/about"> <i class="fa fa-info-circle" aria-hidden="true"></i> About |</router-link> </div> 
      <div class="topstriplink"><router-link v-if="seller" to="/sellerhome">Seller Home </router-link> </div> 
      <div class="topstriplink"><router-link v-if="customer" to="/customerhome">Customer Home </router-link></div> 
      <div class="topstriplink"><router-link v-if="!login" to="/login"><i class="fa fa-lock"></i> Login </router-link></div> 
      <div class="topstriplink"><router-link v-if="login" to="/logout">Logout </router-link></div> 
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import eventBus from './utils/eventBus.js'
export default {
  data(){
    return{
      login:false,
      seller:false,
      customer:false,
    }
  },
  created(){
    eventBus.$on('login', (data) => {
      this.login = data;
    })
    eventBus.$on('seller',(data) =>{
      this.seller = data;
    })
    eventBus.$on('customer',(data) =>{
      this.customer = data;
    })
    // const loginstatus = this.$session.get('loggedin');
    // const sellerstatus = this.$session.get('seller');
    // const customerstatus = this.$session.get('customer');
    // if(loginstatus === true){
    //   this.login = true;
    // } else {
    //   this.login = false;
    // }
    // if(sellerstatus === true){
    //   this.seller = true;
    // } else {
    //   this.seller = false;
    // }
    // if(customerstatus === true){
    //   this.customer = true;
    // } else {
    //   this.customer = false;
    // }
  }
}
</script>
<style>

.topstrip {
  width: 100%;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
  padding:  5px 0px;
  height:35px;
  font-size: 13px;
  margin-bottom:0px;
  background: rgb(46, 46, 46);
}

.topstriplink a{
  color: rgb(212, 212, 212) !important;
  width: fit-content;
  padding: 1px 5px !important;
  text-decoration: none;
  transition: 0.1s ease-in-out;
}

.topstriplink a:hover{
  color: aliceblue !important;
}

.leftstrip {
  float: left !important;
  font-size: 14px;
  color: rgb(192, 192, 192);
  padding: 0px 10px;
}
.leftstrip a:hover{
background: none !important;
color: rgb(0, 0, 0) !important;
border: none !important;
}

.rightstrip {
  margin: 0px 10px;
  float: right;
  display: flex;
}
.active a{
    color: rgb(238, 238, 238) !important;
}
.location{
  border: none;
  border-radius: 6px;
}
.welcome{
  text-align: center;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 14px;
  padding-top: 5px;
}
.city{
  display: inline;
}
@media screen and (max-width:600px){
  .welcome{
    display: none;
  }
  
.topstriplink a{
  padding: 1px 5px !important;
}
.city{
  display: none;
}

}
</style>
