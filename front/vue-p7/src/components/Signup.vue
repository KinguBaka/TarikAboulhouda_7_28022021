<template>
    <div id="signup">
        <form  @submit.prevent="signup">
            <h2>S'inscrire</h2>
            <label>Email <span class="red">*</span></label>
            <input class="form-control" required v-model="email" type="text" placeholder="email@email.com"/>
            <label>Mot de passe <span class="red">*</span></label>
            <input class="form-control" required v-model="password" type="password" placeholder="Password"/>
            <label>Username <span class="red">*</span></label>
            <input class="form-control" required v-model="username" type="text" placeholder="toto"/>
            <label for="bio">Bio</label>
            <textarea class="form-control" rows="5" v-model="bio" type="text" placeholder="Présentez-vous"></textarea>
            <span class="red droite">* champ obligatoire</span> <br>
            <button class="btn btn-primary" type="submit">S'inscrire</button>
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
    #signup {
        margin : 10% auto 10% auto;
        width: 70%;
        text-align: center;
        vertical-align: middle;
        border: grey 1px solid ;
        border-radius: 20px;
        box-shadow: 10px 10px 30px grey ;
        padding: 15px;
        background-color:rgb(33,37,41);
        color: whitesmoke;
    }

    #signup button {
        margin: 10px;
    }

    #signup label {
        font-size:  2vw;
        margin-top: 15px;
    }

    .red {
        color: red ;
    }

    .droite {
        float: right;
    }
</style>