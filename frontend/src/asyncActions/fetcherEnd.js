import { nationsLoaded, nationsSet, nationsLoading } from "../store/NationStore"
import { rolesLoaded, rolesLoading, rolesSet } from "../store/RoleStore"
import { tankTypesLoading, tankTypesLoaded, tankTypesSet } from "../store/TankTypeStore"


export const nationFetchEnd = (data, success) => async(dispatch) => {
    if(success){
    dispatch(nationsSet(data))
    dispatch(nationsLoading(false))
    dispatch(nationsLoaded(true))
    } else {
        dispatch(nationsLoading(false))
        dispatch(nationsLoaded(false))
    }    
}

export const roleFetchEnd = (data, success) => async(dispatch) => {
    if(success){
        dispatch(rolesSet(data))
        dispatch(rolesLoading(false))
        dispatch(rolesLoaded(true))
    } else {
        dispatch(rolesLoading(false))
        dispatch(rolesLoaded(false))
    }
}

export const tankTypesFetchEnd = (data, success) => async(dispatch) => {
    if(success){
        dispatch(tankTypesSet(data))
        dispatch(tankTypesLoading(false))
        dispatch(tankTypesLoaded(true))
    } else {
        dispatch(tankTypesLoading(false))
        dispatch(tankTypesLoaded(false))
    }
}