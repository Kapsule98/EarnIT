<template>
    <div>
        <label>Username</label><br/>
        <input v-model="username" type="text">
        
        <label>Password</label><br/>
        <input v-model="password" type="password">

        <button @click="login()">Login</button>
    </div>    
</template>
<script>
import db from '../../firebase'
import eventBus from '../../utils/eventBus'
// import bcrypt from 'bcryptjs'
export default {
    data(){
        return{
            username:'',
            password:'',
        }
    },
    methods: {
        login(){
            if(this.username === '' || this.password === ''){
                alert('Validation failed')
                this.init()
            }
            else {
                const userref = db.collection('users').doc(this.username)
                userref.get().then(snapshot => {
                    if(snapshot.exists){
                        const snapdata = snapshot.data()
                        console.log(snapdata)
                        // bcrypt.compare(this.password, snapdata.password, function(err, result) {
                        //     // result == true
                        //     if(result === true){
                        //         this.$session.start()
                        //         this.$session.set('loggedin',true);
                        //         this.$session.set('customer',snapdata.customer)
                        //         this.$session.set('seller',snapdata.seller)
                        //         this.$router.push('/')
                        //     }
                        // });
                        console.log(this.password)
                        if(this.password === snapdata.password) {
                            console.log("in here")
                            this.$session.start()
                            this.$session.set('loggedin',true);
                            this.$session.set('customer',snapdata.customer)
                            this.$session.set('seller',snapdata.seller)
                            eventBus.$emit('login', true)
                            eventBus.$emit('customer',snapdata.customer)
                            eventBus.$emit('seller',snapdata.seller)
                            this.$router.push('/')
                        }
                    } else {
                        alert('invalid credentials')
                        this.init()
                    }
                })
            }
        }
    }
}
</script>
<style scoped>

</style>