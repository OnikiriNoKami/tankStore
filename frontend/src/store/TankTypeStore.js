import { TANK_TYPE_LOADED, TANK_TYPE_LOADING, TANK_TYPE_RESET_STATUSES, TANK_TYPE_SET, TANK_TYPE_DROP } from "../actions/RoleActions"


const defaultState = {
    loading: false,
    loaded: null,
    tankTypes: []
}

export const roleReducer = (state=defaultState, action) => {
    switch(action.type){
        case TANK_TYPE_LOADING:
            return {...state, loading: action.payload}
        case TANK_TYPE_LOADED:
            return {...state, loaded: action.payload}
        case TANK_TYPE_DROP:
            return {...state, tankTypes: []}
        case TANK_TYPE_SET:
            return {...state, tankTypes: [...state.tankTypes, action.payload]}
        case TANK_TYPE_RESET_STATUSES:
            return {...state, loading: false, loaded:null}

        default:
            return state
    }
}

export const tankTypesLoading = (payload) => ({type: ROLES_LOADING, payload})
export const tankTypesLoaded = (payload) => ({type: ROLES_LOADED, payload})
export const tankTypesDrop = () => ({type: ROLES_DROP})
export const tankTypesSet = (payload) => ({type:ROLES_SET, payload})
export const tankTypesStatuses = () => ({type: ROLES_RESET_STATUSES})