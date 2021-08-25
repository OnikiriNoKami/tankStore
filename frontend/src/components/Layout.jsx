import { makeStyles } from "@material-ui/core"
import TokenLoader from "./authorization/TokenLoader"
import Messages from "./Messages"
import Navbar from "./Navbar"
import StatusMonitor from "./StatusMonitor"

const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar
    }
})

const Layout = () => {
    const classes = useStyles()

    return <div>
        <Navbar/>
        <div className={classes.toolbar}/>
        <TokenLoader/>
        <Messages/>
        <StatusMonitor/>

    </div>
}

export default Layout