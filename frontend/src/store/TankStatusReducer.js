import {
    TANK_STATUS_SET,
    TANK_STATUS_LOADED,
    TANK_STATUS_LOADING,
    TANK_STATUS_DROP,
    TANK_STATUS_RESET_STATUS,
} from "../actions/TankStatusActions";

const defaultState = {
    loading: false,
    loaded: null,
    statuses: [],
};

export const tankStatusReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TANK_STATUS_LOADING:
            return { ...state, loading: action.payload };
        case TANK_STATUS_LOADED:
            return { ...state, loaded: action.payload };
        case TANK_STATUS_DROP:
            return { ...state, statuses: [] };
        case TANK_STATUS_SET:
            return { ...state, statuses: action.payload };
        case TANK_STATUS_RESET_STATUS:
            return { ...state, loading: false, loaded: null };

        default:
            return state;
    }
};


export const tankStatusesLoaded = (payload) => ({type: TANK_STATUS_LOADED, payload})
export const tankStatusesLoading = (payload) => ({type: TANK_STATUS_LOADING, payload})
export const tankStatusesSet = (payload) => ({type: TANK_STATUS_SET, payload})
export const tankStatusesDrop = () => ({type: TANK_STATUS_DROP})
export const tankStatusesReset = () => ({type: TANK_STATUS_RESET_STATUS})
