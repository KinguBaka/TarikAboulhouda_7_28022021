<template>
    <div id="comments">
        <div v-for="comment of comments" :key="comment.id" >
            <div v-if="comment.MessageId === idMessage" :id="'comment'+comment.id" class="card">
                <h3> {{comment.User.username}} </h3>
                <p> {{comment.id}} </p>
                <p> {{comment.content}} </p>
                <p> {{format_date(comment.createdAt)}} </p>
                <button v-if="comment.UserId === idUser" class="btn btn-danger" @click.prevent="deleteComment(idMessage, comment.id)">Supprimer</button>
                <button v-if="comment.UserId === idUser" class="btn btn-primary" @click.prevent="modifComment(comment.id, idMessage)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop2" aria-controls="offcanvasWithBackdrop2">Modifier</button>
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
            idUser: Number
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

</style>