import { TANK_TYPE_LOADED, TANK_TYPE_LOADING, TANK_TYPE_RESET_STATUSES, TANK_TYPE_SET, TANK_TYPE_DROP } from "../actions/TankTypeActions"


const defaultState = {
    loading: false,
    loaded: null,
    tankTypes: []
}

export const tankTypeReducer = (state=defaultState, action) => {
    switch(action.type){
        case TANK_TYPE_LOADING:
            return {...state, loading: action.payload}
        case TANK_TYPE_LOADED:
            return {...state, loaded: action.payload}
        case TANK_TYPE_DROP:
            return {...state, tankTypes: []}
        case TANK_TYPE_SET:
            return {...state, tankTypes: action.payload}
        case TANK_TYPE_RESET_STATUSES:
            return {...state, loading: false, loaded:null}

        default:
            return state
    }
}

export const tankTypesLoading = (payload) => ({type: TANK_TYPE_LOADING, payload})
export const tankTypesLoaded = (payload) => ({type: TANK_TYPE_LOADED, payload})
export const tankTypesDrop = () => ({type: TANK_TYPE_DROP})
export const tankTypesSet = (payload) => ({type: TANK_TYPE_SET, payload})
export const tankTypesStatuses = () => ({type: TANK_TYPE_RESET_STATUSES})