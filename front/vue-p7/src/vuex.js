import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
    user : null,
    messages : null
};

const store = new Vuex.Store({
    state,
    getters: {
        user: (state) => {
            return state.user;
        },
        messages: (state) => {
            return state.messages
        }
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        messages(context, messages) {
            context.commit('messages', messages);
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        messages(state, messages) {
            state.messages = messages;
        }
    }
});

export default store;