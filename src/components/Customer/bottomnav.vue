<template>
  <div>
    <div class="bottomnav">
      <router-link to="/">
        <div class="b-link">
          <center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-house"
              viewBox="0 0 16 16"
              style="display: block"
            >
              <path
                fill-rule="evenodd"
                d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
              />
              <path
                fill-rule="evenodd"
                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
              />
            </svg>
          </center>
          Home
        </div>
      </router-link>
      <router-link to="/dashboard">
        <div class="b-link">
          <center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
              />
            </svg>
          </center>
          Account
        </div>
      </router-link>
      <router-link to="/cart">
        <div class="b-link">
          <center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-cart3"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
            <div class="nofitems">{{ cartitems }}</div>
          </center>

          Wishlist
        </div>
      </router-link>
      <router-link to="/search?alloffers=true">
        <div class="b-link">
          <center>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </center>
          Search
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartitems: "",
    };
  },
  mounted() {
    if ("cartitems" in localStorage) {
      this.cartitems = localStorage.getItem("cartitems");
    } else {
      this.cartitems = 0;
    }
  },
};
</script>

<style scoped>
.bottomnav a {
  text-decoration: none;
  color: black;
}
.bottomnav {
  position: fixed;
  bottom: 0;
  left: 0;
  display: none;
  width: 100%;
  box-shadow: 0 0 9px rgba(44, 44, 44, 0.473);
  height: 48px;
  background: rgb(255, 255, 255);
  z-index: 10000;
  justify-content: space-between;
  padding: 10px 50px;
}

.b-link {
  position: relative;
  text-align: center;
  font-weight: 400;
  font-size: 11px;
  line-height: 1;
}
.nofitems {
  position: absolute;
  top: -7px;
  right: -7px;
  height: 16px;
  width: 16px;
  text-align: center;
  border-radius: 8px;
  background: #008cff;
  color: white;
  line-height: 16px;
  vertical-align: middle;
}
@media screen and (max-width: 600px) {
  .bottomnav {
    display: flex;
  }
}
</style>