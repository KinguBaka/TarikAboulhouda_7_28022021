<template>
    <div id="createMessage">
        <h2>Postez votre message !</h2>
        <input class="form-control" require v-model="title" placeholder="Votre titre !"/>
        <textarea require rows="5" v-model="content" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
        <input class="form-control" type="file" id="file" ref="file" accept="image/png, image/jpeg" @change="handleFileUpload()">
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
                attachement: ''
            }
        },
        methods : {
            async createMessage() {
                let body = new FormData();
                body.append('title', this.title);
                body.append('content', this.content);
                body.append('attachement', this.attachement)

                await axios.post('/messages/new', body);
                window.location.reload();
            },
            handleFileUpload() {
                this.attachement = this.$refs.file.files[0];
            }
        }
    }
</script>

<style>
    #createMessage {
        margin: 40px 0 40px 0;
        padding: 15px 0 15px 0;
        background-color:rgb(33,37,41);
        border-radius: 20px;
        border: rgb(189, 189, 189) 1px solid ;
        color: whitesmoke;
    }
    #createMessage h2 {
        margin: 15px 0 30px 0;
    }
    #createMessage .form-control {
        margin: 5px auto 10px auto;
        width: 40%;
    }
</style>