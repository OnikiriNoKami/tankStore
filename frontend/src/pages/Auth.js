import { Box } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from '../components/authorization/Login';
import Registration from '../components/authorization/Registration';
import useBoxStyles from '../styles/BoxStyles';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = () => {
    const classes = useBoxStyles()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isReg = location.pathname === REGISTRATION_ROUTE

    return (
        <Box className={classes.box}>

            {isLogin&&<Login/>}
            {isReg&&<Registration/>}
        </Box>
    );
};

export default Auth;