import { combineReducers } from 'redux'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
} from '../actions/index'

function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
         })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
        })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
        })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
        })
        default:
            return state
    }
}



function quotes(state = {
    isFetching: false,
    quote: '',
    authenticated: false
}, action) {
    switch (action.type) {
        case QUOTE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
        })
        case QUOTE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                quote: action.response,
                authenticated: action.authenticated || false
        })
        case QUOTE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
        })
        default:
            return state
    }
}

const quotesApp = combineReducers({
    auth,
    quotes
})

export default quotesApp
