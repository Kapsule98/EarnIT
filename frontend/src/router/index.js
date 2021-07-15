import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Auth/Login.vue')
  },
  {
    path: '/loginnative',
    name:'LoginNative',
    component: () => import ('../components/Auth/Loginnative.vue')
  },
  {
    path: '/registernative',
    name: 'RegisterNative',
    component: () => import('../components/Auth/Registernative.vue')
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
    path: '/sellerhome',
    name: 'SellerHome',
    component: () => import('../components/Seller/home.vue')
  },
  {
    path: '/seller/registerdetails',
    name: 'RegisterSellerDetails',
    component: () => import('../components/Seller/RegisterDetails.vue')
  },
  {
    path: '/verifycoupon',
    name: 'verifycoupon',
    component: () => import('../components/Seller/verifycoupon.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import('../components/Customer/shopcoupons.vue')
  },
  {
    path: '/land',
    name: 'landingpage',
    component: () => import('../components/Customer/landing.vue')
  },
  {
    path: '/customerbill',
    name: 'customerbill',
    component: () => import('../components/Seller/customerbill.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../components/Seller/account.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../components/Customer/cart.vue')
  },
 
 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
