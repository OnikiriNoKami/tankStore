import {
    USERS_DROP,
    USERS_LOADED,
    USERS_LOADING,
    USERS_RESET_STATUSES,
    USERS_SET,
    USERS_SET_CURRENT_PAGE,
    USERS_SET_LIMIT,
    USERS_SET_OFFSET,
    USERS_SET_TOTAL_COUNT,
    USERS_SET_TOTAL_PAGES,
} from "../actions/UserAdminActions";

const defaultState = {
    loading: false,
    loaded: null,
    users: [],
    totalCount: null,
    offset: 0,
    page: 1,
    limit: 25,
    totalPages: null
};

export const adminUsers = (state = defaultState, action) => {
    switch (action.type) {
        case USERS_SET:
            return { ...state, users: action.payload };
        case USERS_LOADING:
            return { ...state, loading: action.payload };
        case USERS_LOADED:
            return { ...state, loaded: action.payload };
        case USERS_DROP:
            return { ...state, users: [] };
        case USERS_RESET_STATUSES:
            return { ...state, loaded: null, loading: false };
        case USERS_SET_CURRENT_PAGE:
            return { ...state, page: action.payload };
        case USERS_SET_LIMIT:
            return { ...state, limit: action.payload };
        case USERS_SET_OFFSET:
            return { ...state, offset: action.payload };
        case USERS_SET_TOTAL_COUNT:
            return { ...state, totalCount: action.payload };
        case USERS_SET_TOTAL_PAGES:
            return { ...state, totalPages: action.payload };

        default:
            return state;
    }
};

export const usersSet = (payload) => ({type: USERS_SET, payload})
export const usersLoading = (payload) => ({type: USERS_LOADING, payload})
export const usersLoaded = (payload) => ({type: USERS_LOADED, payload})
export const usersDrop = () => ({type: USERS_DROP})
export const usersResetStatuses = () => ({type: USERS_RESET_STATUSES})
export const usersSetCurrentPage = (payload) => ({type: USERS_SET_CURRENT_PAGE, payload})
export const usersSetOffset = (payload) => ({type: USERS_SET_OFFSET, payload})
export const usersSetLimit = (payload) => ({type: USERS_SET_LIMIT, payload})
export const usersSetTotalCount = (payload) => ({type: USERS_SET_TOTAL_COUNT, payload})
export const usersSetTotalPages = (payload) => ({type: USERS_SET_TOTAL_PAGES, payload})
