<template>
    <div>
        <label>Username</label><br/>
        <input v-model="username" type="text" placeholder="enter username"> 
        
        <label>Password</label>
        <input v-model="password" type="password">
        
        <label>Display Name</label>
        <input v-model="displayname" type="text" placeholder="Enter display name">

        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter email">
        
        <b-form-group label="Seller or customer??" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="flavour-1"
        ></b-form-checkbox-group>
        </b-form-group>
        
        <button @click="signup()">Signup</button>
    </div>
</template>
<script>
import db from '../../firebase'
// import bcrypt from 'bcryptjs'
export default {
    data(){
        return {
            username:'',
            password:'',
            displayname:'',
            email:'',
            selected:[],
            options: [{
                'text':'Seller','value':'seller'
            }, {
                'text':'Customer','value':'customer'
            }]
        }
    },
    methods:{
        signup(){
            if(this.username === '' || this.password === '' || this.displayname === '' || !this.selected || this.selected.length === 0){
                alert("validation failed")
            } else {
                const userref = db.collection('users').doc(this.username)
                userref.get().then(snapshot => {
                    if(snapshot.exists){
                        alert('Username taken')
                        this.init()
                    } else {
                        // const saltRounds = 10;
                        console.log(this.password)
                        const userprofile = {
                            uid:this.username,
                            displayName:this.displayname,
                            email:this.email,
                            seller:this.selected.includes('seller'),
                            customer:this.selected.includes('customer'),
                            c_saving:0,
                            s_earning:0,
                            password:this.password
                        }
                        db.collection('users').doc(this.username).set(userprofile)
                        this.$router.push('/loginnative')
                    }
                })
            }
        }
    }
}
</script>
<style scoped>

</style>