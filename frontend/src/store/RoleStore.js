import { ROLES_LOADED, ROLES_LOADING, ROLES_RESET_STATUSES, ROLES_SET, ROLES_DROP } from "../actions/RoleActions"


const defaultState = {
    loading: false,
    loaded: null,
    roles: []
}

export const roleReducer = (state=defaultState, action) => {
    switch(action.type){
        case ROLES_LOADING:
            return {...state, loading: action.payload}
        case ROLES_LOADED:
            return {...state, loaded: action.payload}
        case ROLES_DROP:
            return {...state, roles: []}
        case ROLES_SET:
            return {...state, roles: [...state.roles, action.payload]}
        case ROLES_RESET_STATUSES:
            return {...state, loading: false, loaded:null}

        default:
            return state
    }
}

export const rolesLoading = (payload) => ({type: ROLES_LOADING, payload})
export const rolesLoaded = (payload) => ({type: ROLES_LOADED, payload})
export const rolesDrop = () => ({type: ROLES_DROP})
export const rolesSet = (payload) => ({type:ROLES_SET, payload})
export const roleResetStatuses = () => ({type: ROLES_RESET_STATUSES})