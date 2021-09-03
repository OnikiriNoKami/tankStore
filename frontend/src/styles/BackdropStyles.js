import { makeStyles } from "@material-ui/core";

const BackdropStyles = makeStyles(theme => {
    return {
        root:{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
            paddingTop: '10px',
            paddingBottom: '20px',
            width: '800px',
            [`${theme.breakpoints.up('xs')}`]: { 
                width:'400px'
              }, 
            [theme.breakpoints.up('sm')]: { 
                width:'700px'
             }, 

        }, 
    }
})

export default BackdropStyles