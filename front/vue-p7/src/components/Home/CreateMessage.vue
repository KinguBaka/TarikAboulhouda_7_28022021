<template>
    <div id="createMessage">
        <input require v-model="title" placeholder="Votre titre !"/>
        <textarea require v-model="content" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
        <input type="file" id="file" ref="file" accept="image/png, image/jpeg" @change="handleFileUpload()">
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
                file: ''
            }
        },
        methods : {
            async createMessage() {
                let body = new FormData();
                body.append('title', this.title);
                body.append('content', this.content);
                body.append('attachement', this.file)

                await axios.post('/messages/new', body);
                window.location.reload();
            },
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
            }
        }
    }
</script>

<style>

</style>