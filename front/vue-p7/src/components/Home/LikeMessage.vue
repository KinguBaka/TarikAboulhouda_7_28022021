<template>
    <div id="LikeMessage">
        <button v-if="messageUsersLiked.includes(userId)" @click.prevent="dislikeMessage(messageId)">Je n'aime plus !</button>
        <button v-else @click.prevent="likeMessage(messageId)">J'aime !</button>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'LikeMessage',
        props:{
            messageUsersLiked: Array,
            userId: Number,
            messageId: Number
        },
        methods: {
            async dislikeMessage(messageId) {
                await axios.put(`/messages/${messageId}/like`,{
                    like: 0
                })
                window.location.reload();
            },
            async likeMessage(messageId) {
                await axios.put(`/messages/${messageId}/like`,{
                    like: 1
                })
                window.location.reload();
            }
        }
    }
</script>

<style>

</style>