import { Box } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import NationCRUD from '../components/creators/NationCreator';
import RoleCreator from '../components/creators/RoleCreator';
import TankStatusCreator from '../components/creators/TankStatusCreator';
import TypeCreator from '../components/creators/TypeCreator';
import NationList from '../components/updaters/NationList';
import RoleList from '../components/updaters/RoleList';
import TankStatusList from '../components/updaters/TankStatusList';
import TankTypeList from '../components/updaters/TankTypeList';
import useBoxStyles from '../styles/BoxStyles';

const Admin = () => {
    const classes = useBoxStyles()
    let {action, type} = useParams()

    return (
        <div style={{width:'100%'}}>

            {action==='create'&&<Box className={classes.box}>

                {type==='Nation'&&<NationCRUD role='creator'/>}
                {type==='Type'&&<TypeCreator/>}
                {type==='Role'&&<RoleCreator/>}
                {type==='Status'&&<TankStatusCreator/>}
            </Box>
            }

            {action==='change'&&<Box className={classes.boxUpdater}>
                {type==='Nation'&&<NationList/>}
                {type==='Type'&&<TankTypeList/>}
                {type==='Role'&&<RoleList/>}
                {type==='Status'&&<TankStatusList/>}
            </Box>            
            }
            

        </div>
    );
};

export default Admin;