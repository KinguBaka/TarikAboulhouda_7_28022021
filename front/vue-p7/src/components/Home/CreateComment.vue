<template>
    <div id="createComment">
        <textarea require v-model="content" class="form-control" placeholder="Ecrivez un commentaire..."></textarea>
        <button  @click.prevent="createComment(idMessage)" class="btn btn-primary">Commenter</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CreateComment',
        data() {
            return {
                content: ''
            }
        },
        props: {
            idMessage : Number
        },
        methods : {
            async createComment(idMessage) {
                let content = this.content

                await axios.post(`/messages/${idMessage}/comment/new`, {
                    content
                })
                window.location.reload();
            }
        }

    }
</script>

<style>

</style>