import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import { MdIcon } from 'vue-material/dist/components'
import Multiselect from "vue-multiselect";
import moment from 'moment'

Vue.prototype.moment = moment
Vue.component("multiselect", Multiselect);
Vue.use(VueSession)
Vue.use(MdIcon)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
