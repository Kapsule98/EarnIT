<template>
    <div>
        <div v-for="req,idx in reqList" :key="idx">
            {{req}} 
            <button @click="decide(req,1)">Approve</button>
            <button @click="decide(req,0)"> Deny </button>
        </div>
        <div>
            <button @click="gotoAdminManagement"> Admin management </button>
        </div>
    </div>
</template>
<script>
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
export default {
    data() {
        return {
            reqList:[],
        }
    },
    mounted(){
        this.getList();
    },
    methods:{
        getList(){
            const url = BASE_URL + "/admin/shop";
            const accessToken = localStorage.adminJWT;
            const options = {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            };
            axios.get(url,options).then(res => {
                if(res.status === 200) {
                    this.reqList = res.data;
                }
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        decide(req,action){
            const url = BASE_URL + "/admin/shop";
            const payload = {
                email:req['email'],
                opcode:action,
            }
            const accessToken = localStorage.adminJWT;
            const options = {
                headers:{
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            axios.post(url,payload,options).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        gotoAdminManagement(){
            this.$router.push('/admin/permission')
        }
    }
}
</script>

<style scoped>

</style>