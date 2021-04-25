<template>
    <div v-if="user" id="messages">
        <CreateMessage />
        <div v-for="message of messages" :key="message.id" class="card message">
            <div :id="message.id" class="oneMessage">
                <div v-if="message.UserId === user.id" class="dropdown">
                    <i class="fas fa-edit edit" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <button v-if="message.UserId === user.id" class="btn btn-danger" @click.prevent="deleteMessage(message.id)">Supprimer</button>
                        </li>
                        <li>
                            <button v-if="message.UserId === user.id" class="btn btn-primary" @click.prevent="modifMessage(message.id)" data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">Modifier</button>
                        </li>
                    </ul>
                </div>
                <h2><i class="far fa-user"></i>  {{message.User.username}} </h2>
                <h3> {{message.title}} </h3>
                <p> {{message.content}} </p>
                <img v-if="message.attachement" :src="message.attachement"/> <br>
                <span class="badge rounded-pill ">{{message.likes}} likes</span> 
                <LikeMessage :messageId="message.id" :messageUsersLiked="message.usersLiked" :userId="user.id" />
                <p class="date"> {{format_date(message.createdAt)}} </p>
            </div>
            <Comments :idMessage="message.id" :idUser="user.id" @modif-Comment="test" />
        </div>
        <ModifMessage :messageId="this.modifMessageId" />
        <ModifComment :idMessageModif="this.idModifCommentMessage" :idComment="this.idModifComment" />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from '../Moment/moment'
    import CreateMessage from './CreateMessage'
    import LikeMessage from './LikeMessage'
    import ModifMessage from './ModifMessage'
    import Comments from './Comments'
    import ModifComment from './ModifComment'

    export default {
        name: 'Messages',
        data(){
            return {
                modifMessageId: 0,
                idModifComment:0,
                idModifCommentMessage: 0
            }
        },
        computed: {
            ...mapGetters(['user']),
            ...mapGetters(['messages']),
            ...mapGetters(['comments'])
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
            },
            test(payload) {
                this.idModifComment = payload.idComment
                this.idModifCommentMessage = payload.idMessage
            }
        },
        mounted : function() {
            this.listMessage()
        },
        components : {
            CreateMessage,
            LikeMessage,
            ModifMessage,
            Comments,
            ModifComment
        }
    }
</script>

<style>
    .dropdown ul {
        background-color: rgb(33,37,41);
        text-align: center;
    }
    .dropdown button {
        width: 80%;
        margin: 3px;
    }
    .oneMessage .edit{
        margin: 15px;
        font-size: 2vw;
        position: absolute;
        right: 0;
        color: rgb(119, 119, 119);
    }
    #messages {
        width: 70%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
    .message {
        margin: 30px 0 30px 0;
        padding: 15px 0 15px 0;
        background: linear-gradient(rgb(54, 54, 54), rgb(80, 79, 79));
        border-radius: 20px;
        border: rgb(189, 189, 189) 1px solid ;
    }
    .oneMessage {
        margin: 10px 30px 5px 30px;
        padding: 10px;
        border-radius: 50px;
        background-color:rgb(33,37,41);
        color: whitesmoke;
    }
    .oneMessage span {
        background-color: #cfa544;
        margin: 5px;
        font-size: 1vw;
    }
    .oneMessage h2 {
        color: #cfa544;
    }
    .oneMessage h3 {
        text-decoration: underline;
        color: #cfa544;
    }
    textarea {
        width: 50%;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    #topButton {
        position: fixed;
        right: 3%;
    }
</style>