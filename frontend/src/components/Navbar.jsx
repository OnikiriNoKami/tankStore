import { AppBar, Button, Toolbar, Grid, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../asyncActions/auth";
import AppbarStyles from "../styles/AppbarStyles";
import { ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import SidebarOpener from "./SidebarOpener";

const Navbar = () => {
    const dispatch = useDispatch();
    const classes = AppbarStyles();
    const history = useHistory();

    const toLogin = () => {
        history.push(LOGIN_ROUTE);
    };

    const toAdmin = () => {
        history.push(ADMIN_ROUTE);
    };

    const toLogout = () => {
        dispatch(logout());
    };

    return (
        <AppBar className={classes.appbar}>
            <Toolbar positiob="fixed">
                <Grid container justifyContent="space-evenly">
                    <Grid item sm={2}>
                        <SidebarOpener/>
                    </Grid>
                    <Grid item sm={2}>
                        <Typography variant="h4">
                            <Button onClick={toLogout}>Logout</Button>
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Typography variant="h4">
                            <Button onClick={toLogin}>To reg</Button>
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Typography variant="h4">
                            <Button onClick={toAdmin}>To admin</Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
