<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h2>Se connecter</h2>
            <label>email</label>
            <input required v-model="email" type="text" placeholder="email@email.com"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr />
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Login',
        data(){
            return {
                email: '',
                password: ''
            }
        },
        methods : {
            async login() {
                const response = await axios.post('/users/login', {
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('token', response.data.token);
                this.$store.dispatch('user', response.data.user);
                this.$router.push('/');
            }
        }
    };
</script>

<style>

</style>