<template>
  <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Users" active>
          <div>
            <b-card v-for="user,idx in userlist" :key="idx">
                <div>Name: {{user.display_name}}</div>
                <div>Email: {{user.email}}</div>
                <div>Phone: {{user.phone}}</div>
                <div>Credit points earned: {{user.credit_points}}</div>
                <div>Money Saved: {{user.money_saved}}</div>
            </b-card>
          </div>
        </b-tab>
        <b-tab title="Sellers">
          <div>
            <b-card v-for="shop,idx in sellerlist" :key="idx">
                <div>Address {{shop.address}}</div>
                <div>Category {{shop.category}}</div>
                <div>Contact no {{shop.contact_no}}</div>
                <div>Name {{shop.display_name}}</div>
                <div>Email {{shop.email}}</div>
                <div>Owner Name {{shop.owner_name}}</div>
                <div>Products
                    <ul>
                        <li v-for="prd,i in shop.products" :key=i>
                            {{prd}}
                        </li>
                    </ul>
                </div>
                <div>Shop Name {{shop.shop_name}}</div>
                <div>
                    <button @click="deleteSeller(shop.email)"> Delete Seller </button>
                </div>
            </b-card>
          </div>
        </b-tab>
      </b-tabs>
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
        }
    },
    mounted() {
        this.fetchSellerList();
        this.fetchUserList();
    },
    methods:{
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
        },
        deleteSeller(email) {
            const url = BASE_URL + '/admin/shop/' + email;
            const jwtToken = localStorage.adminJWT;
            const options = {
                headers: {
                Authorization: `Bearer ${jwtToken}`,
                },
            };
            axios.delete(url,options).then(res => {
                console.log(res)
                if(res.status == 200) {
                    alert(res.data.msg)
                    this.$router.go()
                }
            }).catch(err => {
                console.log(err)
            })
            console.log(email)
        }

    }
}
</script>

<style>
button {
  width: fit-content;
  padding: 7px 10px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgb(0, 195, 255);
  color: white;
  font-size: 20px;
  background: rgb(0, 195, 255);
  margin: 20px 20px 0px 0px;
  transition: 0.2s ease-in-out;
}
button:hover {
  opacity: 0.5;
}
</style>