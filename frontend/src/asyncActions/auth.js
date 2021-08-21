import axios from 'axios';
import { loadTokenAction } from '../store/TokenReducer';
import { setUserDataAction } from '../store/UserReducer';
import { authFail, authUser, authConnFail } from '../store/StatusReducer';

export const authByToken = (token) => async (dispatch) => {    
    const headers = {
        'Authorization': token
    }

    const result = await axios.get('http://localhost:4221/api/user/auth', 
    {headers: headers})
    
    
    if(result.status === 200) {
        dispatch(loadTokenAction(result.data.token))
        dispatch(setUserDataAction(result.data.user))
    }
}

export const login = (email, password) => async(dispatch) => {
    const body = {
        email: email,
        password: password
    }
    try {
        const result = await axios.post('http://localhost:4221/api/user/login',body)
        if(result.status === 200) {
            dispatch(loadTokenAction(result.data.token))
            dispatch(setUserDataAction(result.data.user))
            dispatch(authUser(true))
        }

    } catch (error){
        if(error.response) {
            if(error.response.status === 404) {
                dispatch(authFail())
            }
        }
        if(error.request) {
            dispatch(authConnFail())
        }
    }
}