import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import './Axios/axios'
import router from './components/Router/router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common['Authorization'] = token
}