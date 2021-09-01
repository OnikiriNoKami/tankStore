import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AlertSnackbar from "../AlertSnackbar"


const  StatusMonitor = () => {
    const status = useSelector(state => state.status)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showConnError, setShowConnError] = useState(false)
    const [showAuthError, setShowAuthError] = useState(false)

    const handleClose = (setter) => {
        setter(false)
    }

    useEffect(()=> {
        if(status.authenticated){
            setShowSuccess(true)
        }
    }, [status.authenticated])

    useEffect(() => {
        if(status.connection === false){
            setShowConnError(true)
        }
        if(status.connection === true && !status.authenticated){
            setShowAuthError(true)
        }
    }, [status.connection])


    return (
        <div>
            <AlertSnackbar 
                handleClose={() => handleClose(setShowSuccess)} 
                hideAfter={3000} 
                status={showSuccess} 
                type='success' 
                message="Authentificated!"
            />
            <AlertSnackbar 
                handleClose={() => handleClose(setShowConnError)} 
                hideAfter={5000} 
                status={showConnError} 
                type='warning' 
                message="No respons from server."
            />
            <AlertSnackbar 
                handleClose={() => handleClose(setShowAuthError)} 
                hideAfter={5000} 
                status={showAuthError} 
                type='error' 
                message="Authentication fail!"
            />

        </div>
    )
}

export default StatusMonitor