import { Box } from '@material-ui/core';
import React from 'react';
import Login from '../components/Login';

const Auth = () => {


    return (
        <Box display='flex' flexGrow={1} height='100%' alignItems='center'>
            <Login />
        </Box>
    );
};

export default Auth;