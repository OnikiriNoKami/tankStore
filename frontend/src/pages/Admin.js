import { Box } from '@material-ui/core';
import { NATION_CODE, ROLE_CODE, TYPE_CODE, TANK_STATUS_CODE, MODULE_TYPE_CODE } from "../utils/consts";
import React from 'react';
import { useParams } from 'react-router-dom';
import NationCRUD from '../components/creators/NationCreator';
import RoleCreator from '../components/creators/RoleCreator';
import TankStatusCreator from '../components/creators/TankStatusCreator';
import TypeCreator from '../components/creators/TypeCreator';
import NationList from '../components/updaters/lists/NationList';
import RoleList from '../components/updaters/lists/RoleList';
import TankStatusList from '../components/updaters/lists/TankStatusList';
import TankTypeList from '../components/updaters/lists/TankTypeList';
import useBoxStyles from '../styles/BoxStyles';
import ModuleTypeCreator from '../components/creators/ModuleTypeCreator';
import ModuleTypeList from '../components/updaters/lists/ModuleTypeList';

const Admin = () => {
    const classes = useBoxStyles()
    let {action, type} = useParams()

    return (
        <div style={{width:'100%'}}>

            {action==='create'&&<Box className={classes.box}>

                {type===NATION_CODE&&<NationCRUD role='creator'/>}
                {type===TYPE_CODE&&<TypeCreator/>}
                {type===ROLE_CODE&&<RoleCreator/>}
                {type===TANK_STATUS_CODE&&<TankStatusCreator/>}
                {type===MODULE_TYPE_CODE&&<ModuleTypeCreator/>}
            </Box>
            }

            {action==='change'&&<Box className={classes.boxUpdater}>
                {type===NATION_CODE&&<NationList/>}
                {type===TYPE_CODE&&<TankTypeList/>}
                {type===ROLE_CODE&&<RoleList/>}
                {type===TANK_STATUS_CODE&&<TankStatusList/>}
                {type===MODULE_TYPE_CODE&&<ModuleTypeList/>}
            </Box>            
            }
            

        </div>
    );
};

export default Admin;