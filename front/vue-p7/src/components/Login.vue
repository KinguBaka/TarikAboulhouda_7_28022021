<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h2>Se connecter</h2>
            <label>email</label>
            <input required v-model="email" type="text" placeholder="email@email.com"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import { AUTH_REQUEST } from './Auth/auth';

    export default {
        name: 'login',
        data(){
            return {
                email: '',
                password: ''
            }
        },
        method : {
            login(){
                const { email, password } = this;
                this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
                    this.$router.push('/')
                });
            }
        }
    };
</script>

<style>

</style>