import axios from 'axios';
import { dropTokenAction, loadTokenAction, tokenFromStorage } from '../store/TokenReducer';
import { logoutUserAction, setUserDataAction } from '../store/UserReducer';
import { authFail, authUser, authConnFail, authConnEstablished, authResetStatuses } from '../store/StatusReducer';
import { RemoveTokenFromStorage, SetTokenToStorage } from '../storage/tokenActions';

export const authByToken = (token) => async (dispatch) => {    
    const headers = {
        'Authorization': 'jwt '+token
    }
    try {        
        const result = await axios.get('http://localhost:4221/api/user/auth', 
        {headers: headers})
 
            dispatch(loadTokenAction(result.data.token))
            dispatch(setUserDataAction(result.data.user))
            dispatch(authUser(true, true))
            dispatch(tokenFromStorage(false))
            SetTokenToStorage(result.data.token)
        
    } catch (error){
        if(error.response) {
            if(error.response.status === 404) {
                dispatch(authFail())
                dispatch(authConnEstablished(true))
            }
        }
        if(error.request) {
            dispatch(authConnFail(false))
        }
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
            dispatch(authUser(true, true))
            dispatch(tokenFromStorage(false))
            SetTokenToStorage(result.data.token)
        }

    } catch (error){
        if(error.response) {
            if(error.response.status === 404) {
                dispatch(authFail())
                dispatch(authConnEstablished(true))
            }
        }
        if(error.request) {
            dispatch(authConnFail(false))
        }
    }
}

export const registrate = (email, password) => async(dispatch) => {
    const body = {
        email: email,
        password: password
    }
    try {
        const result = await axios.post('http://localhost:4221/api/user/registration',body)
            dispatch(loadTokenAction(result.data.token))
            dispatch(setUserDataAction(result.data.user))
            dispatch(authUser(true, true))
            dispatch(tokenFromStorage(false))
            SetTokenToStorage(result.data.token)
    } catch (error){
        if(error.response) {
            if(error.response.status === 404) {
                dispatch(authFail())
                dispatch(authConnEstablished(true))
            }
        } else if(error.request) {
            dispatch(authConnFail(false))
        }
    }
}

export const logout = () => async(dispatch) => {
    dispatch(logoutUserAction())
    dispatch(dropTokenAction())
    dispatch(authResetStatuses())
    RemoveTokenFromStorage()
}