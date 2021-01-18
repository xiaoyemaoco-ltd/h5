import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible'
import axios from 'axios'
import router from "./router";
import qs from 'qs'
axios.interceptors.request.use(function (config) {
  if(config.method!='get'){
    config.data=qs.stringify(config.data);
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
},function (error) {
  return Promise.reject(error)
})

Vue.prototype.$axios = axios

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
