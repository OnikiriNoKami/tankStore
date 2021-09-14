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
} from "./fetcherEnd";
import { moduleTypesLoading } from "../store/ModuleTypeReducer";
import { usersLoading } from "../store/AdminUsers";

const defPagination = {
    used: false,
    offset: null,
    limit: null,
};

const fetcher = (path,pagination = defPagination, token=null) => async (dispatch) => {
        const headers = {
            Authorization: 'jwt ' + token
        }
        const cases = {
            nation: (data, success) => {
                dispatch(nationFetchEnd(data, success));
            },
            role: (data, success) => {
                dispatch(roleFetchEnd(data, success));
            },
            tank_type: (data, success) => {
                dispatch(tankTypesFetchEnd(data, success));
            },
            status: (data, success) => {
                dispatch(tankStatusesFetchEnd(data, success));
            },
            module_type: (data, success) => {
                dispatch(moduleTypesFetchEnd(data, success));
            },
            "user/users/": (data, success) => {
                dispatch(usersFetchEnd(data, success));
            },
        };
        try {
            const result = await axios.get(`http://localhost:4221/api/` + path +
                    (pagination.used
                        ? `?limit=${pagination.limit}&offset=${pagination.offset}`
                        : ""), 
                {headers: headers});
            cases[path](result.data, true);
            dispatch(successMessage(true));
        } catch (error) {
            cases[path](null, false);
            dispatch(failMessage(true));
        }
    };

export const nationFetch = () => async (dispatch) => {
    dispatch(nationsLoading(true));
    dispatch(fetcher("nation"));
};

export const roleFetch = () => async (dispatch) => {
    dispatch(rolesLoading(true));
    dispatch(fetcher("role"));
};

export const tankTypeFetch = () => async (dispatch) => {
    dispatch(tankTypesLoading(true));
    dispatch(fetcher("tank_type"));
};

export const tankStatusFetch = () => async (dispatch) => {
    dispatch(tankStatusesLoading(true));
    dispatch(fetcher("status"));
};

export const moduleTypesFetch = () => async (dispatch) => {
    dispatch(moduleTypesLoading(true));
    dispatch(fetcher("module_type"));
};

export const usersFetch = (limit, offset, token) => async (dispatch) => {
    dispatch(usersLoading(true));
    dispatch(
        fetcher("user/users/", { used: true, limit, offset }, token)
    );
};
