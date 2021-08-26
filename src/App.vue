<template>
  <div id="app">
    
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
  .topstrip {
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
