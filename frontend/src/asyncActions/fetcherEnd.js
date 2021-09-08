import {
    moduleTypesLoaded,
    moduleTypesLoading,
    moduleTypesSet,
} from "../store/ModuleTypeReducer";
import {
    nationsLoaded,
    nationsSet,
    nationsLoading,
} from "../store/NationStore";
import { rolesLoaded, rolesLoading, rolesSet } from "../store/RoleStore";
import {
    tankStatusesLoaded,
    tankStatusesLoading,
    tankStatusesSet,
} from "../store/TankStatusReducer";
import {
    tankTypesLoading,
    tankTypesLoaded,
    tankTypesSet,
} from "../store/TankTypeStore";

export const nationFetchEnd = (data, success) => async (dispatch) => {
    if (success) {
        dispatch(nationsSet(data));
        dispatch(nationsLoading(false));
        dispatch(nationsLoaded(true));
    } else {
        dispatch(nationsLoading(false));
        dispatch(nationsLoaded(false));
    }
};

export const roleFetchEnd = (data, success) => async (dispatch) => {
    if (success) {
        dispatch(rolesSet(data));
        dispatch(rolesLoading(false));
        dispatch(rolesLoaded(true));
    } else {
        dispatch(rolesLoading(false));
        dispatch(rolesLoaded(false));
    }
};

export const tankTypesFetchEnd = (data, success) => async (dispatch) => {
    if (success) {
        dispatch(tankTypesSet(data));
        dispatch(tankTypesLoading(false));
        dispatch(tankTypesLoaded(true));
    } else {
        dispatch(tankTypesLoading(false));
        dispatch(tankTypesLoaded(false));
    }
};

export const tankStatusesFetchEnd = (data, success) => async (dispatch) => {
    if (success) {
        dispatch(tankStatusesSet(data));
        dispatch(tankStatusesLoading(false));
        dispatch(tankStatusesLoaded(true));
    } else {
        dispatch(tankStatusesLoading(false));
        dispatch(tankStatusesLoaded(false));
    }
};

export const moduleTypesFetchEnd = (data, success) => async (dispatch) => {
    if (success) {
        dispatch(moduleTypesSet(data));
        dispatch(moduleTypesLoading(false));
        dispatch(moduleTypesLoaded(true));
    } else {
        dispatch(moduleTypesLoading(false));
        dispatch(moduleTypesLoaded(false));
    }
};
