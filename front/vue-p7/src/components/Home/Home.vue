<template>
    <div>
        <div v-if="!user">
            <h1>Hello</h1>
            <h3>Vous n'êtes pas connecté !</h3>
        </div>
        <Messages />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Messages from './Messages'

    export default {
        name: 'Home',
        computed: {
            ...mapGetters(['user'])
        },
        components: { 
            Messages
        }
    }
</script>


<style>
    h1 {
        font-size: 100px;
        text-align: center;
    }
    button {
        width: 100px;
    }
</style>