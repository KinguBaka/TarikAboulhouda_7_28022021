<template>
  <div id="app">
    <Navbar/>
    <div>

      <router-view />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Navbar from './components/Navbar.vue';
  import { AUTH_LOGOUT } from "./components/Auth/auth";

  export default {
    name: 'App',
    components: {
      Navbar,
    },
    created: function() {
      axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function () {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
            this.$store.dispatch(AUTH_LOGOUT)
          // you can also redirect to /login if needed !
          }
          throw err;
        });
      });
    }
  }
</script>

<style>

</style>
