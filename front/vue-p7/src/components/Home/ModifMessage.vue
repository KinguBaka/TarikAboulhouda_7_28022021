<template>
    <div div="modifMessage" >
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel">Modifier votre message :</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <input require v-model="modifTitle" placeholder="Votre titre !"/>
                <textarea require v-model="modifContent" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
                <input type="file" id="modiffile" ref="modifFile" accept="image/png, image/jpeg" @change="modifFileUpload()">
                <button  @click.prevent="updateMessage(messageId)" class="btn btn-primary">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ModifMessage',
        data(){
            return {
                modifTitle:'',
                modifContent:'',
                modifAttachement: ''
            }
        },
        props: {
            messageId : Number
        },
        methods : {
            async updateMessage(id) {
                
                /*let title = this.modifTitle
                let content = this.modifContent
                let attachement = this.modifAttachement
               
                let body = {}
                const data = {
                    title,
                    content, 
                    attachement
                }

                const newData = Object.keys(data).filter(key =>
                    data[key] != null
                )

                for (let newValue of newData) {
                    body[newValue] = data[newValue]
                }*/

                let body = new FormData();
                body.append('title', this.modifTitle);
                body.append('content', this.modifContent);

                if (this.modifAttachement !== '') {
                    body.append('attachement', this.modifAttachement)
                }

                await axios.put('/messages/'+id,
                    body
                );
                window.location.reload();
            },
            modifFileUpload() {
                this.modifAttachement = this.$refs.modifFile.files[0];
            }
        }
    }
</script>

<style>

</style>