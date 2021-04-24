<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand"  to="/">
        <img src="../assets/icon-left-font-monochrome-white.svg" id="icone" alt="">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ml-auto" id="navbarNavAltMarkup">
        <div v-if="user" class="navbar-nav">
          <router-link class="nav-link active" aria-current="page" to="/"><i class="fas fa-home"></i>   Acceuil</router-link>
          <router-link class="nav-link active" to="/myprofil"><i class="fas fa-user"></i>  Mon profil</router-link>
          <a class="nav-link" @click.prevent="logout" href=""><i class="fas fa-sign-out-alt"></i>   Deconnexion</a>
        </div>
        <div v-if="!user" class="navbar-nav">
          <router-link class="nav-link active" aria-current="page" to="/login"><i class="fas fa-sign-in-alt"></i>  Se connecter</router-link>
          <router-link class="nav-link" to="/signup"><i class="fas fa-user-plus"></i>  S'inscrire</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Navbar',
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$store.dispatch('user', null);
        this.$router.push('/').catch(err => {
          // Ignore the vuex err regarding  navigating to the page they are already on.
          if (
            err.name !== 'NavigationDuplicated' &&
            !err.message.includes('Avoided redundant navigation to current location')
          ) {
            // But print any other errors to the console
            console.log(err);
          }
        });
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #navbarNavAltMarkup {
    justify-content: flex-end;
  }

  .nav-link {
    margin: 0px 20px 0px 20px;
  }

  #icone {
    width: 200px;
  }
</style>
