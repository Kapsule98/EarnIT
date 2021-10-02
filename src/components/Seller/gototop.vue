<template>
  <button v-on:click="topFunction()" id="myBtn" title="Go to top">Top</button>
</template>

<script>
var mybutton = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button

export default {};
</script>
<style scoped>
#myBtn {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 900009;
  font-size: 18px;
  border: none;
  outline: none;
  background-color: red;
  color: white;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
}

#myBtn:hover {
  background-color: #555;
}
</style>