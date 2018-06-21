let defaultState = {
    fetching: false,
    fetched: false,
    error: [],
    loggedIn: false,
    loggedUser: {},
    currentTheorem: undefined,
    allTheorems: [],
}

const myStorage = window.localStorage

if(myStorage.getItem("userManagement")){
    defaultState = JSON.parse(myStorage.getItem("userManagement"))
    defaultState = {
        ...defaultState, 
        fetching: false,
        fetched: false,
        currentTheorem: undefined,
        error: [],
    }
}

const stateManagement = (state=defaultState, action) => {
    switch (action.type) {
        case 'LOG_IN': case 'FETCH_USER': 
        case 'REGISTER_USER': case 'FETCH_THEOREMS':
        case 'ADD_THEOREM':
            return {
                ...state,
                fetched: false,
                fetching: true,
                error: {},
            }
        case 'LOG_IN_FULFILLED':
            myStorage.setItem("userManagement", JSON.stringify({
                ...state,
                loggedUser: action.payload,
                loggedIn: true,
                redirecting: false,                
                fetching: false,
                fetched: true,
            }))
        
            return {
                ...state,
                loggedUser: { username: action.payload },
                loggedIn: true,
                fetching: false,
                fetched: true,
            }
        case 'LOG_IN_REJECTED': 
            return {
                ...state,
                loggedIn: false,
                fetching: false,
                fetched: false,
                error: action.payload,
            }
        case 'LOG_OUT':
            window.localStorage.setItem("userManagement", 
            JSON.stringify({
                ...state,
                loggedIn: false,
                loggedUser: {},
            }))
            return {
                ...state,
                loggedIn: false,
                loggedUser: {},
                token: "",
            }
        case 'REGISTER_USER_FULFILLED':
            return {
                ...state,
                fetching: false,
                fetched: true,
                redirecting: true,
            }
        case 'REGISTER_USER_REJECTED':
            return {
                ...state,
                loggedIn: false,
                redirecting: false,                
                fetching: false,
                fetched: false,
                error: action.payload
            }
        case 'FETCH_THEOREMS_FULFILLED':
            return {
                ...state,
                allTheorems: action.payload.data,
                fetching: false,
                fetched:true,
            }
        case 'FETCH_THEOREMS_REJECTED':
            return {
                ...state,
                error: action.payload,
                fetching: false,
                fetched: false,
            }
        case 'ADD_THEOREM_FULFILLED':
            return {
                ...state,
                fetched: true,
                fetching: false,
            }
        case 'ADD_THEOREM_REJECTED':
            return {
                ...state,
                error: action.payload,
                fetching: false,
                fetched: false,
            }
        default: 
            return state
    }
}

export default stateManagement;