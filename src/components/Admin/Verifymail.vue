<template>
    <div>
        <lable>Username</lable>
        <input type="text" v-model="username"/>
        <label>OTP</label>
        <input type="password" v-model="otp"/>
        <label>Email</label>
        <input type="email" v-model="email"/>
        <button @click="verifymail()">Verify Email</button>
    </div>
</template>

<script>
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
export default {
    data() {
        return {
            username:"",
            otp:"",
            email:"",
        }
    },
    methods:{
        init(){
            this.username = "";
            this.otp = "";
            this.email = "";
        },
        verifymail(){
            const url = BASE_URL + '/admin';
            const payload = {
                username:this.username,
                otp:parseInt(this.otp),
                email:this.email,
            }
            axios.put(url,payload).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
                this.init()
            })
        }

    }
}
</script>

<style scoped>

</style>