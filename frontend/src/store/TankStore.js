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
        id: '',
        title: '',
        description: '',
        priceSilver: '',
        priceExp: '',
        nationId: '',
        tankTypeId: '',
        statusId: '',
    },
    imagesLoading: false,
    imagesLoaded: null,
    images: [],
};

export const tankReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TANK_LOADED:
            return { ...state, loaded: action.payload };
        case TANK_LOADING:
            return { ...state, loading: action.payload };
        case TANK_SET:
            return {
                ...state,
                tank: {
                    id: action.payload.id,
                    title: action.payload.title,
                    description: action.payload.description,
                    priceSilver: action.payload.price_silver,
                    priceExp: action.payload.price_exp,
                    nationId: action.payload.nationId,
                    tankTypeId: action.payload.tankTypeId,
                    statusId: action.payload.statusId,
                },
            };
        case TANK_RESET_STATUSES:
            return { ...state, loading: false, loaded: null };
        case TANK_IMAGES_LOADED:
            return { ...state, imagesLoaded: action.payload };
        case TANK_IMAGES_LOADING:
            return { ...state, imagesLoading: action.payload };
        case TANK_IMAGES_SET:
            return { ...state, images: action.payload };
        case TANK_IMAGES_RESET_STATUSES:
            return { ...state, imagesLoading: false, imagesLoaded: null };

        default:
            return state;
    }
};

export const tankLoaded = (payload) => ({ type: TANK_LOADED, payload });
export const tankLoading = (payload) => ({ type: TANK_LOADING, payload });
export const tankSet = (payload) => ({ type: TANK_SET, payload });
export const tankResetStatuses = () => ({ type: TANK_RESET_STATUSES });
export const tankImagesLoading = (payload) => ({
    type: TANK_IMAGES_LOADING,
    payload,
});
export const tankImagesLoaded = (payload) => ({
    type: TANK_IMAGES_LOADED,
    payload,
});
export const tankImagesSet = (payload) => ({ type: TANK_IMAGES_SET, payload });
export const tankImagesResetStatuses = () => ({
    type: TANK_IMAGES_RESET_STATUSES,
});
