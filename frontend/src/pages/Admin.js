import { Box } from '@material-ui/core';
import React from 'react';
import NationCreator from '../components/creators/NationCreator';
import useBoxStyles from '../styles/BoxStyles';

const Admin = () => {
    const classes = useBoxStyles()

    return (
        <Box className={classes.box}>

            <NationCreator/>
        </Box>
    );
};

export default Admin;