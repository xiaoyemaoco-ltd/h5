import Vue from 'vue'
import App from './App.vue'
import Vant,{Lazyload} from 'vant'
import 'vant/lib/index.css'
import 'lib-flexible'
import axios from 'axios'
import router from "./router"
import qs from 'qs'
import VueClipboard from 'vue-clipboard2'

// Vue.prototype.Clipboard=Clipboard;

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
Vue.use(Lazyload,{
  lazyComponent: true,
  loading: require('./assets/image/loading.gif')
});
Vue.use(Vant)
Vue.use(VueClipboard)


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
