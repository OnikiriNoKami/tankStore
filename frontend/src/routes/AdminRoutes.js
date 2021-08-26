import Admin from "../pages/Admin";
import { ADMIN_ROUTE, ADMIN_ROUTE_PARAMS } from "../utils/consts";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE_PARAMS,
        Component: Admin
    },
    {
        path: ADMIN_ROUTE,
        Component: Admin 
    }

]