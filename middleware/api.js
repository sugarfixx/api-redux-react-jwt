const BASE_URL = 'http://api.app/api/'

function callApi(endpoint, authenticated) {
    let token = localStorage.getItem('id_token') || null
    let config = {}

    if(authenticated) {
        if(token) {
            config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        } else {
            throw "No token saved!"
        }
    }
    return fetch(BASE_URL + endpoint, config)
    .then(response => response.json()
        .then(obj => ({ obj, response }))
    ).then(({ obj, response }) => {
        if (!response.ok) {
            return Promise.reject(obj)
        }
        return obj
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')
export default store => next => action => {

    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types, authenticated } = callAPI
    const [ requestType, successType, errorType ] = types

    return callApi(endpoint, authenticated).then(
        response =>
        next({
            response,
            authenticated,
            type: successType
        }),
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    )
}