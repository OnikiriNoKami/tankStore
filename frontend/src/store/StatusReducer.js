import {
    AUTHENTICATED, 
    AUTHORIZATION_FAIL, 
    CONNECTION_ESTABLISHED, 
    FAIL_TO_CONNECT,
    RESET_CONNECTION
} from '../actions/StatusActions'


const defaultState = {
    authenticated: false,
    connection: null
}

export const statusReducer = (state=defaultState, action) =>{
    switch(action.type){
        case AUTHENTICATED:
            return {...state, authenticated: action.payload, connection: action.payload}
        case RESET_CONNECTION:
            return {...state, connection: action.payload}
        case FAIL_TO_CONNECT:
            return {...state, connection: action.payload}
        case CONNECTION_ESTABLISHED:
            return {...state, connection: action.payload}
        case AUTHORIZATION_FAIL:
        default:
            return state
    }
}

export const authUser = (payload) => ({type:AUTHENTICATED, payload})
export const authConnFail = (payload) => ({type:FAIL_TO_CONNECT, payload})
export const authResetConn = (payload) => ({type:RESET_CONNECTION, payload})
export const authFail = () => ({type:AUTHORIZATION_FAIL})
export const authConnEstablished = (payload) => ({type: CONNECTION_ESTABLISHED, payload})