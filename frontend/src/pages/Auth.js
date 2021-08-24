import { Box } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Login from '../components/authorization/Login';
import LogWithToken from '../components/authorization/LogWithToken';
import Registration from '../components/authorization/Registration';
import TokenLoader from '../components/authorization/TokenLoader';
import { AUTH_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
    const location = useLocation()
    const status = useSelector(state => state.status)
    const isLogin = location.pathname === LOGIN_ROUTE
    const isReg = location.pathname === REGISTRATION_ROUTE
    const isByToken = location.pathname === AUTH_ROUTE


    return (
        <Box display='flex' flexGrow={1} height='100%' alignItems='center'>
            {!status.authenticated&&<TokenLoader/>}
            {isLogin&&<Login/>}
            {isReg&&<Registration/>}
            {isByToken&&<LogWithToken/>}
        </Box>
    );
};

export default Auth;