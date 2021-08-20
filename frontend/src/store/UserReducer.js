import { USER_DATA_SET, USER_LOGIN, USER_LOGOUT } from '../actions/UserActions';

const defaultState = {
    id : null,
    email: null,
}

export const userReducer = (state= defaultState, action) => {
    switch(action.type){
        case USER_DATA_SET:
        case USER_LOGIN:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
            }
        case USER_LOGOUT:
            return {
                ...state, 
                id: null,
                email: null,
            }
        default:
            return state
        
    }
}

export const setUserDataAction = (payload) => ({type: USER_DATA_SET, payload})
export const loginUserAction = (payload) => ({type:USER_LOGIN, payload})
export const logoutUserAction = (payload) => ({type: USER_LOGOUT})
