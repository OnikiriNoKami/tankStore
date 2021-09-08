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
} from "./fetcherEnd";
import { moduleTypesLoading } from "../store/ModuleTypeReducer";

const fetcher = (path) => async (dispatch) => {
    try {
        const result = await axios.get(`http://localhost:4221/api/` + path);
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

export const moduleTypesFetch = () => async(dispatch) => {
    dispatch(moduleTypesLoading(true));
    dispatch(fetcher('module_type'));
};
