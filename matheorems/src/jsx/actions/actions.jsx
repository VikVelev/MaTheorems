import axios from 'axios'
import url from './backendUrl'

export function login(username, password) {
    return function(dispatch) {
        dispatch({ type: "LOG_IN" })
        axios.post(url + "/api/login/", {
            username: username,
            password: password,
        }).then((response) => {
            let sendResponse = {
                ...response.data,
                username: username,
            }
            dispatch({ type: "LOG_IN_FULFILLED", payload: sendResponse })
        }).catch((error) => {
            dispatch({ type: "LOG_IN_REJECTED", payload: error.response.data })
        })
    }
}

export function logout() {
    return function(dispatch) {
        dispatch({ type: "LOG_OUT" })
    }
}

export function fetchTheorems() {
    return function(dispatch) {
        dispatch({ type: "FETCH_THEOREMS" })
        axios.get(url + "/api/theorems/")
        .then((response) => {
            dispatch({ type: "FETCH_THEOREMS_FULFILLED", payload: response })
        }).catch((error) => {
            dispatch({ type: "FETCH_THEOREMS_REJECTED", payload: error.response.data })
        })
    }
}

export function addTheorem(token, name, b64) {
    return function(dispatch){
        console.log(token,name,b64)
    }
}