import axios from "axios"
import { failMessage, successMessage } from "../store/MessageStore"
import { nationsLoaded, nationsSet, nationsLoading } from "../store/NationStore"

const nationFetchEnd = (data) => async(dispatch) => {
    dispatch(nationsSet(data))
    dispatch(nationsLoading(false))
    dispatch(nationsLoaded(true))
}

export const fetcher = (path) => async(dispatch) => {
    try{
        const result = await axios.get(`http://localhost:4221/api/`+path)
        switch(path){
            case 'nation':
                dispatch(nationFetchEnd(result.data))
                break

        }
        dispatch(successMessage(true))

    } catch(error){
        switch(path){
            case 'nation':
                dispatch(nationsLoading(false))
                dispatch(nationsLoaded(false))
                break
                
        }
        dispatch(failMessage(true))
    }
}

export const nationFetch= () => async (dispatch) => {

    dispatch(nationsLoading(true))
    dispatch(fetcher('nation'))
}

export const roleFetch = () => (fetcher('role'))
//export const nationFetch = () => (fetcher('nation'))
export const tankTypeFetch = () => (fetcher('tank_type'))