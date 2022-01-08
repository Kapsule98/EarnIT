<template>
  <div>
    <div class="p_heading"><h3>Select Payment Options</h3></div>

    <form action="">
      <div class="pay_option">
        <input type="radio" name="pay_op" id="pay_op1" @click="selectPay(1)" />
        Debit/ Credit/ ATM Card
        <div class="pay_sub" v-if="pay_method === 1"></div>
      </div>
      <div class="pay_option">
        <input type="radio" name="pay_op" id="pay_op2" @click="selectPay(2)" />
        UPI
        <div class="pay_sub" v-if="pay_method === 2">
          <input type="text" placeholder="Enter Your UPI ID" />
          <button>Continue</button>
        </div>
      </div>
      <div class="pay_option">
        <input type="radio" name="pay_op" id="pay_op3" @click="selectPay(3)" />
        Net Banking
        <div class="pay_sub" id="pay_sub3" v-if="pay_method === 3">
          <h5>Select Bank</h5>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pay_method: 0,
    };
  },

  methods: {
    selectPay(no) {
      this.pay_method = no;
    },
  },
};
</script>

<style scoped>
.p_heading {
  background: rgb(255, 255, 255);
  width: 100%;
  padding: 10px 20px;
  color: rgb(66, 66, 66);
  border-radius: 6px 6px 0px 0px;
}
.pay_option {
  font-size: 16px;
  padding: 10px 20px;
}
.pay_sub {
  padding: 10px 20px;
}
.pay_sub input[type="text"] {
  height: 40px;
  width: 100%;
  border-radius: 2px;
  border: 1px solid rgb(133, 133, 133);
}
.pay_sub button {
  background: rgb(255, 115, 0);
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  border: none;
  width: 60%;
  margin: 10px 20%;
  border-radius: 20px;
  text-transform: uppercase;
  color: white;
}
.pay_card {
  border: 1px solid rgba(0, 0, 0, 0.582);
  border-radius: 4px;
}
</style>