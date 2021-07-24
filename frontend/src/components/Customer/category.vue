<template>
    <div>
           <topnav
        link1='<i class="fa fa-home"></i> Home'
        link2='<i class="fa fa-info-circle"></i> About'
        link3='<i class="fa fa-user"></i> Account'
        link4='<i class="fa fa-shopping-cart"></i> Cart'
        link5='<i class="fa fa-lock"></i> Logout'
      >
      </topnav>

      

      <footer></footer>
    </div>
</template>

<script>
import topnav from '../Seller/topnav.vue'
export default {
  components: { topnav },
    
}
</script>

<style scoped>

</style>