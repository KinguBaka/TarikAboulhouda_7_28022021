<template>
    <div>
        <div v-if="!user">
            <h1>Hello</h1>
            <h3>Vous n'êtes pas connecté !</h3>
        </div>
        <div v-if="user" id="messages">
            <div>
                <input require v-model="title" placeholder="Votre titre !"/>
                <textarea require v-model="content" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
                <button @click.prevent="createMessage" class="btn btn-primary">Publier</button>
            </div>
            <div v-for="message of messages" :key="message.id" class="card">
                <h3> {{message.title}} </h3>
                <p> {{message.content}} </p>
                <img v-if="message.attachement" :src="message.attachement"/>
                <p> {{format_date(message.createdAt)}} </p>
                <button v-if="message.UserId === user.id" class="delete btn btn-danger" @click.prevent="deleteMessage(message.id)">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from './Moment/moment'

    export default {
        name: 'Home',
        data() {
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
            async createMessage() {
                await axios.post('/messages/new',
                {
                    title: this.title,
                    content: this.content,
                    attachement: this.attachement
                });
                window.location.reload();
            },
            async deleteMessage(id) {
                await axios.delete('/messages/'+ id)
                window.location.reload();
            }
        },
        mounted: function() {
            this.listMessage();
        }
    }
</script>


<style>
    h1 {
        font-size: 100px;
        text-align: center;
    }
    textarea {
        width: 50%;
    }
    .delete {
        width: 100px;
    }
</style>