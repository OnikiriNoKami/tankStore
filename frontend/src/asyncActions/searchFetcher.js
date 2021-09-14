import axios from "axios";
import { failMessage, successMessage } from "../store/MessageStore";
import { nationsLoading } from "../store/NationStore";
import { rolesLoading } from "../store/RoleStore";
import { tankStatusesLoading } from "../store/TankStatusReducer";
import { tankTypesLoading } from "../store/TankTypeStore";
import { moduleTypesLoading } from "../store/ModuleTypeReducer";
import {
    moduleTypesFetchEnd,
    nationFetchEnd,
    roleFetchEnd,
    tankStatusesFetchEnd,
    tankTypesFetchEnd,
} from "./fetcherEnd";

const fetcher = (query, path) => async (dispatch) => {
    const cases ={
        'nation': (data, success) => {
            dispatch(nationFetchEnd(data, success))
        },
        'role': (data, success) => {
            dispatch(roleFetchEnd(data, success))
        },
        'tank_type': (data, success) => {
            dispatch(tankTypesFetchEnd(data, success))
        },
        'status': (data, success) => {
            dispatch(tankStatusesFetchEnd(data, success))
        },
        'module_type': (data, success) => {
            dispatch(tankStatusesFetchEnd(data, success))
        }
    }

    try {
        const result = await axios.get(
            `http://localhost:4221/api/${path}/${query}`
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
    dispatch(fetcher(query, "nation"));
};

export const roleSearch = (query) => async (dispatch) => {
    dispatch(rolesLoading(true));
    dispatch(fetcher(query, "role"));
};

export const tankTypeSearch = (query) => async (dispatch) => {
    dispatch(tankTypesLoading(true));
    dispatch(fetcher(query, "tank_type"));
};

export const tankStatusSearch = (query) => async (dispatch) => {
    dispatch(tankStatusesLoading(true));
    dispatch(fetcher(query, "status"));
};

export const moduleTypesSearch = (query) => async (dispatch) => {
    dispatch(moduleTypesLoading(true));
    dispatch(fetcher(query, "module_type"));
};
