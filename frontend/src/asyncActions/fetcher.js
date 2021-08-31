import axios from "axios"
import { failMessage, successMessage } from "../store/MessageStore"
import { nationsLoaded, nationsSet, nationsLoading } from "../store/NationStore"
import { rolesLoaded, rolesLoading, rolesSet } from "../store/RoleStore"
import { tankTypesLoading, tankTypesLoaded, tankTypesSet } from "../store/TankTypeStore"

const nationFetchEnd = (data, success) => async(dispatch) => {
    if(success){
    dispatch(nationsSet(data))
    dispatch(nationsLoading(false))
    dispatch(nationsLoaded(true))
    } else {
        dispatch(nationsLoading(false))
        dispatch(nationsLoaded(false))
    }    
}

const roleFetchEnd = (data, success) => async(dispatch) => {
    if(success){
        dispatch(rolesSet(data))
        dispatch(rolesLoading(false))
        dispatch(rolesLoaded(true))
    } else {
        dispatch(rolesLoading(false))
        dispatch(rolesLoaded(false))
    }
}

const tankTypesFetchEnd = (data, success) => async(dispatch) => {
    if(success){
        dispatch(tankTypesSet(data))
        dispatch(tankTypesLoading(false))
        dispatch(tankTypesLoaded(true))
    } else {
        dispatch(tankTypesLoading(false))
        dispatch(tankTypesLoaded(false))
    }
}

export const fetcher = (path) => async(dispatch) => {
    try{
        const result = await axios.get(`http://localhost:4221/api/`+path)
        switch(path){
            case 'nation':
                dispatch(nationFetchEnd(result.data, true))
                break
            case 'role':
                dispatch(roleFetchEnd(result.data, true))
                break
            case 'tank_type':
                dispatch(tankTypesFetchEnd(result.data, true))
                break

        }
        dispatch(successMessage(true))

    } catch(error){
        switch(path){
            case 'nation':
                dispatch(nationFetchEnd(null, false))
                break
            case 'role':
                dispatch(roleFetchEnd(null, false))
                break
            case 'tank_type':
                dispatch(tankTypesFetchEnd(null, false))
                break
                
        }
        dispatch(failMessage(true))
    }
}

export const nationFetch= () => async (dispatch) => {

    dispatch(nationsLoading(true))
    dispatch(fetcher('nation'))
}

export const roleFetch = () => async (dispatch) => {
    dispatch(rolesLoading(true))
    dispatch(fetcher('role'))
}

export const tankTypeFetch = () => async (dispatch) => {
    dispatch(tankTypesLoading(true))
    dispatch(fetcher('tank_type'))
}

//export const roleFetch = () => (fetcher('role'))
//export const nationFetch = () => (fetcher('nation'))
//export const tankTypeFetch = () => (fetcher('tank_type'))