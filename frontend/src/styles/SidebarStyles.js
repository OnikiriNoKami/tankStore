import { makeStyles } from "@material-ui/core";
import { drawerWidth } from '../utils/consts'

const SidebarStyles = makeStyles((theme) => {


    return {
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            marginTop: '56px',
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
                marginTop: '48px'
              }, 
            [theme.breakpoints.up('sm')]: { 
                marginTop: `64px`
             },

            
        },
        drawerPaper: {
            width: drawerWidth,
            marginTop: '56px',
            height: `calc(100% - 56px)`,
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
                height: `calc(100% - 48px)`,
                marginTop: '48px'
              }, 
            [theme.breakpoints.up('sm')]: { 
                height: `calc(100% - 64px)`,
                marginTop: `64px`
             },

        }
    }
})

export default SidebarStyles