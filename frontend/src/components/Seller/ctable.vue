<template>
  <div>
    <input
      type="text"
      id="myInput"
      v-on:keyup="keymonitor"
      placeholder="Search for names.."
      title="Type in a name"
    />
    <table class="c-table" id="myUL">
      <tr>
        <th>Sr.No</th>
        <th>Name</th>
        <th>Email</th>
        <th></th>
      </tr>

      <tr class="search">
        <td>1.</td>
        <td><name>Aditya Ray</name></td>
        <td>anuj@gmail.com</td>
        <td>
          <button
            onclick="document.getElementById('id02').style.display='block'"
            class="w3-button"
          >
            <i
              class="fa fa-address-card"
              style="color: rgb(50, 50, 50); font-size: 20px"
            ></i>
          </button>
        </td>
      </tr>
    </table>

    <div id="id02" class="w3-modal">
      <div
        class="w3-modal-content w3-animate-zoom"
        style="padding: 0; overflow: scroll"
      >
        <span
          onclick="document.getElementById('id02').style.display='none'"
          class="w3-button w3-display-topright"
          >&times;</span
        >
        <table class="c-table si" style="margin-top: 50px">
          <tr>
            <th>Date of purchases</th>
            <th>Customer ID</th>
            <th>Coupon Code</th>
            <th>Total Amount</th>
            <th>Dis. Amount</th>
          </tr>
        </table>
        <button class="w3-button" style="margin: 15px 30px; float: right">
          <i class="fa fa-rupee"></i> Total Sales: 10,500
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    keymonitor: function () {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      li = ul.getElementsByClassName("search");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("name")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    },
  },
};
</script>

<style scoped>
#myInput {
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid teal;
  margin: 12px 10%;
  width: 80%;
}
.c-table {
  color: rgb(44, 44, 44);
  background: rgb(255, 255, 255);
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
}
.c-table td,
th {
  padding: 15px 12px;
}
table {
  border-collapse: collapse;
}
.c-table tr,
td,
th {
  padding: 10px 0px 10px 10px;
  border-bottom: 0.5pt solid rgb(219, 219, 219);
}
.c-table th {
  background-color: #5dd9ff;
  color: rgb(24, 24, 24);
}
.c-table tr:hover {
  background-color: rgb(219, 219, 219);
  color: rgb(0, 0, 0);
}
@media screen and (max-width: 600px) {
  .si {
    font-size: 12px;
  }
}
</style>