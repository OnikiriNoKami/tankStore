import { Snackbar } from "@material-ui/core"
import MuiAlert from '@material-ui/lab/Alert';
const defaultPosition = {
    vertical: 'bottom',
    horizontal: 'right'
}

function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props}/> 
}

const AlertSnackbar = ({status, type,hideAfter, message, position=defaultPosition}) => {
    
    return (
        <div>
            <Snackbar 
                open={status} 
                anchorOrigin={position}
                autoHideDuration={hideAfter || null}
            >
                <Alert severity={type}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertSnackbar