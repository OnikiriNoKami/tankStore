import { makeStyles } from "@material-ui/core";

const useBoxStyles = makeStyles((theme) => {
    return ({
        box: {
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            
            height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`
        }
    })
})

export default useBoxStyles