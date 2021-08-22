import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AlertSnackbar from "./AlertSnackbar"


const Messages = () => {
    const status = useSelector(state => state.status)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showConnError, setShowConnError] = useState(false)

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
    }, [status.connection])
    return (
        <div>
            <AlertSnackbar 
                handleClose={() => handleClose(setShowSuccess)} 
                hideAfter={3000} 
                status={showSuccess} 
                type='success' 
                message="Authenticated!"
            />
            <AlertSnackbar 
                handleClose={() => handleClose(setShowConnError)} 
                hideAfter={5000} 
                status={showConnError} 
                type='error' 
                message="No respons from server."
            />

        </div>
    )
}

export default Messages