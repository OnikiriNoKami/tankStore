import Auth from "../pages/Auth";
import { AUTH_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

export const publicRoutes = [
    {
        path:AUTH_ROUTE,
        Component: Auth 
    },
    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    }
]
