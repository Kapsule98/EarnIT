<template>
    <div>
        <button @click="signin()">Sign in with google</button>
        <button @click="loginnative()">Sign in with userid</button>
        <button @click="registernative()">Register with Username </button>
    </div>
</template>
<script>
import eventBus from '../../utils/eventBus'
import db from '../../firebase';
import {auth,provider} from '../../firebase';
export default {
    methods:{  
        signin(){
             auth
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                const google_id = result.user.uid
                console.log(google_id)
                const usersref = db.collection('users').doc(google_id)
                this.$session.start();
                this.$session.set('loggedin',true);
                // this.$session.set('userprofile',result);
                usersref.get().then((snapshot) => {
                    if(snapshot.exists){
                        usersref.onSnapshot((snap) => {
                            const snapdata = snap.data();
                            console.log(snapdata)
                            console.log(snapdata.customer)
                            console.log(snapdata.seller)
                            this.$session.set('customer',snapdata.customer)
                            this.$session.set('seller',snapdata.seller)
                            eventBus.$emit('login',true)
                            eventBus.$emit('seller',snapdata.seller)
                            eventBus.$emit('customer',snapdata.customer)
                            this.$router.push('/')
                        })
                        
                    } else {
                        this.$router.push('/newuser');
                    }
                })
            })
            .catch((error) => alert(error.message));
        },
        registernative(){
            this.$router.push('/registernative');
        },
        loginnative(){
            this.$router.push('/loginnative')
        }
    }    
}
</script>
<style scoped>

</style>