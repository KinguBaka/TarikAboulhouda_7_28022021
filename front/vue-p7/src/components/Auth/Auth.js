import axios from 'axios';


const AUTH_REQUEST = "AUTH_REQUEST";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const AUTH_ERROR = "AUTH_ERROR";
const AUTH_LOGOUT = "AUTH_LOGOUT";

const USER_REQUEST = "USER_REQUEST";
//const USER_SUCCESS = "USER_SUCCESS";
//const USER_ERROR = "USER_ERROR";

const state = {
    token: localStorage.getItem('user-token') || '',
    status: ''
}


const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}


const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit(AUTH_REQUEST)
            axios({url: '/users/login', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                localStorage.setItem('user-token', token) // store the token in localstorage
                axios.defaults.headers.common['Authorization'] = token
                commit(AUTH_SUCCESS, resp)
                // you have your token, now log in your user :)
                dispatch(USER_REQUEST)
                resolve(resp)
            })
            .catch(err => {
                commit(AUTH_ERROR, err)
                localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                reject(err)
            })
        })
    },
    [AUTH_LOGOUT]: ({commit}) => {
        return new Promise((resolve) => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('user-token') // clear your user's token from localstorage
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
        
    }
}


// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};