<template>
    <div id="login">
        <form @submit.prevent="login">
            <h2>Se connecter</h2>
            <label>Email</label> 
            <br>
            <input class="form-control" required v-model="email" type="text" placeholder="email@email.com"/> 
            <br>
            <label>Mot de passe</label> 
            <br>
            <input class="form-control" required v-model="password" type="password" placeholder="Password"/> 
            <br>
            <button class="btn btn-primary" type="submit">Se connecter</button>
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
                })
                localStorage.setItem('token', response.data.token);
                this.$store.dispatch('user', response.data.user);
                this.$router.push('/');
                window.location.reload();
            }
        }
    };
</script>

<style>
    #login {
        margin : 10% auto 10% auto;
        width: 70%;
        text-align: center;
        vertical-align: middle;
        border: grey 1px solid ;
        border-radius: 20px;
        box-shadow: 10px 10px 30px grey ;
        padding: 15px;
    }
    #login label {
        font-size:  2vw;
        margin-top: 15px;
    }
    .form-control {
        margin: 5px auto 10px auto;
        width: 40%;
    }
</style>