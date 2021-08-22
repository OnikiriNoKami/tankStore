import { Box } from '@material-ui/core';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Registration from '../components/Registration';
import { LOGIN_ROUTE } from '../utils/consts';

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    return (
        <Box display='flex' flexGrow={1} height='100%' alignItems='center'>
            {isLogin ? <Login/> : <Registration/>}
        </Box>
    );
};

export default Auth;