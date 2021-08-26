<template>
    <div>
        <b-form-group label="Seller or customer??" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="flavour-1"
        ></b-form-checkbox-group>
        <b-button variant="primary" @click="choseRole()">Select</b-button>
        </b-form-group>
    </div>
</template>
<script>
import db from '../../firebase'
import EventBus from '../../utils/eventBus'
export default {
    data() {
        return {
            selected:[],
            options:[{
                'text':'Seller','value':'seller'
            }, {
                'text':'Customer','value':'customer'
            }]
        }
    },
    methods:{
        choseRole(){
            if(!this.selected || this.selected.length == 0){
                alert("Choose atlease 1 role")
            }
            else{
                const user_profile = this.$session.get('userprofile');
                const new_user = {
                    uid:user_profile.user.uid,
                    displayName:user_profile.user.displayName,
                    email:user_profile.user.email,
                    seller:this.selected.includes('seller'),
                    customer:this.selected.includes('customer'),
                    c_saving:0,
                    s_earning:0
                }
                db.collection('users').doc(user_profile.user.uid).set(new_user)
                this.$session.set('customer',new_user.customer);
                this.$session.set('seller',new_user.seller)
                EventBus.$emit('login',true)
                this.$router.push('/')
            }
        }
    }
}
</script>
<style scoped>

</style>