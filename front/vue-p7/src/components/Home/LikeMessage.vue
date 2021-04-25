<template>
    <div id="LikeMessage">
        <i class="like fas fa-thumbs-down" v-if="messageUsersLiked.includes(userId)" @click.prevent="dislikeMessage(messageId)"></i>
        <i class="like fas fa-thumbs-up" v-else @click.prevent="likeMessage(messageId)"></i>
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
    .like {
        color: #0D6EFD;
        font-size: 2vw;
    }
    .like:hover {
        cursor: pointer;
    }
</style>