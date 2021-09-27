<template>
    <div>
        <div v-for="req,idx in reqList" :key="idx">
            {{req}}
            <button @click="decide(req,1)">Approve</button>
            <button @click="decide(req,0)"> Deny </button>
        </div>
        <div>
            <button @click="gotoShopManagement"> Shop management </button>
            <button @click="logout"> Logout </button>
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
            const url = BASE_URL + "/admin/permission";
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
            const url = BASE_URL + "/admin/permission";
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
        logout(){
            localStorage.clear();
            this.$router.push('/')
        },
        gotoShopManagement(){
            this.$router.push('/admin/shop')
        }
    }
}
</script>

<style scoped>

</style>