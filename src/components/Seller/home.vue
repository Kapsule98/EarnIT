<template>
    
    <div>
        <!-- Add shop details -->
        <div>
            <button @click="registerSellerDetails()">Register Details</button>
        </div>
        <!--show / add coupon details-->
        <div>
            <button @click="showAddCouponModal()">Add coupon</button>
            <b-modal ref="couponModal" hide-footer title="Add coupon details">
                <div class="d-block text-center">
                    <h3>Add Coupon details </h3>
                        <b-form-group label="Discount type" v-slot="{ ariaDescribedby }">
                            <b-form-radio-group
                                v-model="discountType"
                                :options="dTypeoptions"
                                :aria-describedby="ariaDescribedby"
                                name="radio-options"
                            ></b-form-radio-group>
                        </b-form-group>
                        <div v-if="discountType === 'ditem'">
                        
                            <label for="range-1">Discount percent on item</label>
                            <b-form-input id="range-1" v-model="itemdiscountpercent" type="range" min="0" max="100"></b-form-input>
                            <div class="mt-2">Value: {{ itemdiscountpercent }} %</div>
                        
                        </div>
                        <div v-if="discountType === 'dbill'">
                            <label for="range-2">Discount percent on total bill</label>
                            <b-form-input id="range-2" v-model="billdiscountpercent" type="range" min="0" max="100"></b-form-input>
                            <div class="mt-2">Value: {{ billdiscountpercent }} %</div>
                        </div>
                        <div v-if="discountType === 'dextraitem'">
                            <label>Enter offer : </label><input type="text" v-model="customdiscount"/>
                        </div>
                        <div v-if="discountType != ''">
                            <label>Validity </label>
                            <date-picker v-model="validity" type="date" range></date-picker>
                        </div>
                </div>
                <b-button class="mt-2" variant="outline-warning" block @click="addCouponDetails();">Add Coupon</b-button>
            </b-modal>
        </div>
    </div>
</template> 
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    data(){
        return {
            discountType:'',
            dTypeoptions:[
                {text:'Discount on item', value:'ditem'},
                {text:'Discount on total bill', value:'dbill'},
                {text:'Extra Items', value:'dextraitem'}
            ],
            itemdiscountpercent:'',
            billdiscountpercent:'',
            customdiscount:'',
            validity:[],
        }
    },
    methods:{
        registerSellerDetails(){
            this.$router.push('/seller/registerdetails');
        },
        showAddCouponModal(){
            this.$refs['couponModal'].show()
        },
        addCouponDetails(){
            //TODO validate input and store in db
            
            console.log("discount type = ",this.discountType);

            console.log(this.itemdiscountpercent,
                this.billdiscountpercent,
                this.customdiscount,
                this.validity
            )
            this.$refs['couponModal'].hide();
        }
    }   
}
</script>
<style scoped>

</style>