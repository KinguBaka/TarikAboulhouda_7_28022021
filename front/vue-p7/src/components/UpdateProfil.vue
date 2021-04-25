<template>

    <div id="update">
        <router-link id="exit" to="/myprofil">
            <i class="fas fa-times" ></i>
        </router-link>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div id="email1">
                    <i class="fas fa-edit" @click.prevent="modifEmail"></i>
                    <h4>Adresse email : <br> {{user.email}} </h4>
                
                </div>
                <div id="email2">
                    <i class="fas fa-times" @click.prevent="modifEmail"></i>
                    <form @submit.prevent="updateProfil">
                        <label> Nouvelle adresse email : </label> <br>
                        <input class="form-control" v-model="email" type="text" :placeholder="user.email" autocomplete="off"/>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                    
                </div>
            </li>
            <li class="list-group-item">
                <div id="mdp1">
                    <i class="fas fa-edit" @click.prevent="modifMdp"></i>
                   <h4> Mot de passe </h4>
                </div>
                <div id="mdp2">
                    <i class="fas fa-times" @click.prevent="modifMdp"></i>
                    <form @submit.prevent="updateProfil">
                        <label> Nouveau mot de passe : </label> <br>
                        <input class="form-control" v-model="password" type="password" placeholder="Password" autocomplete="off"/>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
            <li class="list-group-item">
                <div id="username1">
                    <i class="fas fa-edit" @click.prevent="modifUsername"></i>
                    <h4>Username : <br> {{user.username}} </h4>
                </div>
                <div id="username2">
                    <i class="fas fa-times" @click.prevent="modifUsername"></i>
                    <form @submit.prevent="updateProfil">
                        <label> Nouveau username : </label> <br>
                        <input class="form-control" v-model="username" type="text" :placeholder="user.username"/>
                        <button class="btn btn-primary" type="submit">Modifier</button>
                    </form>
                </div>
            </li>
            <li class="list-group-item">
                <div id="bio1">
                    <i class="fas fa-edit" @click.prevent="modifBio"></i>
                    <h4>Bio : <br> {{user.bio}} </h4>
                </div>
                <div id="bio2">
                    <i class="fas fa-times" @click.prevent="modifBio"></i>
                    <form @submit.prevent="updateProfil">
                        <label> Nouvelle bio : </label> <br>
                        <textarea class="form-control" rows="5" cols="33" v-model="bio" :placeholder="user.bio"></textarea>
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
            modifMdp() {
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
            modifUsername() {
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
            modifBio() {
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
    #exit {
        color: rgb(119, 119, 119);
        font-size: 3vw;
        position: relative;
        margin-right: -120% ;
        text-decoration: none;
    }
    #update {
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
    #update label {
        font-size: 2vw;
    }
    #update ul i {
        color: rgb(119, 119, 119);
        font-size: 1.5vw;
        float: right;
    }
    #update i:hover {
        cursor: pointer;
    }
    #update li {
        padding: 20px 30px 20px 30px;
        color: whitesmoke;
        background-color:rgb(33,37,41);
    }
    #update ul {
        margin: 50px 0 50px 0;
        background-color:rgb(33,37,41);
        border-radius: 50px;
    }
    #update form .form-control {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
    }
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