import { Drawer, Hidden } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarTogle } from "../store/SidebarReducer";
import SidebarStyles from "../styles/SidebarStyles";
import CreateDropdown from "./creators/CreateDropdown";
import UpdateDropdown from "./updaters/UpdateDropdown";

const Sidebar = () => {
    const classes = SidebarStyles();
    const dispatch = useDispatch()

    const isOpen = useSelector(state => state.sidebar.isOpen)

    const drawer = () => {
        return (
            <div>
                <CreateDropdown />
                <UpdateDropdown />
            </div>
        );
    };

    const handleClose = () => {
        dispatch(sidebarTogle())
    }

    return (
        <div>
            <Hidden mdUp >
                <Drawer
                    className={classes.drawer}
                    variant="temporary"
                    anchor="left"
                    open={isOpen}
                    onClose={handleClose}
                    classes={{ paper: classes.drawerPaper }}
                >
                    {drawer()}
                </Drawer>
            </Hidden>
            <Hidden smDown >
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    anchor="left"
                    classes={{ paper: classes.drawerPaper }}
                >
                    {drawer()}
                </Drawer>
            </Hidden>
        </div>
    );
};

export default Sidebar;
