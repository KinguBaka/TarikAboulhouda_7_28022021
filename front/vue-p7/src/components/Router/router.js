
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home.vue'
import Login from '../Login.vue'
import Signup from '../Signup.vue'
import MyProfil from '../Profil.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/signup', component: Signup},
        {path: '/myprofil', component: MyProfil}
    ]
})