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
import {
    usersSet,
    usersLoading,
    usersLoaded,
    usersSetTotalCount,
} from "../store/AdminUsers";
import {
    usersByIdLoading,
    usersByIdLoaded,
    usersSetUserById,
} from "../store/AdminUsers";
import { tanksLoaded, tanksLoading, tanksSet, tanksSetTotalCount } from "../store/TanksStore";
import { tankImagesLoaded, tankImagesLoading, tankImagesSet, tankLoaded, tankLoading, tankSet } from "../store/TankStore";

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

export const usersFetchEnd = (data, success) => async (dispatch) => {
    if (success) {
        dispatch(usersSet(data.rows));
        dispatch(usersSetTotalCount(data.count));
        dispatch(usersLoading(false));
        dispatch(usersLoaded(true));
    } else {
        dispatch(usersLoading(false));
        dispatch(usersSetTotalCount(null));
        dispatch(usersLoaded(false));
    }
};

export const userByIdFetchEnd = (data, success) => async (dispatch) => {
    if (success) {
        dispatch(usersSetUserById(data));
        dispatch(usersByIdLoading(false));
        dispatch(usersByIdLoaded(true));
    } else {
        dispatch(usersByIdLoading(false));
        dispatch(usersByIdLoaded(false));
    }
};

export const tanksFetchEnd = (data, success) => async (dispatch) => {
    if(success){
        dispatch(tanksSet(data.rows));
        dispatch(tanksSetTotalCount(data.count));
        dispatch(tanksLoading(false));
        dispatch(tanksLoaded(true));
    } else {
        dispatch(tanksLoading(false));
        dispatch(tanksSetTotalCount(null));
        dispatch(tanksLoaded(false));
    }
}

export const tankByIdFetchEnd = (data, success) => async (dispatch) => {
    if(success) {
        dispatch(tankSet(data));
        dispatch(tankLoading(false));
        dispatch(tankLoaded(true));
    } else {
        dispatch(tankLoaded(false));
        dispatch(tankLoading(false));
    }
}

export const imagesFetchEnd = (data, success) => (dispatch) => {
    if(success){
        dispatch(tankImagesSet(data))
        dispatch(tankImagesLoading(false));
        dispatch(tankImagesLoaded(true));

    } else {
        dispatch(tankImagesLoaded(false));
        dispatch(tankImagesLoading(false));
    }
}
