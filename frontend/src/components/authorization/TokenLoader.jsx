import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AUTH_ROUTE } from '../../utils/consts';
import useTokenFromStorage from '../../hooks/useTokenFromStorage';

const TokenLoader = () => {
    const fromStorage = useSelector(state => state.token.fromStorage)
    const history = useHistory() 
    const location = useLocation()
    const token = useTokenFromStorage()
    console.log('lends token')
    useEffect(()=>{
        token.getToken()
    }, [])

    useEffect(() => {
        if(fromStorage&& location.pathname !== AUTH_ROUTE){
            history.push(AUTH_ROUTE)
        }
    }, [fromStorage])


    return <div></div>
}

export default TokenLoader