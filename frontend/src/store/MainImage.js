import {
    MAIN_IMAGE_DROP,
    MAIN_IMAGE_SET,
    MAIN_IMAGE_LOADING,
    MAIN_IMAGE_LOADED,
    MAIN_IMAGE_RESET_STATUSES,
    MAIN_IMAGES_DROP,
    MAIN_IMAGES_SET,
    MAIN_IMAGES_LOADING,
    MAIN_IMAGES_LOADED,
    MAIN_IMAGES_RESET_STATUSES,
} from "../actions/MainImagesActions";

const defaultState = {
    loading: false,
    loaded: null,
    image: {
        id: null,
        title: '',
        tankId: null,
    },
    imagesLoading: false,
    imagesLoaded: null,
    images: [],
};

export const mainImageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MAIN_IMAGE_SET:
            return { ...state, image: action.payload }
        case MAIN_IMAGE_LOADED:
            return { ...state, loaded: action.payload }
        case MAIN_IMAGE_LOADING:
            return { ...state, laoding: action.payload }
        case MAIN_IMAGE_RESET_STATUSES:
            return { ...state, loading: false, loaded: null}
        case MAIN_IMAGE_DROP:
            return { ...state, image: {}, loading: false, loaded: null }
        case MAIN_IMAGES_SET:
            return { ...state, images: action.payload }
        case MAIN_IMAGES_LOADING: 
            return { ...state, imagesLoading: action.payload }
        case MAIN_IMAGES_LOADED: 
            return { ...state, imagesLoaded: action.payload }
        case MAIN_IMAGES_DROP:
            return { ...state, images: [], imagesLoading: false, imagesLoaded: null}
        case MAIN_IMAGES_RESET_STATUSES:
            return { ...state, imagesLoading: false, imagesLoaded: null}
        
        
        default:
            return state;
    }
};

export const mainImageSet = (payload) => ({type: MAIN_IMAGE_SET, payload})
export const mainImageLoading = (payload) => ({type: MAIN_IMAGE_LOADING, payload})
export const mainImageLoaded = (payload) => ({type: MAIN_IMAGE_LOADED, payload})
export const mainImageDrop = () => ({type: MAIN_IMAGE_DROP})
export const mainImageResetStatuses = () => ({type: MAIN_IMAGE_RESET_STATUSES})

export const mainImagesSet = (payload) => ({type: MAIN_IMAGES_SET, payload})
export const mainImagesLoading = (payload) => ({type: MAIN_IMAGES_LOADING, payload})
export const mainImagesLoaded = (payload) => ({type: MAIN_IMAGES_LOADED, payload})
export const mainImagesDrop = () => ({type: MAIN_IMAGES_DROP})
export const mainImagesResetStatuses = () => ({type: MAIN_IMAGES_RESET_STATUSES})




