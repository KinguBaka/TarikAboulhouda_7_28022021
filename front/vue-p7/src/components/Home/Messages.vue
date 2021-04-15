<template>
    <div v-if="user" id="messages">
        <CreateMessage />
        <div v-for="message of messages" :key="message.id" class="card">
            <div :id="message.id + 'n1'">
                <h3> {{message.title}} </h3>
                <p> {{message.content}} </p>
                <img v-if="message.attachement" :src="message.attachement"/> <br>
                <span class="badge rounded-pill bg-primary">{{message.likes}} likes</span>
                <LikeMessage :messageId="message.id" :messageUsersLiked="message.usersLiked" :userId="user.id" />
                <p> {{format_date(message.createdAt)}} </p>
                <button v-if="message.UserId === user.id" class="btn btn-danger" @click.prevent="deleteMessage(message.id)">Supprimer</button>
                <button v-if="message.UserId === user.id" class="btn btn-primary" @click.prevent="modifMessage(message.id)">Modifier</button>
            </div>
            <div :id="message.id + 'n2'" class="disable">
                <input require v-model="title" :placeholder="message.title" />
                <textarea require v-model="content" class="form-control" :placeholder="message.content"></textarea>
                <!-- <input type="file" accept="image/png, image/jpeg"> -->
                <button  @click.prevent="updateMessage(message.id)" class="btn btn-primary">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from '../Moment/moment'
    import CreateMessage from './CreateMessage'
    import LikeMessage from './LikeMessage'

    export default {
        name: 'Messages',
        data(){
            return {
                title:'',
                content:'',
                attachement: null
            }
        },
        computed: {
            ...mapGetters(['user']),
            ...mapGetters(['messages'])
        },
        methods : {
            async listMessage() {
                const response = await axios.get('/messages/')
                this.$store.dispatch('messages', response.data)
            },
            format_date,
            async deleteMessage(id) {
                await axios.delete('/messages/'+ id)
                window.location.reload();
            },
            modifMessage(id) {
                let message1 = document.getElementById(id+"n1");
                let message2 = document.getElementById(id+"n2");
                if(getComputedStyle(message1).display != "none"){
                    message1.style.display = "none";
                    message2.style.display = "block";
                } else {
                    message1.style.display = "block";
                    message2.style.display = "none";
                }
            },
            async updateMessage(id) {

                let title = this.title
                let content = this.content
                let attachement = !this.attachement ? null: this.attachement
                let body = {}
                const data = {
                    title,
                    content, 
                    attachement
                }

                const newData = Object.keys(data).filter(key =>
                    data[key] != null
                )

                for (let newValue of newData) {
                        body[newValue] = data[newValue]
                }

                await axios.put('/messages/' + id,
                    body
                );
                window.location.reload();
            }
        },
        mounted : function() {
            this.listMessage();
        },
        components : {
            CreateMessage,
            LikeMessage
        }
    }
</script>

<style>
    textarea {
        width: 50%;
    }
    .disable {
        display: none;
    }
</style>