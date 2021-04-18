import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
    user : null,
    messages : null,
    comments : null
};

const store = new Vuex.Store({
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        messages: (state) => {
            return state.messages
        },
        comments: (state) => {
            return state.comments
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        messages(context, messages) {
            context.commit('messages', messages);
        },
        comments(context, comments) {
            context.commit('comments', comments);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        messages(state, messages) {
            state.messages = messages;
        },
        comments(state, comments) {
            state.comments = comments;
        }
    }
});

export default store;