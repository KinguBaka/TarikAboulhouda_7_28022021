<template>
    <div id="createMessage">
        <input require v-model="title" placeholder="Votre titre !"/>
        <textarea require v-model="content" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
        <!-- <input type="file" accept="image/png, image/jpeg"> -->
        <button  @click.prevent="createMessage" class="btn btn-primary">Publier</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CreateMessage',
        data(){
            return {
                title:'',
                content:'',
                attachement: null
            }
        },
        methods : {
            async createMessage() {
                await axios.post('/messages/new',
                {
                    title: this.title,
                    content: this.content,
                    attachement: this.attachement
                });
                window.location.reload();
            }
        }
    }
</script>

<style>

</style>