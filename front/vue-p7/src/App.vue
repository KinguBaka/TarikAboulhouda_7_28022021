<template>
  <div id="app">
    <Navbar/>
    <div id="app2">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Navbar from './components/Navbar.vue';

  export default {
    name: 'App',
    components: {
      Navbar,
    },
    async created() {
      const response = await axios.get('users/me');

      this.$store.dispatch('user', response.data);
    }
  }
</script>

<style>
    #app2{
        margin :0;
        padding: 0;
        height: 100%;
    }
</style>
