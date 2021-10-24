<template>
    <div>
        <h2>Register your shop details</h2>

        <label>Shop Name</label>
        <input type="text" v-model="shopName"/>

        <label>Contact Number</label>
        <input type="text" v-model="contactNo"/>

        <label>Location</label>
        <input type="text" v-model="location"/>

        <!-- Change to multiselect -->
        <b-form-group label="Categories" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="categories"
            :options="optionCategories"
            :aria-describedby="ariaDescribedby"
            name="flavour-1"
            stacked
        ></b-form-checkbox-group>
        </b-form-group>
        <button @click="submitDetails()">Submit Details</button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // shop details
            shopName:'',
            contactNo:'',
            location:'',
            optionCategories:['Food','watches','textile','...'],
            categories:[],
            image:'',
        }
    },
    methods: {
        addCoupons(){
            // discount%
            // validity
            
        },
        submitDetails(){
            //store data in db
            console.log(this.categories)
        }
    }
}
</script>
<style scoped>

</style>