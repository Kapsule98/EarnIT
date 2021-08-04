import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)


function guardMyroute(to, from, next)

{
 var isAuthenticated= false;
//this is just an example. You will have to find a better or 
// centralised way to handle you localstorage data handling 
if(localStorage.getItem('log')===true)
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next(); // allow to enter route
 } 
 else
 {
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
    name:'Login',
    component: () => import ('../components/Auth/Login.vue')
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
    beforeEnter : guardMyroute,
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
    beforeEnter : guardMyroute,
    path: '/customerbill',
    name: 'customerbill',
    component: () => import('../components/Seller/customerbill.vue')
  },
  {
    beforeEnter : guardMyroute,
    path: '/account',
    name: 'account',
    component: () => import('../components/Seller/account.vue')
  },
  {
    beforeEnter : guardMyroute,
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/Customer/account.vue')
  },
  {
    beforeEnter : guardMyroute,
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
    beforeEnter : guardMyroute,
    path: '/profile',
    name: 'customerprofile',
    component: () => import('../components/Customer/profile.vue')
    
  },
  {
    beforeEnter : guardMyroute,
    path: '/category',
    name: 'category',
    component: () => import('../components/Customer/category.vue')
  },
 

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router 
