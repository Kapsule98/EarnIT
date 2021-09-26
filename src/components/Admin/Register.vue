<template>
    <div>
        <label>username</label>
        <input type="text" v-model="username"/>
        <label>Password</label>
        <input type="password" v-model="password"/>
        <label>Display Name</label>
        <input type="text" v-model="display_name"/>
        <label>Email</label>
        <input type="email" v-model="email"/>
        <button @click="register()">Register</button>
        <button @click="gotoLogin"> Login </button>
    </div>
</template>
<script>
import axios from 'axios'
import { BASE_URL } from '../../utils/constants';
export default {
    data() {
        return {
            username:"",
            password:"",
            display_name:"",
            email:"",
        }   
    },
    methods:{
        init(){
            this.username = "";
            this.password = "";
            this.display_name = "";
            this.email = "";
        },
        register(){
            const url = BASE_URL + "/admin"
            const payload = {
                username:this.username,
                password:this.password,
                display_name:this.display_name,
                email:this.email,
            }
            axios.post(url,payload).then(res => {
                console.log(res);
                alert(res.data)
                this.$router.push('/admin/verifymail')
            }).catch(err => {
                console.log(err)
                this.init()
            })
        },
        gotoLogin(){
            this.$router.push('/admin/login')
        }
    }
}
</script>

<style scoped>

</style>