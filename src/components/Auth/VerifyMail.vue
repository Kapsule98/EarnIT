<template>
    <div>
        <input
          v-model="email"
          type="email"
          class="login-input"
          placeholder="Email"
          style="border-radius: 5px 5px 0px 0px"
        />
        <input
          v-model="otp"
          type="text"
          class="login-input"
          placeholder="OTP"
          style="border-radius: 5px 5px 0px 0px"
        />
        <button @click="verifyEmail()"> Verify Email </button>
    </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from '../../utils/constants';
export default {
  data() {
    return{
      otp:0,
      email:'',
      class:'',
    }
  },
  methods:{
    init() {
      this.otp=0,
      this.email = ''
    },
    verifyEmail(){
      var url
      if(this.$route.name === "SellerVerifyMail"){
        url = BASE_URL + '/seller/register';
      } else {
        url = BASE_URL + '/register'
      }
      const payload = {
          'email':this.email,
          'otp':parseInt(this.otp),
        }
        axios.put(url,payload).then(res => {
          console.log(res)
          if(res.data.status === 200) {
            this.$router.push("/login")
          } else {
            alert(res.data.msg)
            this.init()
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
}
</script>
<style scoped>

</style>