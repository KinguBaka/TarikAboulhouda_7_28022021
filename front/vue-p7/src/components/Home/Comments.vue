<template>
    <div id="comments">
        <div v-for="comment of comments" :key="comment.id" class="card">
            <div v-if="comment.messageId == idMessage" :id="comment.id + 'n1'">
                <h4> {{comment}} </h4>
                <p> {{comment.content}} </p>
                <p> {{format_date(comment.createdAt)}} </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from '../Moment/moment'

    export default {
        name: 'Comments',
        props:{
            idMessage: Number,
        },
        computed : {
            ...mapGetters(['comments'])
        },
        methods : {
            async listComment(idMessage) {
                const response = await axios.get(`/messages/${idMessage}/comment/`)
                this.$store.dispatch('comments', response.date)
            }
        },
        mounted : function() {
            this.listComment(idMessage);
        }
    }
</script>

<style>

</style>