import Vue from 'vue'
import App from './App.vue'
import './Axios/axios'
import router from './components/Router/router'
import store from './vuex'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')