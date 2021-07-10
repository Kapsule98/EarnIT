<template>
  <div id="app">
    <div id="nav" class="topnav">
      <div class="topnavlink left" style=" font-weight: 900;"><router-link to="/"><i class="fa fa-map-marker" style="color:teal;"></i> Lemmebuy.in</router-link>
      </div> 
      <div class="left">
        <form class="example" action="action_page.php">
  <input type="text" placeholder="Search.." name="search">
  <button type="submit"><i class="fa fa-search"></i></button>
</form>
      </div>

      <div class="right">
     <i class="fa fa-times closebtn" v-on:click="closemenu" ></i>
      <div class="topnavlink active"><router-link to="/"><span v-html="link1"></span></router-link></div> 
      <div class="topnavlink"><router-link to="/about"><span v-html="link2"></span></router-link> </div> 
      <div class="topnavlink"><router-link to="/about"><span v-html="link3"></span></router-link> </div> 
       <div class="topnavlink"><router-link to="/about"><span v-html="link4"></span></router-link> </div> 
       <div class="topnavlink"><router-link to="/about"><span v-html="link5"></span></router-link> </div> 
       <div class="topnavlink"><router-link to="/about"><span v-html="link6"></span></router-link> </div> 

      </div>
     <i class="fa fa-bars menubtn"  v-on:click="openmenu" ></i>
    </div>
    <router-view/>
  </div>
</template>
<script>

export default {
  
    props :['link1',
    'link2','link3','link4','link5','link6',],

methods: {
    openmenu: function () {
      document.getElementsByClassName("right")[0].style.left="0%";
      },
      closemenu: function () {
      document.getElementsByClassName("right")[0].style.left="-70%";
      }
}
}
</script>
<style>

form.example input[type=text] {
  padding: 10px;
  font-size: 14px;
  border: 2px 0px 2px 2px solid rgb(197, 197, 197);
  float: left;
  display: flex;
  width: 240px;
  background: #ffffff;
  margin-top: 0px;
}

/* Style the submit button */
form.example button {
  float: left;
  width: 50px;
  padding: 10px;
  background: teal;
  color: white;
  font-size: 14px;
  border: 2px solid teal;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
  margin-top: 0px;
  border-radius: 0 5px 5px 0;
}

form.example button:hover {
  background: rgba(0, 128, 128, 0.678);
  border: 2px solid rgba(0, 128, 128, 0.678);
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
  background: rgb(255, 255, 255);
  
}

.topnavlink a{
  color: rgb(85, 85, 85) !important;
  width: fit-content;
  padding: 8px 16px !important;
  margin: 0px 2px;
  text-decoration: none;
  transition: 1s ease-in-out;
}

.topnavlink a:hover{
  border: 1px solid rgb(136, 136, 136);
}

.left {
  float: left !important;
  font-size: 30px;
}
.left a:hover{
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
.active a{
    color: teal !important;
}

.menubtn{
  display: none;
  font-size: 25px;
  color: teal;
  float: right;
  padding-top: 10px;
}
.closebtn{
  display: none;
}
@media screen and (max-width:820px){
  .topnav{
    height: 120px;
  }
.right{
  position: fixed;
  width: 70%;
  height: 120%;
  display: block;
  top: -10%;
  left: -70%;
  background-color: rgb(238, 238, 238);
  z-index: 20;
  padding-top: 30%;

}
.right a{
  padding: 20px 36px !important;
}

.menubtn{
  display: block;
}
.closebtn{
  display: block;
  position: absolute;
  right: 20px;
  top: 10%;
  color: teal;
  font-size: 20px;
}

}


</style>
