import { makeStyles } from "@material-ui/core";

const useBoxStyles = makeStyles((theme) => {
    return ({
        box: {
            marginTop: '56px',
            width: '100%',
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            
            height: `calc(100% - 56px - 10px)`,
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
                height: `calc(100% - 48px - 10px)`,
                marginTop: '48px' 
              }, 
            [theme.breakpoints.up('sm')]: { 
                height: `calc(100% - 64px - 10px)`,
                marginTop: '64px'
             }, 
        },
        boxUpdater: {
            marginTop: '56px',
            width: 'calc(100%)',
            paddingTop: '10px',
            display: 'flex',
            flexGrow: 1,
            
            height: `calc(100% - 56px - 10px)`,
            [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
                height: `calc(100% - 48px - 10px)`,
                marginTop: '48px' 
              }, 
            [theme.breakpoints.up('sm')]: { 
                height: `calc(100% - 64px - 10px)`,
                marginTop: '64px'
             }, 
        }
    })
})

export default useBoxStyles