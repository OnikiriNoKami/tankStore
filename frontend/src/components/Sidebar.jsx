import { Drawer } from "@material-ui/core"
import SidebarStyles from "../styles/SidebarStyles"


const Sidebar = () => {
    const classes = SidebarStyles()
    return <div>
        <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{paper: classes.drawerPaper}}
        >
            Some content
        </Drawer>
    </div>
}

export default Sidebar