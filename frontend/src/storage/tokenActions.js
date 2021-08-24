import { useDispatch, useSelector } from "react-redux"
import { loadTokenAction, tokenFromStorage } from "../store/TokenReducer"


export const LoadTokenFromStorage = () => {
    const dispatch = useDispatch()
    let token = localStorage.getItem('token')
    if(token){
        dispatch(loadTokenAction(token))
        dispatch(tokenFromStorage(true))
    }
}

export const SetTokenToStorage = (token) => {
    //const token = useSelector(state => state.token.token)
    if(token){
        localStorage.setItem('token', token)
    }
}