import { makeStyles } from "@material-ui/core";

const AppbarStyles = makeStyles((theme) => {
    return {
        appbar:{
            zIndex: theme.zIndex.drawer +1,
        }    
}
})

export default AppbarStyles