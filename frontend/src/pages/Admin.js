import { Box } from '@material-ui/core';
import { NATION_CODE, ROLE_CODE, TYPE_CODE, TANK_STATUS_CODE, MODULE_TYPE_CODE, USERS_MANAGING_CODE, TANK_CODE } from "../utils/consts";
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
import AdminUsersList from '../components/updaters/lists/AdminUsersList';
import CombinedMonitors from '../components/monitors/CombinedMonitors';
import TankCreator from '../components/creators/TankCreator';
import '../override.css';

const Admin = () => {
    const classes = useBoxStyles()
    let {action, type} = useParams()

    return (
        <div style={{width:'100%'}}>
            <CombinedMonitors/>

            {action==='create'&&<>

                {type===NATION_CODE&&<Box className={classes.box}><NationCRUD role='creator'/></Box>}
                {type===TYPE_CODE&&<Box className={classes.box}><TypeCreator/></Box>}
                {type===ROLE_CODE&&<Box className={classes.box}><RoleCreator/></Box>}
                {type===TANK_STATUS_CODE&&<Box className={classes.box}><TankStatusCreator/></Box>}
                {type===MODULE_TYPE_CODE&&<Box className={classes.box}><ModuleTypeCreator/></Box>}
                {type===TANK_CODE&&<Box className={classes.boxNoFixedHeigth}><TankCreator/></Box>}
                </>
            
            }

            {action==='change'&&<Box className={classes.boxUpdater}>
                {type===NATION_CODE&&<NationList/>}
                {type===TYPE_CODE&&<TankTypeList/>}
                {type===ROLE_CODE&&<RoleList/>}
                {type===TANK_STATUS_CODE&&<TankStatusList/>}
                {type===MODULE_TYPE_CODE&&<ModuleTypeList/>}
                {type===USERS_MANAGING_CODE&&<AdminUsersList/>}
            </Box>            
            }
            

        </div>
    );
};

export default Admin;