let defaultState = {
    fetching: false,
    fetched: false,
    error: [],
    loggedIn: false,
    loggedUser: {},
    currentTheorem: undefined,

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
        case 'REGISTER_USER':
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
                logged: true,
                redirecting: false,                
                fetching: false,
                fetched: true,
            }))
        
            return {
                ...state,
                loggedUser: { username: action.payload },
                logged: true,
                fetching: false,
                fetched: true,
            }
        case 'LOG_IN_REJECTED': 
            return {
                ...state,
                logged: false,
                fetching: false,
                fetched: false,
                error: action.payload,
            }
        case 'LOG_OUT':
            window.localStorage.setItem("userManagement", 
            JSON.stringify({
                ...state,
                logged: false,
                loggedUser: {},
            }))
            return {
                ...state,
                redirecting: false,                
                logged: false,
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
                logged: false,
                redirecting: false,                
                fetching: false,
                fetched: false,
                error: action.payload
            }
        default: 
            return state
    }
}

export default stateManagement;