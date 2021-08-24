import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authByToken } from "../asyncActions/auth"
import useTokenFromStorage from './useTokenFromStorage';


const useLogWithToken = () => {
    const dispatch = useDispatch()
    const tokenStorage = useTokenFromStorage()    
    const token = useSelector(state => state.token)
    useEffect(()=>{
        tokenStorage.getToken()
    }, [])

    
    useEffect(() => {
        if(token.fromStorage){
            dispatch(authByToken(token.token))
        }
    }, [token.fromStorage])
}

export default useLogWithToken