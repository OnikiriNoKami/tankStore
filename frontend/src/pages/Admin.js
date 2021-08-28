import { Box } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import NationCreator from '../components/creators/NationCreator';
import RoleCreator from '../components/creators/RoleCreator';
import TypeCreator from '../components/creators/TypeCreator';
import NationList from '../components/updaters/NationList';
import useBoxStyles from '../styles/BoxStyles';

const Admin = () => {
    const classes = useBoxStyles()
    let {action, type} = useParams()

    return (
        <Box className={classes.box}>

            {action==='create'&&type==='Nation'&&<NationCreator/>}
            {action==='create'&&type==='Type'&&<TypeCreator/>}
            {action==='create'&&type==='Role'&&<RoleCreator/>}
            {action==='change'&&type==='Nation'&&<NationList/>}
        </Box>
    );
};

export default Admin;