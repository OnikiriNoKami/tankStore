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
    tanksFetchEnd,
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
    GET_USERS_BY_QUERY,
    TANK_PATH
} from "../utils/routes";
import { tanksLoading } from "../store/TanksStore";

const fetcher = (path, pathFull, token=null) => async (dispatch) => {
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
        [TANK_PATH]: (data, success)=>{
            dispatch(tanksFetchEnd(data, success));
        },
    };

    try {
        const result = await axios.get(
            `http://localhost:4221/api/${pathFull}`,
            {headers: headers}
        );
        cases[path](result.data, true)
        //dispatch(successMessage(true));
    } catch (error) {
        cases[path](null, false)
        dispatch(failMessage(true));
    }
};




export const nationSearch = (query) => async (dispatch) => {
    const pathFull = `${NATION_PATH}/${query}`;
    dispatch(nationsLoading(true));
    dispatch(fetcher(NATION_PATH, pathFull));
};

export const roleSearch = (query) => async (dispatch) => {
    const pathFull = `${ROLE_PATH}/${query}`;
    dispatch(rolesLoading(true));
    dispatch(fetcher(ROLE_PATH, pathFull));
};

export const tankTypeSearch = (query) => async (dispatch) => {
    const pathFull = `${TANK_TYPE_PATH}/${query}`;
    dispatch(tankTypesLoading(true));
    dispatch(fetcher(TANK_TYPE_PATH, pathFull));
};

export const tankStatusSearch = (query) => async (dispatch) => {
    const pathFull = `${STATUS_PATH}/${query}`;
    dispatch(tankStatusesLoading(true));
    dispatch(fetcher(STATUS_PATH, pathFull));
};

export const moduleTypesSearch = (query) => async (dispatch) => {
    const pathFull = `${MODULE_TYPE_PATH}/${query}`;
    dispatch(moduleTypesLoading(true));
    dispatch(fetcher(MODULE_TYPE_PATH, pathFull));
};

export const usersSearch = (query, limit, offset, token) => async (dispatch) => {
    const pathFull = `${GET_USERS_BY_QUERY}/${query}?limit=${limit}&offset=${offset}`;
    dispatch(usersLoading(true));
    dispatch(fetcher(GET_USERS_BY_QUERY, pathFull, token));
};

export const tanksFilterGet = (filter, limit, offset) => async(dispatch) => {
    const pathMain = `${TANK_PATH}/?limit=${limit}&offset=${offset}`
    let pathFilter = ''
    for(let field of filter){
        pathFilter += `&${field.key}=${field.value}`
    }
    dispatch(tanksLoading(true));
    dispatch(fetcher(TANK_PATH, pathMain+pathFilter))
}


