import axios from 'axios';
import { loadTokenAction } from '../store/TokenReducer';
import { setUserDataAction } from '../store/UserReducer';


export const authByToken = (token) => async (dispatch) => {    
    const headers = {
        'Authorization': token
    }

    const result = await axios.get('http://localhost:4221/api/user/auth', 
    {headers: headers})
    
    
    return dispatch => {
        
        if (result.status === 200)
        {
            dispatch(loadTokenAction(result.data.token))
            dispatch(setUserDataAction(result.data.user))
        }
        
    }
}

export const login = (email, password) => async(dispatch) => {
    const body = {
        email: email,
        password: password
    }
    const result = await axios.post('http://localhost:4221/api/user/login',body)
    console.log(result.data)
    console.log(result.status)
    if(result.status === 200) {
        dispatch(loadTokenAction(result.data.token))
        dispatch(setUserDataAction(result.data.user))
    }
}