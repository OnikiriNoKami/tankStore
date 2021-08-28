import { NATION_LOADING, NATION_LOADED, NATION_DROP, NATION_SET, NATION_RESET_STATUSES } from "../actions/NationActions"


const defaultState = {
    loading: false,
    loaded: null,
    nations: []
}

export const nationReducer = (state=defaultState, action) => {
    switch(action.type){
        case NATION_LOADING:
            return {...state, loading: action.payload}
        case NATION_LOADED:
            return {...state, loaded: action.payload}
        case NATION_DROP:
            return {...state, nations: []}
        case NATION_SET:
            return {...state, nations: [...state.nations, action.payload]}
        case NATION_RESET_STATUSES:
            return {...state, loading: false, loaded:null}

        default:
            return state
    }
}

export const nationsLoading = (payload) => ({type: NATION_LOADING, payload})
export const nationsLoaded = (payload) => ({type: NATION_LOADED, payload})
export const nationsDrop = () => ({type: NATION_DROP})
export const nationsSet = (payload) => ({type: NATION_SET, payload})
export const nationsResetStatuses = () => ({type: NATION_RESET_STATUSES})