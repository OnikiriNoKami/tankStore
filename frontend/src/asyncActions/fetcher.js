import axios from "axios"
import { failMessage, successMessage } from "../store/MessageStore"
import { nationsSet } from "../store/NationStore"

export const fetcher = (path) => async(dispatch) => {
    try{
        const result = await axios.get(`http://localhost:4221/api/`+path)
        if(path==='nation'){
            dispatch(nationsSet(result.data))
        }
        dispatch(successMessage(true))
    } catch(error){
        dispatch(failMessage(true))
    }
}

export const roleFetch = () => (fetcher('role'))
export const nationFetch = () => (fetcher('nation'))
export const tankTypeFetch = () => (fetcher('tank_type'))