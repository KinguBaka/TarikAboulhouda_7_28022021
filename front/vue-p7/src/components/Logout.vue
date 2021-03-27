<template>

    <a @click="Logout.prevent">Deconnexion</a>
</template>

<script>
    import { AUTH_LOGOUT } from './Auth/auth';

    export default {
        name: 'Logout',
        methods: {
            logout: function () {
                this.$store.dispatch(AUTH_LOGOUT)
                .then(() => {
                    this.$router.push('/login')
                })
            }
        }
    }
</script>

<style>

</style>