<template>
  <div>
    <h1>Hello</h1>
    <h3 v-if="user"> Bonjour {{user.username}}</h3>
    <h3 v-if="!user">Vous n'êtes pas connecté !</h3>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>

<style>
  h1 {
    font-size: 100px;
    text-align: center;
  }
</style>