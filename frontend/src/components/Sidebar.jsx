import { Drawer } from "@material-ui/core"
import SidebarStyles from "../styles/SidebarStyles"
import CreateDropdown from "./creators/CreateDropdown"
import UpdateDropdown from "./updaters/UpdateDropdown"


const Sidebar = () => {
    const classes = SidebarStyles()

    return <div>
        <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{paper: classes.drawerPaper}}
        >
            <CreateDropdown/>
            <UpdateDropdown/>
            
        </Drawer>
    </div>
}

export default Sidebar