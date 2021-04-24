<template>
    <div id="home">
        <div v-if="!user" id="notLogin">
            <h1>Bienvenue chez Groupomania</h1>
            <h4>Vous n'êtes pas connecté !</h4>
            <p> <strong> Connectez-vous ou créez un compte pour échanger avec vos collégues ! </strong> </p>
        </div>
        <Messages />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Messages from './Messages'

    export default {
        name: 'Home',
        computed: {
            ...mapGetters(['user'])
        },
        components: { 
            Messages
        }
    }
</script>


<style>
    h1 {
        font-size: 8vw;
    }
    #home {
        margin-left: auto;
        margin-right: auto;
        height: 100%;
    }
    #notLogin {
        text-align: center;
        height: 100%;
        padding: 100px;
        background-image: url("../../assets/pexels-sevenstorm-juhaszimrus-443383v2.jpg");
        background-repeat:no-repeat;
        background-size: cover;
    }
    #notLogin h4 {
        margin: 50px;
    }
    html, body{
        margin :0;
        padding: 0;
        height: 100%;
    }
    #app {
        height: 100%;
    }
</style>