import { makeStyles } from "@material-ui/core"
import AppRouter from "./AppRouter"
import TokenLoader from "./authorization/TokenLoader"
import Messages from "./Messages"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import StatusMonitor from "./StatusMonitor"


const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            height: '100%'
        },
        toolbar: theme.mixins.toolbar
    }
})

const Layout = () => {
    const classes = useStyles()

    return <div className={classes.root}>
        <Navbar/>
        <div className={classes.toolbar}/>
        <Sidebar/>
        <TokenLoader/>
        <Messages/>
        <StatusMonitor/>
        <AppRouter/>

    </div>
}

export default Layout