import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {publicRoutes} from '../routes/PublicRoutes';
import {adminRoutes} from '../routes/AdminRoutes';
import { AUTH_ROUTE } from '../utils/consts';


const AppRouter = () => {
    return (
        <Switch>
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component}/>
            )}
            {adminRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component}/>
            )}
            <Redirect to={AUTH_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;