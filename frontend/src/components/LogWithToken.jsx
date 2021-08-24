import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authByToken } from "../asyncActions/auth"


const LogWithToken = () => {
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    useEffect(() => {
        if(token.fromStorage){
            dispatch(authByToken(token.token))
        }
    }, [token.fromStorage])

    return <div>Oh you have some nice token, wait a minute we will chekc it.</div>
}

export default LogWithToken