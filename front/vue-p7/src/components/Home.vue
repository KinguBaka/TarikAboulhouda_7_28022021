<template>
    <div>
        <div v-if="!user">
            <h1>Hello</h1>
            <h3>Vous n'êtes pas connecté !</h3>
        </div>
        <div v-if="user" id="messages"> 
            <div v-for="message of messages" :key="message.id" class="card">
                <h3> {{message.title}} </h3>
                <p> {{message.content}} </p>
                <p> {{format_date(message.createdAt)}} </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import axios from 'axios'
    import format_date from './Moment/moment'

    export default {
        name: 'Home',
        computed: {
            ...mapGetters(['user']),
            ...mapGetters(['messages'])
        },
        methods : {
            async listMessage() {
                const response = await axios.get('/messages/')
                this.$store.dispatch('messages', response.data)
            },
            format_date
        },
        mounted: function() {
            this.listMessage();
        }
    }
</script>


<style>
    h1 {
        font-size: 100px;
        text-align: center;
    }
</style>