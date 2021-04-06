
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home.vue'
import Login from '../Login.vue'
import Signup from '../Signup.vue'
import MyProfil from '../Profil.vue'
import UpdateProfil from '../UpdateProfil.vue'

Vue.use(Router);

function guardMyroute(to, from, next) {
    var isAuthenticated= false;
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if(localStorage.getItem('token')) {
        isAuthenticated = true;
    } else {
       isAuthenticated= false; 
    }
    
    if(isAuthenticated) {
        next(); // allow to enter route
    } else {
        next('/login'); // go to '/login';
    }
}

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/signup', component: Signup},
        {path: '/myprofil', beforeEnter: guardMyroute, component: MyProfil},
        {path: '/updateprofil', beforeEnter: guardMyroute, component: UpdateProfil}
    ]
})