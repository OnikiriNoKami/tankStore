import axios from "axios"
import { failMessage, successMessage } from "../store/MessageStore"
import { USER_ROLES_PATH } from "../utils/routes"

const deleter = (data, path, token) => async(dispatch) => {
    const headers = {
        'Authorization': 'jwt '+ token
    }
    const body = {
        ...data
    }
    try{
        const result = await axios.delete(`http://localhost:4221/api/`+path,body,{headers: headers})
        console.log(result.status)
        dispatch(successMessage(true))
    } catch(error){
        dispatch(failMessage(true))
    }
}

export const removeRoleFromUser = (userId, roleId, token) => (deleter({id: userId, role:roleId}, USER_ROLES_PATH, token))