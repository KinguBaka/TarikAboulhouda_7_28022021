<template>
  <div id="app">
    <Navbar/>
    <div>

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

</style>
