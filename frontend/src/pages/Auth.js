import { Box } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/authorization/Login';
import Registration from '../components/authorization/Registration';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isReg = location.pathname === REGISTRATION_ROUTE

    return (
        <Box display='flex' flexGrow={1} height='100%' alignItems='center'>

            {isLogin&&<Login/>}
            {isReg&&<Registration/>}
        </Box>
    );
};

export default Auth;