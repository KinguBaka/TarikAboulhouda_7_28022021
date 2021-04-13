<template>

    <div>
        <ul class="list-group">
            <li class="list-group-item">
                <div id="email1">
                    Adresse email : <br> {{user.email}} 
                    <button class="btn btn-primary" @click.prevent="modifEmail">Modifier</button>
                
                </div>
                <div id="email2">
                    <form @submit.prevent="updateProfil">
                        <label> Nouvelle adresse email : </label> <br>
                        <input v-model="email" type="text" :placeholder="user.email" autocomplete="off"/>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
            <li class="list-group-item">
                <div id="mdp1">
                    Mot de passe 
                    <button class="btn btn-primary" @click.prevent="modifmdp">Modifier</button>
                </div>
                <div id="mdp2">
                    <form @submit.prevent="updateProfil">
                        <label> Nouveau mot de passe : </label> <br>
                        <input v-model="password" type="password" placeholder="Password" autocomplete="off"/>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
            <li class="list-group-item">
                <div id="username1">
                    Username : {{user.username}} 
                    <button class="btn btn-primary" @click.prevent="modifusername">Modifier</button>
                </div>
                <div id="username2">
                    <form @submit.prevent="updateProfil">
                        <label> Nouveau username : </label> <br>
                        <input v-model="username" type="text" :placeholder="user.username"/>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
            <li class="list-group-item">
                <div id="bio1">
                    Bio : {{user.bio}} 
                    <button class="btn btn-primary" @click.prevent="modifbio">Modifier</button>
                </div>
                <div id="bio2">
                    <form @submit.prevent="updateProfil">
                        <label> Nouvelle bio : </label> <br>
                        <textarea rows="5" cols="33" v-model="bio" :placeholder="user.bio"></textarea>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
        </ul>

        <button type="button" class="btn btn-danger" @click.prevent="deleteProfil">Supprimer son profil</button>

    </div>

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
            
            async deleteProfil(){
                await axios.delete('/users/me')
                localStorage.removeItem('token');
                this.$store.dispatch('user', null);
                this.$router.push('/').catch(err => {
                // Ignore the vuex err regarding  navigating to the page they are already on.
                if (
                    err.name !== 'NavigationDuplicated' &&
                    !err.message.includes('Avoided redundant navigation to current location')
                ) {
                    // But print any other errors to the console
                    console.log(err);
                }
                });
            },
            async updateProfil() {
                
                    let email = !this.email ? null: this.email
                    let username = !this.username ? null: this.username
                    let password = !this.password ? null: this.password
                    let bio = this.bio
                    let body = {}
                    const data = {
                        email,
                        username,
                        password,
                        bio
                    }

                    const newData = Object.keys(data).filter(key =>
                        data[key] != null
                    )
                    
                    for (let newValue of newData) {
                        body[newValue] = data[newValue]
                    }

                await axios.put('/users/me',
                   body
                );
                this.$router.push('/myprofil');
                window.location.reload();
            },
            modifEmail() {
                let email1 = document.getElementById("email1");
                let email2 = document.getElementById("email2");
                if(getComputedStyle(email1).display != "none"){
                    email1.style.display = "none";
                    email2.style.display = "block";
                } else {
                    email1.style.display = "block";
                    email2.style.display = "none";
                }
            },
            modifmdp() {
                let mdp1 = document.getElementById("mdp1");
                let mdp2 = document.getElementById("mdp2");
                if(getComputedStyle(mdp1).display != "none"){
                    mdp1.style.display = "none";
                    mdp2.style.display = "block";
                } else {
                    mdp1.style.display = "block";
                    mdp2.style.display = "none";
                }
            },
            modifusername() {
                let username1 = document.getElementById("username1");
                let username2 = document.getElementById("username2");
                if(getComputedStyle(username1).display != "none"){
                    username1.style.display = "none";
                    username2.style.display = "block";
                } else {
                    username1.style.display = "block";
                    username2.style.display = "none";
                }
            },
            modifbio() {
                let bio1 = document.getElementById("bio1");
                let bio2 = document.getElementById("bio2");
                if(getComputedStyle(bio1).display != "none"){
                    bio1.style.display = "none";
                    bio2.style.display = "block";
                } else {
                    bio1.style.display = "block";
                    bio2.style.display = "none";
                }
            }
        }
    }
</script>

<style>
    #email2 {
        display: none
    }
    #mdp2 {
        display: none
    }
    #username2 {
        display: none
    }
    #bio2 {
        display: none
    }
</style>