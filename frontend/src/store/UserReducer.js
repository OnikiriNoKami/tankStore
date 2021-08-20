import { USER_DATA_FETCH, USER_LOGIN } from '../actions/UserActions';

const defaultState = {
    id : null,
    email: null,
    roleId: null
}

const userReducer = (state= defaultState, action) => {
    switch(action.type){
        case USER_DATA_FETCH:
        case USER_LOGIN:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                roleId: action.payload.roleId
            }
        default:
            return state
        
    }
}

export default userReducer