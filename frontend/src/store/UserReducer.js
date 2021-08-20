import { USER_DATA_FETCH, USER_LOGIN, USER_LOGOUT } from '../actions/UserActions';

const defaultState = {
    id : null,
    email: null,
    roleId: null
}

export const userReducer = (state= defaultState, action) => {
    switch(action.type){
        case USER_DATA_FETCH:
        case USER_LOGIN:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                roleId: action.payload.roleId
            }
        case USER_LOGOUT:
            return {
                ...state, 
                id: null,
                email: null,
                roleId: null
            }
        default:
            return state
        
    }
}

export const fetchUserDataAction = (payload) => ({type: USER_DATA_FETCH, payload})
export const loginUserAction = (payload) => ({type:USER_LOGIN, payload})
export const logoutUserAction = (payload) => ({type: USER_LOGOUT})
