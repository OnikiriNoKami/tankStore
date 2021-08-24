import { useDispatch } from "react-redux"
import { loadTokenAction, tokenFromStorage } from "../store/TokenReducer"


const useTokenFromStorage = () => {
    const dispatch = useDispatch()

    const getToken = () => {
        let token = localStorage.getItem('token')
        if(token){
            dispatch(loadTokenAction(token))
            dispatch(tokenFromStorage(true))
        }
    }
    return {
        getToken
    }
}

export default useTokenFromStorage
