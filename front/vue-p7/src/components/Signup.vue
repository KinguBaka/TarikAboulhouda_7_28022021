<template>
    <div>
        <form class="signup" @submit.prevent="signup">
            <h2>S'inscrire</h2>
            <label>Email</label>
            <input required v-model="email" type="text" placeholder="email@email.com"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <label>Username</label>
            <input required v-model="username" type="text" placeholder="toto"/>
            <label for="bio">Bio</label>
            <input v-model="bio" type="text" placeholder="Présentez-vous">
            <hr />
            <button type="submit">s'inscrire</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Signup',
        data() {
            return {
                email:'',
                username:'',
                password:'',
                bio:''
            }
        },
        methods: {
            async signup(){

                await axios.post('users/signup',
                {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    bio: this.bio
                });
                this.$router.push('/login');
            }

        }
    }
</script>

<style>

</style>