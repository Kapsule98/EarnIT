<template>
   <carousel :items="1"  :stagePadding="0" :loop="true"  :autoplay="true" :nav="false" :dots="false">

    <img src="https://www.reliancedigital.in/medias/Boot-Up-Carousel-Web-Banner-05-07-2021.jpg?context=bWFzdGVyfGltYWdlc3wxMDI0MzB8aW1hZ2UvanBlZ3xpbWFnZXMvaDM1L2hkNS85NTg2OTgxNjk5NjE0LmpwZ3wxM2U2NGViYmE5YWU4NmVmZDY5Yjc5YmEyYzVmNjBmZjhkYTRlYTU5ODBjYTEwZTc1OWM1Mjc1Zjc5MGZlYzEy"  width="100%" >
    <img src="https://www.reliancedigital.in/medias/OnePlus-Smart-TV-CLP-Banner-24-06-2021-01.jpg?context=bWFzdGVyfGltYWdlc3wxMzgxODd8aW1hZ2UvanBlZ3xpbWFnZXMvaGI5L2g1OC85NTg1NjAzMzc5MjMwLmpwZ3xlZTU3NDk0OTE5NzUyNmFlNGU3NjVhZjM1MmY3YTY1NGQyMmFkMDUzNWJmYTU5NGU4ZTMxZWIwOWMyODJkN2Rj" width="100%" >
    <img src="https://www.reliancedigital.in/medias/All-Electronics-Sunday-Carousel-Banner.jpg?context=bWFzdGVyfGltYWdlc3w4MzM5MHxpbWFnZS9qcGVnfGltYWdlcy9oZWEvaDM1Lzk1NDgzOTU0NDYzMDIuanBnfDhmZjVjMTU4ZjEyMDQ3YmM3ZjU2MjM3YTZiMDU3MzhkODlhYjE4NTg5MDI4ODhkMGE3NjViNDc2OTBmMzFmMDU" width="100%" >

</carousel>
</template>

<script>

import carousel from 'vue-owl-carousel'

export default {
    components: { carousel },
}

</script>
<style scoped>
.next{
   position: absolute;
   top: 40%;
   right: 0;
   font-size: 50px;
   background: rgba(0, 0, 0, 0.596);
   color: white;
   z-index: 2;
   padding: 10px 20px;
}
.prev{
   display: block !important;
   position: absolute;
   top: 40%;
   left: 0;
   font-size: 50px;
   background: rgba(0, 0, 0, 0.596);
   color: white;
   z-index: 1000;
   padding: 10px 20px;
}
a{
  text-decoration: none;
  
}
a:hover{
  text-decoration: none;
  
}
</style>