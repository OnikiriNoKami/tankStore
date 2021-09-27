import {
    TANK_IMAGES_LOADED,
    TANK_IMAGES_LOADING,
    TANK_IMAGES_SET,
    TANK_SET,
    TANK_LOADED,
    TANK_LOADING,
    TANK_RESET_STATUSES,
    TANK_IMAGES_RESET_STATUSES,
} from "../actions/TanksActions";

const defaultState = {    
        loading: false,
        loaded: null,
        tank: {
            id: null,
            title: null,
            description: null,
            priceSilver: null,
            priceExp: null,
            nationId: null,
            tankTypeId: null,
            statusId: null,
        },
        imagesLoading: false,
        imagesLoaded: null,
        images: [],
};

export const tankReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TANK_LOADED: 
            return { ...state, tank: { ...state.tank, loaded: action.payload}}
        case TANK_LOADING:
            return { ...state, tank: { ...state.tank, loading: action.payload}}
        case TANK_SET:
            return { ...state, tank: { ...state.tank, tank:{...action.payload}}}
        case TANK_RESET_STATUSES:
            return { ...state, tank: { ...state.tank, loading: false, loaded: null}}
        case TANK_IMAGES_LOADED: 
            return { ...state, tank: { ...state.tank, loaded: action.payload}}
        case TANK_IMAGES_LOADING:
            return { ...state, tank: { ...state.tank, loading: action.payload}}
        case TANK_IMAGES_SET:
            return { ...state, tank: { ...state.tank, images: action.payload}}
        case TANK_IMAGES_RESET_STATUSES:
            return { ...state, tank: { ...state.tank, loading: false, loaded: null}}

        default:
            return state;
    }
};

export const tankLoaded = (payload) => ({type: TANK_LOADED, payload})
export const tankLoading = (payload) => ({type: TANK_LOADING, payload})
export const tankSet = (payload) => ({type: TANK_SET, payload})
export const tankResetStatuses = () => ({type: TANK_RESET_STATUSES})
export const tankImagesLoading = (payload) => ({type: TANK_IMAGES_LOADING, payload})
export const tankImagesLoaded = (payload) => ({type: TANK_IMAGES_LOADED, payload})
export const tankImagesSet = (payload) => ({type: TANK_IMAGES_SET, payload})
export const tankImagesResetStatuses = () => ({type: TANK_IMAGES_RESET_STATUSES})
