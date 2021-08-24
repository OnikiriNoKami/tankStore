import { Box } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/Login';
import LogWithToken from '../components/LogWithToken';
import Registration from '../components/Registration';
import { AUTH_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isReg = location.pathname === REGISTRATION_ROUTE
    const isByToken = location.pathname === AUTH_ROUTE


    return (
        <Box display='flex' flexGrow={1} height='100%' alignItems='center'>
            {isLogin&&<Login/>}
            {isReg&&<Registration/>}
            {isByToken&&<LogWithToken/>}
        </Box>
    );
};

export default Auth;