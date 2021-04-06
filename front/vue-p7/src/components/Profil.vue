<template>
    <div class="myprofil">
        <h1> {{user.username}} </h1>
        <h3> {{user.bio}} </h3>

        <router-link to="/updateprofil"> 
            <button class="btn btn-primary" > Modifier mes informations</button>
        </router-link>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Myprofil',
        computed: {
            ...mapGetters(['user'])
        }
    }
</script>

<style>

</style>