import { makeStyles } from "@material-ui/core"
import TokenLoader from "./authorization/TokenLoader"
import Messages from "./Messages"
import Navbar from "./Navbar"
import StatusMonitor from "./StatusMonitor"

const useStyles = makeStyles((theme) => {
    return {
        
    }
})

const Layout = () => {


    return <div>
        <Navbar/>
        <TokenLoader/>
        <Messages/>
        <StatusMonitor/>

    </div>
}

export default Layout