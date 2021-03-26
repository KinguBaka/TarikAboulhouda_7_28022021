<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand"  href="">
        <img src="../assets/icon-left-font-monochrome-black.svg" id="icone" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ml-auto" id="navbarNavAltMarkup">
        <div v-if="isAuthenticated" class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="#">Acceuil</a>
            <a class="nav-link" href="#">Mon profil</a>
            <a class="nav-link " href="#">Deconnexion</a>
        </div>
        <div v-if="!isAuthenticated && !authLoading" class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">Se connecter</a>
          <a class="nav-link" href="#">S'inscrire</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
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
