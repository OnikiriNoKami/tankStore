import axios from "axios";
import { failMessage, successMessage } from "../store/MessageStore";
import { nationsLoading } from "../store/NationStore";
import { rolesLoading } from "../store/RoleStore";
import { tankTypesLoading } from "../store/TankTypeStore";
import { tankStatusesLoading } from "../store/TankStatusReducer";
import {
    moduleTypesFetchEnd,
    nationFetchEnd,
    roleFetchEnd,
    tankStatusesFetchEnd,
    tankTypesFetchEnd,
    usersFetchEnd,
    userByIdFetchEnd,
} from "./fetcherEnd";
import { moduleTypesLoading } from "../store/ModuleTypeReducer";
import { usersLoading } from "../store/AdminUsers";
import { usersByIdLoading } from "../store/AdminUsers";
import {
    ROLE_PATH,
    NATION_PATH,
    TANK_TYPE_PATH,
    STATUS_PATH,
    MODULE_TYPE_PATH,
    GET_USERS_PATH,
    GET_USER_BY_ID_PATH,
} from "../utils/routes";

const defPagination = {
    used: false,
    offset: null,
    limit: null,
};

const fetcher =
    (path, pagination = defPagination, token = null, params = null) =>
    async (dispatch) => {
        const headers = {
            Authorization: "jwt " + token,
        };
        const cases = {
            [NATION_PATH]: (data, success) => {
                dispatch(nationFetchEnd(data, success));
            },
            [ROLE_PATH]: (data, success) => {
                dispatch(roleFetchEnd(data, success));
            },
            [TANK_TYPE_PATH]: (data, success) => {
                dispatch(tankTypesFetchEnd(data, success));
            },
            [STATUS_PATH]: (data, success) => {
                dispatch(tankStatusesFetchEnd(data, success));
            },
            [MODULE_TYPE_PATH]: (data, success) => {
                dispatch(moduleTypesFetchEnd(data, success));
            },
            [GET_USERS_PATH]: (data, success) => {
                dispatch(usersFetchEnd(data, success));
            },
            [GET_USER_BY_ID_PATH]: (data, success) => {
                dispatch(userByIdFetchEnd(data, success));
            },
        };
        try {
            const result = await axios.get(
                `http://localhost:4221/api/` +
                    path +
                    (params ? params : "") +
                    (pagination.used
                        ? `?limit=${pagination.limit}&offset=${pagination.offset}`
                        : ""),
                { headers: headers }
            );
            cases[path](result.data, true);
            dispatch(successMessage(true));
        } catch (error) {
            cases[path](null, false);
            dispatch(failMessage(true));
        }
    };

export const nationFetch = () => async (dispatch) => {
    dispatch(nationsLoading(true));
    dispatch(fetcher(NATION_PATH));
};

export const roleFetch = () => async (dispatch) => {
    dispatch(rolesLoading(true));
    dispatch(fetcher(ROLE_PATH));
};

export const tankTypeFetch = () => async (dispatch) => {
    dispatch(tankTypesLoading(true));
    dispatch(fetcher(TANK_TYPE_PATH));
};

export const tankStatusFetch = () => async (dispatch) => {
    dispatch(tankStatusesLoading(true));
    dispatch(fetcher(STATUS_PATH));
};

export const moduleTypesFetch = () => async (dispatch) => {
    dispatch(moduleTypesLoading(true));
    dispatch(fetcher(MODULE_TYPE_PATH));
};

export const usersFetch = (limit, offset, token) => async (dispatch) => {
    dispatch(usersLoading(true));
    dispatch(fetcher(GET_USERS_PATH, { used: true, limit, offset }, token));
};

export const userByIdFetch = (id, token) => async (dispatch) => {
    dispatch(usersByIdLoading(true));
    dispatch(fetcher(GET_USER_BY_ID_PATH, { token: token, params: id }));
};
