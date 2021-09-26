<template>
    <div>
        <label>Username</label>
        <input type="text" v-model="username"/>
        <label>Password</label>
        <input type="password" v-model="password"/>
        <button @click="login">Login as admin</button>
        <button @click="gotoRegister"> Register </button>

    </div>
</template>
<script>
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
export default {
    data() {
        return {
            username:"",
            password:"",
        }
    },
    methods:{
        init(){
            this.username = "";
            this.password = "";
        },
        login(){
            const url = BASE_URL + "/admin/login";
            const payload = {
                username:this.username,
                password:this.password,
            }
            axios.post(url,payload).then(res => {
                console.log(res)
                if(res.status === 200){
                    if(res.data.status === 200) {
                        alert(res.data.msg)
                        localStorage.adminJWT = res.data.jwt;
                        this.$router.push('/admin/permission');
                    } 
                } else {
                    this.init()
                    console.log(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        gotoRegister(){
            this.$router.push('/admin/register')
        }
    }
}
</script>

<style scoped>

</style>