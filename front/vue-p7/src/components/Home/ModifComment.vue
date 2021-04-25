<template>
    <div div="modifComment" >
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop2" aria-labelledby="offcanvasWithBackdropLabel2">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBackdropLabel2">Modifier votre commentaire :</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <textarea require v-model="modifComment" rows="8" class="form-control" placeholder="Que voulez-vous dire?"></textarea>
                <button  @click.prevent="updateComment(idMessageModif, idComment)" class="btn btn-primary">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ModifComment',
        data() {
            return {
                modifComment:''
            }
        },
        props: {
            idComment : Number,
            idMessageModif : Number
        },
        methods : {
            async updateComment(idMessage, idComment) {
                let content = this.modifComment
                await axios.put(`/messages/${idMessage}/comment/${idComment}`,{
                    content
                })
                window.location.reload();
            }
        }
    }
</script>

<style>
    .form-control {
        width: 100%;
        margin: 0 0 15px 0;
    }
</style>