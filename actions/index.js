import { CALL_API } from '../middleware/api'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}


function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export function loginUser(creds) {
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: `email=${creds.username}&password=${creds.password}`
    }
    return dispatch => {
        dispatch(requestLogin(creds))
        return fetch('http://api.app/api/authenticate', config)
        .then(response =>
            response.json()
            .then(user => ({ user, response }))
        ).then(({ user, response }) =>  {
            console.log(response)
            if (!response.ok) {
                console.log(response)
                dispatch(loginError(user.message))
                return Promise.reject(user)
            }
            else {
                console.log(user.id_token)
                localStorage.setItem('id_token', user.id_token)
                dispatch(receiveLogin(user))
            }
        }).catch(err => console.log("Error: ", err))
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        dispatch(receiveLogout())
    }
}

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'

export function fetchQuote() {
    return {
        [CALL_API]: {
            endpoint: 'quotes/1?random=public',
            authenticated: false,
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    }
}

export function fetchSecretQuote() {
    return {
        [CALL_API]: {
            endpoint: 'quotes/1?random=secret',
            authenticated: true,
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    }
}
