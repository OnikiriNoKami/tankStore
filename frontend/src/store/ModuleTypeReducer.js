import {
    MODULE_TYPES_LOADED,
    MODULE_TYPES_LOADING,
    MODULE_TYPES_RESET_STATUSES,
    MODULE_TYPES_SET,
    MODULE_TYPES_DROP,
} from "../actions/ModuleTypeActions";

const defaultState = {
    loading: false,
    loaded: null,
    moduleTypes: [],
};

export const moduleTypeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MODULE_TYPES_LOADING:
            return { ...state, loading: action.payload };
        case MODULE_TYPES_LOADED:
            return { ...state, loaded: action.payload };
        case MODULE_TYPES_DROP:
            return { ...state, moduleTypes: [] };
        case MODULE_TYPES_SET:
            return { ...state, moduleTypes: action.payload };
        case MODULE_TYPES_RESET_STATUSES:
            return { ...state, loading: false, loaded: null };

        default:
            return state;
    }
};

export const moduleTypesLoading = (payload) => ({type: MODULE_TYPES_LOADING, payload})
export const moduleTypesLoaded = (payload) => ({type: MODULE_TYPES_LOADED, payload})
export const moduleTypesDrop = () => ({type: MODULE_TYPES_DROP})
export const moduleTypesSet = (payload) => ({type: MODULE_TYPES_SET, payload})
export const moduleTypesResetStatus = () => ({type: MODULE_TYPES_RESET_STATUSES})
