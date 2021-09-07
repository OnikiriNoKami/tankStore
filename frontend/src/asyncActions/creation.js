import axios from "axios"
import { failMessage, successMessage } from "../store/MessageStore"

const creator = (data, path, token) => async(dispatch) => {
    const headers = {
        'Authorization': 'jwt '+ token
    }
    const body = {
        ...data
    }
    try{
        const result = await axios.post(`http://localhost:4221/api/`+path,body,{headers: headers})
        console.log(result.status)
        dispatch(successMessage(true))
    } catch(error){
        dispatch(failMessage(true))
    }
}

export const roleCreate = (title, description, token) => (creator({title, description}, 'role', token))
export const nationCreate = (title, token) => (creator({title}, 'nation', token))
export const tankTypeCreate = (title, title_short, token) => (creator({title, title_short}, 'tank_type', token))
export const tankStatusCreate = (title, token) => (creator({title}, 'status', token))