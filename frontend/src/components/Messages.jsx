import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { failMessage, successMessage } from "../store/MessageStore"
import AlertSnackbar from "./AlertSnackbar"


const Messages = () => {
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch()

    const handleClose = (setter) => {
        dispatch(setter(false))
    }

    useEffect(()=> {
        if(messages.showSuccess){
            dispatch(successMessage(true))
        }
    }, [messages.showSuccess])

    useEffect(()=> {
        if(messages.showFail){
            dispatch(failMessage(true))
        }
    }, [messages.failMessage])


    return (
        <div>
            <AlertSnackbar 
                handleClose={() => handleClose(successMessage)} 
                hideAfter={3000} 
                status={messages.showSuccess} 
                type='success' 
                message="Success!"
            />
            <AlertSnackbar 
                handleClose={() => handleClose(failMessage)} 
                hideAfter={5000} 
                status={messages.showFail} 
                type='error' 
                message="Something went wrong..."
            />

        </div>
    )
}

export default Messages