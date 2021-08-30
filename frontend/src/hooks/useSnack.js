import { useSnackbar } from "notistack"
import {CircularProgress} from '@material-ui/core';
import { useRef, useState } from "react";

const useSnack = (message) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const dirty = useRef()
    const snack = useRef()

    const handleOpen = () => {
        if(dirty.current !== true){
            snack.current = enqueueSnackbar(
                message||'',
                {
                    variant:'info',
                    persist: true,
                    action: (<CircularProgress/>)
                }
            )
            dirty.current = true

        }
    }
    const handleClose = () => {
        if(dirty.current === true)
        {closeSnackbar(snack.current)}

    }
    

    return {
        open: handleOpen,
        close: handleClose

    }
} 

export default useSnack