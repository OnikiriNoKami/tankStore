import {
    TANKS_LOADED,
    TANKS_LOADING,
    TANKS_SET,
    TANKS_SET_LIMIT,
    TANKS_SET_OFFSET,
    TANKS_SET_PAGE,
    TANKS_SET_TOTAL_COUNT,
    TANKS_SET_TOTAL_PAGES,
    TANKS_RESET_STATUSES
} from "../actions/TanksActions";

const defaultState = {
        loading: false,
        loaded: null,
        tanks: [],
        totalCount: null,
        offset: 0,
        page: 1,
        limit: 25,
        totalPages: null,
};

export const tanksReducer = (state = defaultState, action) => {
    switch (action.type) {
        case TANKS_LOADING:
            return { ...state, loading: action.payload };
        case TANKS_LOADED:
            return { ...state, loaded: action.payload };
        case TANKS_SET:
            return { ...state, tanks: action.payload };
        case TANKS_SET_TOTAL_COUNT:
            return { ...state, totalCount: action.payload,
            };
        case TANKS_SET_OFFSET:
            return { ...state, offset: action.payload };
        case TANKS_SET_PAGE:
            return { ...state, page: action.payload };
        case TANKS_SET_LIMIT:
            return { ...state, limit: action.payload };
        case TANKS_SET_TOTAL_PAGES:
            return { ...state, totalPages: action.payload,
            };
        case TANKS_RESET_STATUSES:
            return { ...state, loading: false, loaded: null,
            };
        default:
            return state;
    }
};

export const tanksLoaded = (payload) => ({type: TANKS_LOADED, payload})
export const tanksLoading = (payload) => ({type: TANKS_LOADING, payload})
export const tanksSet = (payload) => ({type: TANKS_SET, payload})
export const tanksResetStatuses = () => ({type: TANKS_RESET_STATUSES})
export const tanksSetTotalCount = (payload) => ({type: TANKS_SET_TOTAL_COUNT, payload})
export const tanksSetTotalPages = (payload) => ({type: TANKS_SET_TOTAL_PAGES, payload})
export const tanksSetOffset = (payload) => ({type: TANKS_SET_OFFSET, payload})
export const tanksSetPage = (payload) => ({type: TANKS_SET_PAGE, payload})
export const tanksSetLimit = (payload) => ({type: TANKS_SET_LIMIT, payload})
