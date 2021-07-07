<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">| Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="seller" to="/sellerhome">Seller Home |</router-link> 
      <router-link v-if="customer" to="/customerhome">Customer Home |</router-link>
      <router-link v-if="!login" to="/login">Login |</router-link>
      <router-link v-if="login" to="/logout">Logout |</router-link>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
