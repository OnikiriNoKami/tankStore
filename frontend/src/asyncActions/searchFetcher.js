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
    try {
        const result = await axios.get(
            `http://localhost:4221/api/${path}/${query}`
        );
        switch (path) {
            case "nation":
                dispatch(nationFetchEnd(result.data, true));
                break;
            case "role":
                dispatch(roleFetchEnd(result.data, true));
                break;
            case "tank_type":
                dispatch(tankTypesFetchEnd(result.data, true));
                break;
            case "status":
                dispatch(tankStatusesFetchEnd(result.data, true));
                break;
            case "module_type":
                dispatch(moduleTypesFetchEnd(result.data, true));
                break;
        }
        dispatch(successMessage(true));
    } catch (error) {
        switch (path) {
            case "nation":
                dispatch(nationFetchEnd(null, false));
                break;
            case "role":
                dispatch(roleFetchEnd(null, false));
                break;
            case "tank_type":
                dispatch(tankTypesFetchEnd(null, false));
                break;
            case "status":
                dispatch(tankStatusesFetchEnd(null, false));
                break;
            case "module_type":
                dispatch(moduleTypesFetchEnd(null, false));
                break;
        }
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
