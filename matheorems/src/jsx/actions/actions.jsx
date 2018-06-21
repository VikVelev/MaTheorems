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

export function addTheorem(token, name, definition, classNum, b64) {
    return function(dispatch){
        dispatch({ type: "ADD_THEOREM" })        
        axios.post(url + "/api/theorems/", {
            "name": name,
            "definition": definition,
            "ggbFile64": b64,
            "classNum": classNum
        }).then((response) => {
            dispatch({ type: "ADD_THEOREM_FULFILLED", payload: response })
        }).catch((error) => {
            dispatch({ type: "ADD_THEOREM_REJECTED", payload: error })        
        });
    }
}