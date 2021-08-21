import {
    AUTHENTICATED, 
    AUTHORIZATION_FAIL, 
    NOT_AUTHORIZED,
    FAIL_TO_CONNECT
} from '../actions/StatusActions'


const defaultState = {
    authenticated: false
}

export const statusReducer = (state=defaultState, action) =>{
    switch(action.type){
        case AUTHENTICATED:
            return {...state, authenticated: action.payload}
        case AUTHORIZATION_FAIL:
        case FAIL_TO_CONNECT:
        default:
            return state
    }
}

export const authUser = (payload) => ({type:AUTHENTICATED, payload})
export const authConnFail = () => ({type:FAIL_TO_CONNECT})
export const authFail = () => ({type:AUTHORIZATION_FAIL})