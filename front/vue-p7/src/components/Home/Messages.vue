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
                <button v-if="message.UserId === user.id" class="btn btn-primary" @click.prevent="modifMessage(message.id)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">Modifier</button>
            </div>
        </div>
        <ModifMessage :messageId="this.modifMessageId" />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from '../Moment/moment'
    import CreateMessage from './CreateMessage'
    import LikeMessage from './LikeMessage'
    import ModifMessage from './ModifMessage'

    export default {
        name: 'Messages',
        data(){
            return {
                modifMessageId: 0
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
                this.modifMessageId = id
            }
        },
        mounted : function() {
            this.listMessage();
        },
        components : {
            CreateMessage,
            LikeMessage,
            ModifMessage
        }
    }
</script>

<style>
    textarea {
        width: 50%;
    }
</style>