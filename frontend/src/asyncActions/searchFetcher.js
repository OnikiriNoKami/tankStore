import axios from "axios";
import { failMessage, successMessage } from "../store/MessageStore";
import { nationsLoading } from "../store/NationStore";
import { rolesLoading } from "../store/RoleStore";
import { tankStatusesLoading } from "../store/TankStatusReducer";
import { tankTypesLoading } from "../store/TankTypeStore";
import { moduleTypesLoading } from "../store/ModuleTypeReducer";
import { usersLoading } from "../store/AdminUsers";
import {
    moduleTypesFetchEnd,
    nationFetchEnd,
    roleFetchEnd,
    tankStatusesFetchEnd,
    tankTypesFetchEnd,
    usersFetchEnd
} from "./fetcherEnd";

import {
    ROLE_PATH,
    NATION_PATH,
    TANK_TYPE_PATH,
    STATUS_PATH,
    MODULE_TYPE_PATH,
    GET_USERS_BY_QUERY
} from "../utils/routes";

const defPagination = {
    used: false,
    offset: null,
    limit: null,
};

const fetcher = (query, path, pagination=defPagination, token=null) => async (dispatch) => {
    const headers = {
        Authorization: 'jwt '+ token
    }
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
        [GET_USERS_BY_QUERY]: (data, success) => {
            dispatch(usersFetchEnd(data, success));
        },
    };

    try {
        const result = await axios.get(
            `http://localhost:4221/api/${path}/${query}`+ 
            (pagination.used? `?limit=${pagination.limit}&offset=${pagination.offset}`
            : ""), 
            {headers: headers}
        );
        cases[path](result.data, true)
        dispatch(successMessage(true));
    } catch (error) {
        cases[path](null, false)
        dispatch(failMessage(true));
    }
};

export const nationSearch = (query) => async (dispatch) => {
    dispatch(nationsLoading(true));
    dispatch(fetcher(query, NATION_PATH));
};

export const roleSearch = (query) => async (dispatch) => {
    dispatch(rolesLoading(true));
    dispatch(fetcher(query, ROLE_PATH));
};

export const tankTypeSearch = (query) => async (dispatch) => {
    dispatch(tankTypesLoading(true));
    dispatch(fetcher(query, TANK_TYPE_PATH));
};

export const tankStatusSearch = (query) => async (dispatch) => {
    dispatch(tankStatusesLoading(true));
    dispatch(fetcher(query, STATUS_PATH));
};

export const moduleTypesSearch = (query) => async (dispatch) => {
    dispatch(moduleTypesLoading(true));
    dispatch(fetcher(query, MODULE_TYPE_PATH));
};

export const usersSearch = (query, limit, offset, token) => async (dispatch) => {
    dispatch(usersLoading(true));
    dispatch(
        fetcher(query, GET_USERS_BY_QUERY, { used: true, limit, offset }, token)
    );
};
