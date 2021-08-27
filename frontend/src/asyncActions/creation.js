import axios from "axios"
import { failMessage, successMessage } from "../store/MessageStore"


export const createNation = (title, token) => async(dispatch) => {
    console.log('in')
    const headers = {
        'Authorization': 'jwt '+ token
    }
    const body = {
        title: title
    }
    try{
        const result = await axios.post('http://localhost:4221/api/nation',body,{headers: headers})
        dispatch(successMessage(true))

    } catch(error){
        dispatch(failMessage(true))
    }

}