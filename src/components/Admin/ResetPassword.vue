<template>
    <div class="login-box">
        <div class="login-header-box">
        <div class="login-header" style="border-bottom: none">Reset password</div>
        </div>
        <div class="login-content-box">
        <input
            type="text"
            v-model="username"
            placeholder="Username"
            class="login-input"
            style="border-radius: 10px 10px 0 0"
        />
        <input
            type="text"
            v-model="otp"
            placeholder="OTP"
            class="login-input"
            style="border-top: none; border-radius: 0 0 10px 10px"
        />
        <input
            type="password"
            v-model="password"
            placeholder="New Password"
            class="login-input"
            style="border-top: none; border-radius: 0 0 10px 10px"
        />

        <button @click="resetPassword()" class="login-button">Reset Password</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
export default {
    data() {
        return {
            username:'',
            otp:'',
            password:'',
        }
    },
    methods:{
        resetPassword() {
            const url = BASE_URL + '/admin/cred';
            const payload = {
                "username":this.username,
                "otp":parseInt(this.otp),
                "password":this.password
            }
            axios.put(url,payload).then(res => {
                if(res.status === 200) {
                    alert(res.data.msg)
                    this.$router.push('/')
                }
            }).catch(err => {
                console.log(err)
                alert(err)
            })
        }
    }
}
</script>

<style>
.login-box {
  margin: 80px auto;
  width: 35%;
}
.login-header-box {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 10px 10px 0px 0px;
  padding: 20px;
  background: rgb(93, 217, 255);
}
.login-header {
  color: #242424;
  padding: 5px 20px;
  border-bottom: 2px solid #242424;
  width: fit-content;
  margin: 0px auto;
  font-size: 17px;
  letter-spacing: 2px;
}
.login-content-box {
  height: fit-content;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  border-radius: 0px 0px 10px 10px;
  padding: 30px;
}
.login-input {
  height: 60px;
  width: 100%;
  border: 1px solid rgb(216, 216, 216);
  font-size: 18px;
  padding-left: 10px;
}
.login-input:focus {
  border: 4px solid rgba(0, 183, 255, 0.322);
  outline: none;
}
.login-input::placeholder {
  font-size: 16px;
  color: #6d6d6d;
}
.login-button {
  width: 100%;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 195, 255);
  color: rgb(0, 195, 255);
  font-size: 20px;
  background: none;
  margin: 20px 0px;
  transition: 0.2s ease-in-out;
}
.login-button:hover {
  background: rgb(0, 195, 255);
  color: white;
}
@media screen and (max-width: 800px) {
  .login-box {
    margin: 40px auto;
    width: 90%;
  }
}
</style>