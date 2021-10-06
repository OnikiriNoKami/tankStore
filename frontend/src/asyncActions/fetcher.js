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
    tankByIdFetchEnd,
    tankImagesFetchEnd,
    tanksFetchEnd,
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
    TANK_PATH,
    IMAGE_PATH,
    TANKS_PATH,
} from "../utils/routes";
import { tankImagesLoading, tankLoading } from "../store/TankStore";
import { tanksLoading } from "../store/TanksStore";

const defPagination = {
    used: false,
    offset: null,
    limit: null,
};

const fetcher =
    (path = "", pathFull = "", headers = {}) =>
    async (dispatch) => {
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
            [TANK_PATH]: (data, success) => {
                dispatch(tankByIdFetchEnd(data, success));
            },
            [IMAGE_PATH]: (data, success) => {
                dispatch(tankImagesFetchEnd(data, success));
            },
            [TANKS_PATH]: (data, success) => {
                dispatch(tanksFetchEnd(data, success));
            }

        };
        try {
            const result = await axios.get(
                `http://localhost:4221/api/` + pathFull,
                { headers: headers }
            );
            cases[path](result.data, true);
            //dispatch(successMessage(true));
        } catch (error) {
            cases[path](null, false);
            dispatch(failMessage(true));
        }
    };

export const nationFetch = () => async (dispatch) => {
    dispatch(nationsLoading(true));
    dispatch(fetcher(NATION_PATH, NATION_PATH));
};

export const roleFetch = () => async (dispatch) => {
    dispatch(rolesLoading(true));
    dispatch(fetcher(ROLE_PATH, ROLE_PATH));
};

export const tankTypeFetch = () => async (dispatch) => {
    dispatch(tankTypesLoading(true));
    dispatch(fetcher(TANK_TYPE_PATH, TANK_TYPE_PATH));
};

export const tankStatusFetch = () => async (dispatch) => {
    dispatch(tankStatusesLoading(true));
    dispatch(fetcher(STATUS_PATH, STATUS_PATH));
};

export const moduleTypesFetch = () => async (dispatch) => {
    dispatch(moduleTypesLoading(true));
    dispatch(fetcher(MODULE_TYPE_PATH, MODULE_TYPE_PATH));
};

export const usersFetch = (limit, offset, token) => async (dispatch) => {
    const fullPath = `${GET_USERS_PATH}/?limit=${limit}&offset=${offset}`;
    const headers = {
        Authorization: "jwt " + token,
    };
    dispatch(usersLoading(true));
    dispatch(fetcher(GET_USERS_PATH, fullPath, headers));
};

export const userByIdFetch = (id, token) => async (dispatch) => {
    const fullPath = `${GET_USER_BY_ID_PATH}/${id}`;
    const headers = {
        Authorization: "jwt " + token,
    };
    dispatch(usersByIdLoading(true));
    dispatch(fetcher(GET_USER_BY_ID_PATH, fullPath, headers));
};

export const tankByIdFetch = (id) => async (dispatch) => {
    const fullPath = `${TANK_PATH}/${id}`;
    dispatch(tankLoading(true));
    dispatch(fetcher(TANK_PATH, fullPath));
};

export const tanksFetch = (limit, offset) => async (dispatch) => {
    const fullPath = `${TANK_PATH}/?limit=${limit}&offset=${offset}`
    dispatch(tanksLoading(true));
    dispatch(fetcher(TANKS_PATH, fullPath));
};

export const tankImagesFetch = (tankId) => async (dispatch) => {
    const fullPath = `${IMAGE_PATH}/${tankId}`;
    dispatch(tankImagesLoading(true));
    dispatch(fetcher(IMAGE_PATH, fullPath));
};
