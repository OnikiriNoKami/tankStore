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
    USERS_SET_USER_BY_ID,
    USERS_BY_ID_LOADED,
    USERS_BY_ID_LOADING,
    USERS_BY_ID_RESET_STATUSES
} from "../actions/UserAdminActions";

const defaultState = {
    loading: false,
    loaded: null,
    users: [],
    userById: {
        id: null,
        email: null,
        roles: []
    },
    userByIdLoading: false,
    userByIdLoaded: null,
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
        case USERS_BY_ID_LOADING:
            return { ...state, userByIdLoading: action.payload}
        case USERS_BY_ID_LOADED:
            return { ...state, userByIdLoaded: action.payload}
        case USERS_BY_ID_RESET_STATUSES:
            return { ...state, userByIdLoading: false, userByIdLoaded: null}
        case USERS_SET_USER_BY_ID:
            return { ...state, userById: {id: action.payload.id, email: action.payload.email, roles: action.payload.roles}}

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
export const usersSetUserById = (payload) => ({type: USERS_SET_USER_BY_ID, payload})
export const usersByIdLoading = (payload) => ({type: USERS_BY_ID_LOADING, payload})
export const usersByIdLoaded = (payload) => ({type: USERS_BY_ID_LOADED, payload})
export const usersByIdResetStatuses = (payload) => ({type: USERS_BY_ID_RESET_STATUSES})
