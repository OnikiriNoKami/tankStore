import { makeStyles } from "@material-ui/core";

const useBoxStyles = makeStyles((theme) => {
    return ({
        box: {
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            
            height: `calc(100% - 56px)`,
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
                height: `calc(100% - 48px)` 
              }, 
            [theme.breakpoints.up('sm')]: { 
                height: `calc(100% - 64px)` 
             }, 
        }
    })
})

export default useBoxStyles