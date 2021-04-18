<template>
    <div id="comments">
        <div v-for="comment of comments" :key="comment.id" class="card">
            <div v-if="comment.MessageId === idMessage" :id="'comment'+comment.id">
                <h3> {{comment.User.username}} </h3>
                <p> {{comment.content}} </p>
                <p> {{format_date(comment.createdAt)}} </p>
                <button v-if="comment.UserId === idUser" class="btn btn-danger" @click.prevent="deleteComment(idMessage, comment.id)">Supprimer</button>
                <button v-if="comment.UserId === idUser" class="btn btn-primary" @click.prevent="modifMessage(message.id)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">Modifier</button>
            </div>
        </div>
        <CreateComment :idMessage = idMessage />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from '../Moment/moment'
    import CreateComment from './CreateComment'

    export default {
        name: 'Comments',
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