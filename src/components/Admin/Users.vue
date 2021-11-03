<template>
  <div>
      <button @click="setModeUser()">Users</button>
      <button @click="setModeSeller()">Sellers</button>
      <div v-if="mode">
          {{userlist}}
      </div>
      <div v-else>
          {{sellerlist}}
      </div>
      <button @click="gotoAdminHome()">Admin Home</button>
  </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../../utils/constants';
export default {
    data() {
        return{
            userlist:[],
            sellerlist:[],
            mode:true,
        }
    },
    mounted() {
        this.fetchSellerList();
        this.fetchUserList();
    },
    methods:{
        setModeUser() {
            this.mode = true;
        },
        setModeSeller(){
            this.mode = false;
        },
        fetchSellerList() {
            const url = BASE_URL + '/get_shops/all';
            axios.get(url).then(res => {
                if(res.status === 200 && res.data.status === 200) {
                    this.sellerlist = res.data.sellers
                }
            }).catch(err => {
                console.log(err)
            })
        },
        fetchUserList() {
            const url = BASE_URL + '/admin/customer';
            const jwtToken = localStorage.adminJWT;
            const options = {
                headers: {
                Authorization: `Bearer ${jwtToken}`,
                },
            };
            axios.get(url,options).then(res => {
                if(res.status === 200) {
                    this.userlist = res.data
                }
            }).catch(err => {
                console.log(err)
            })
        },
        gotoAdminHome(){
            this.$router.push('/admin/home')
        }

    }
}
</script>

<style>

</style>