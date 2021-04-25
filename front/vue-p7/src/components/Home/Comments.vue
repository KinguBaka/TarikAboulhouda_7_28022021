<template>
    <div id="comments">
        <div v-for="comment of comments" :key="comment.id" >
            <div v-if="comment.MessageId === idMessage" :id="'comment'+comment.id" class="oneComment">
                <div class="dropdown" v-if="comment.UserId === idUser || userIsAdmin === true">
                    <i class="fas fa-edit edit" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li>
                            <button v-if="comment.UserId === idUser || userIsAdmin === true" class="btn btn-danger" @click.prevent="deleteComment(idMessage, comment.id)">Supprimer</button>
                        </li>
                        <li>
                            <button v-if="comment.UserId === idUser" class="btn btn-primary" @click.prevent="modifComment(comment.id, idMessage)" data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasWithBackdrop2" aria-controls="offcanvasWithBackdrop2">Modifier</button>
                        </li>
                    </ul>
                </div>
                <div class="commentContent">
                    <p class="commentUsername"><i class="far fa-user"></i>  {{comment.User.username}} </p>
                    <p> {{comment.content}} </p>
                    <p class="date"> {{format_date(comment.createdAt)}} </p>
                </div>
            </div>
        </div>
        <CreateComment :idMessage="idMessage" />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from '../Moment/moment'
    import CreateComment from './CreateComment'

    export default {
        name: 'Comments',
        data() {
            return {
                modifCommentId: 0
            }
        },
        props:{
            idMessage: Number,
            idUser: Number,
            userIsAdmin: Boolean
        },
        computed : {
            ...mapGetters(['comments'])
        },
        methods : {
            format_date,
            async listComment() {
                const response = await axios.get('/comment/')
                this.$store.dispatch('comments', response.data)
            },
            async deleteComment(idMessage, idComment) {
                await axios.delete(`/messages/${idMessage}/comment/${idComment}`)
                window.location.reload();
            },
            modifComment(idComment, idMessage) {
                this.modifCommentId = idComment
                
                this.$emit('modif-Comment', {
                    idComment : this.modifCommentId,
                    idMessage : idMessage
                })
            }
        },
        mounted : function() {
            this.listComment();
        },
        components : {
            CreateComment
        }
    }
</script>

<style>
    .oneComment .edit{
        margin: 15px;
        font-size: 1.5vw;
        position: absolute;
        right: 0;
        color: rgb(119, 119, 119);
    }
    .commentUsername {
        color: #cfa544;
    }
    .oneComment {
        margin: 5px 30px 5px 30px;
        padding: 10px;
        border-radius: 50px;
        background-color:rgb(33,37,41);
        color: whitesmoke;
    }
    .commentContent {
        
        padding: 7px;
        border-radius: 20px;
        margin: 5px 0 5px 0;
    }
    .commentContent p {
        margin-bottom: 3px;
    }
    .date {
        font-size: 1vw;
    }
</style>