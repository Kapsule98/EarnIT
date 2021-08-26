import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)


function guardMyroute(to, from, next) {
  var isAuthenticated = false;

  if (localStorage.getItem('log') === "true" && localStorage.getItem('user_type') === "seller") {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated === true) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }

}

function guardMyrouteCustomer(to, from, next) {
  var isAuthenticated = false;

  if (localStorage.getItem('log') === "true" && localStorage.getItem('user_type') === "customer") {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated === true) {
    next(); // allow to enter route
  }
  else {
    next('/login'); // go to '/login';
  }

}



const routes = [
  {
    path: '/list',
    name: 'list',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    //this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Auth/Login.vue')
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: () => import('../components/Auth/forgotpassword.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Auth/Register.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../components/Auth/Logout.vue')
  },
  {
    path: '/newuser',
    name: 'NewUser',
    component: () => import('../components/Auth/Newuser.vue')
  },
  {
    path: '/seller/home',
    name: 'SellerHome',
    component: () => import('../components/Seller/home.vue')
  },
  {
    path: '/seller/registerdetails',
    name: 'RegisterSellerDetails',
    component: () => import('../components/Seller/RegisterDetails.vue')
  },
  {
    beforeEnter: guardMyroute,
    path: '/verifycoupon',
    name: 'verifycoupon',
    component: () => import('../components/Seller/verifycoupon.vue'),
  },
  {

    path: '/shop',
    name: 'shop',
    component: () => import('../components/Customer/shopcoupons.vue')
  },
  {
    path: '/',
    name: 'landingpage',
    component: () => import('../components/Customer/landing.vue')
  },
  {
    path: '/search',
    name: 'searchcategory',
    props: (route) => ({ category: route.query.category, }),
    component: () => import('../components/Customer/searchcategory.vue')
  },
  {
    path: '/search_by_shop',
    name: 'searchshop',
    props: (route) => ({ category: route.query.category, }),
    component: () => import('../components/Customer/searchshop.vue')
  },
  {
    beforeEnter: guardMyroute,
    path: '/customerbill',
    name: 'customerbill',
    component: () => import('../components/Seller/customerbill.vue')
  },
  {
    beforeEnter: guardMyroute,
    path: '/account',
    name: 'account',
    component: () => import('../components/Seller/account.vue')
  },
  {
    beforeEnter: guardMyrouteCustomer,
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/Customer/account.vue')
  },
  {
    beforeEnter: guardMyrouteCustomer,
    path: '/cart',
    name: 'cart',
    component: () => import('../components/Customer/cart.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/Customer/contact.vue')
  },
  {
    beforeEnter: guardMyrouteCustomer,
    path: '/profile',
    name: 'customerprofile',
    component: () => import('../components/Customer/profile.vue')

  },
  {
    beforeEnter: guardMyroute,
    path: '/category',
    name: 'category',
    component: () => import('../components/Customer/category.vue')
  },
  {
    beforeEnter: guardMyroute,
    path: '/editsellerdetails',
    name: 'editsellerdetails',
    component: () => import('../components/Seller/editsellerdetails.vue')
  },


]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
