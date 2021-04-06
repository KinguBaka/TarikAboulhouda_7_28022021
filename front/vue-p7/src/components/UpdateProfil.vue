<template>
    <div class="update">
        <ul>
            <li>
                <form @submit.prevent="updateProfil">
                    <label>Email : {{user.email}} </label> <br>
                    <input v-model="email" type="text" placeholder="email@email.com"/>
                    <button class="btn btn-primary" type="submit">Modifier</button> <br> <br>
                </form>
            </li>
            <li>
                <form @submit.prevent="updateProfil">
                    <label>Password : {{user.password}} </label> <br>
                    <input v-model="password" type="password" placeholder="Password"/>
                    <button class="btn btn-primary" type="submit">Modifier</button> <br> <br>
                </form>
            </li>
            <li>
                <form @submit.prevent="updateProfil">
                    <label>Username : {{user.username}} </label> <br>
                    <input v-model="username" type="text" placeholder="toto" />
                    <button class="btn btn-primary" type="submit">Modifier</button> <br> <br>
                </form>
            </li>
            <li>
                <form @submit.prevent="updateProfil">
                    <label for="bio">Bio : {{user.bio}} </label> <br>
                    <input v-model="bio" type="text" placeholder="Présentez-vous"/>
                    <button class="btn btn-primary" type="submit">Modifier</button> <br> <br>
                </form>
            </li>
        </ul>

    </div>
    <!--<form class="update" @submit.prevent="updateProfil" autocomplete="off">
        <h2> Changement de paramétres </h2>
        <br>
        <label>Email : {{user.email}} </label> <br>
        <input v-model="email" type="text" placeholder="email@email.com"/> <br> <br>
        <label>Password : {{user.password}} </label> <br>
        <input v-model="password" type="password" placeholder="Password"/> <br> <br>
        <label>Username : {{user.username}} </label> <br>
        <input v-model="username" type="text" :placeholder="user.username" /> <br> <br>
        <label for="bio">Bio : {{user.bio}} </label> <br>
        <input v-model="bio" type="text" placeholder="Présentez-vous"/> <br> <br>
        <br>
        <br>
        <button class="btn btn-primary" type="submit">Modifier</button>
    </form>-->
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'

    export default {
        name: 'Update',
        data() {
            return {
                email: null,
                password: null,
                username: null,
                bio: null
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            async updateProfil() {
                await axios.put('/users/me',
                {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    bio: this.bio
                });
                this.$router.push('/myprofil');

            }

        }

    }
</script>

<style>

</style>