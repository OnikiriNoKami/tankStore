import axios from "axios"
import { failMessage, successMessage } from "../store/MessageStore"

export const updater = (data, path, token) => async(dispatch) => {
    const headers = {
        'Authorization': 'jwt '+ token
    }
    const body = {
        ...data
    }
    try{
        const result = await axios.put(`http://localhost:4221/api/`+path,body,{headers: headers})
        dispatch(successMessage(true))
    } catch(error){
        dispatch(failMessage(true))
    }
}

export const roleUpdater = (id, title, description, token) => (updater({id, title, description}, 'role', token))
export const nationUpdater = (id, title, token) => (updater({id, title}), 'nation', token)
export const tankTypeUpdater = (id, title, title_short, token) => (updater({id, title, title_short}, 'tank_type', token))