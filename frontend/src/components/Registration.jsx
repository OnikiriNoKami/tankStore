import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { Grid, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { registrate } from '../asyncActions/auth';
import useValidatedInput from '../hooks/useValidatedInput';
import AlertSnackbar from './AlertSnackbar';
import { authResetConn } from '../store/StatusReducer';

const Registration = () => {
    const email = useValidatedInput("", {minLength: 3, isEmpty: true, isEmail: true})
    const password = useValidatedInput("", {minLength: 6, isEmpty: true, maxLength: 100})
    const passwordRep = useValidatedInput("",{minLength: 6, isEmpty: true, maxLength: 100})
    const [samePassword, setSamePassword] = useState(false)
    const [samePasswordErrorStatus, setSamePasswordErrorStatus] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(authResetConn(null))
        dispatch(registrate(email.value, password.value))
    }


    const [errorStatus, setErrorStatus] = useState(false)
    useEffect(() => {
        setErrorStatus(
            email.errorStatus||
            password.errorStatus||
            passwordRep.errorStatus||
            samePasswordErrorStatus
        )
    }, [email.errorStatus, password.errorStatus, passwordRep.errorStatus, samePasswordErrorStatus])
    useEffect(()=>{
        if((password.isDirty && passwordRep.isDirty)&&(password.value !== passwordRep.value))
        {
            setSamePassword(false)
        } else
        if((password.isDirty && passwordRep.isDirty)&&(password.value === passwordRep.value)) {
            setSamePassword(true)
        }
    }, [passwordRep.value, password.value, password.isDirty, passwordRep.isDirty])

    useEffect(() => {
            setSamePasswordErrorStatus(
                (password.isDirty && passwordRep.isDirty)&&!samePassword
            )
    }, [samePassword, password.isDirty, passwordRep.isDirty])
    
    return(
        <Container>
            <Grid 
                container 
                spacing={3}
                justifyContent='center'
            >
                <Grid item xs={8} >
                    <TextField 
                        label="Email" 
                        value={email.value}
                        autoComplete='new-password'
                        onChange={email.onChange}
                        onBlur={email.onBlur}
                        variant='outlined'
                        error={email.errorStatus}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField 
                        label="Password" 
                        value={password.value}
                        autoComplete='new-password'
                        onChange={password.onChange}
                        onBlur={password.onBlur}
                        type='password' 
                        variant='outlined'
                        error = {password.errorStatus}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField 
                        label="Repeat password" 
                        value={passwordRep.value}
                        autoComplete='new-password'
                        onChange={passwordRep.onChange}
                        onBlur={passwordRep.onBlur}
                        type='password' 
                        variant='outlined'
                        error = {passwordRep.errorStatus||samePasswordErrorStatus}
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={8}>
                    <Button 
                        onClick={handleSubmit}
                        color='primary'
                        variant='outlined'
                        disabled={(
                            !email.validInput || 
                            !password.validInput  || 
                            !passwordRep.validInput ||
                            samePasswordErrorStatus
                            )}
                    >
                        Registrate
                    </Button>
                </Grid>
            </Grid>
            <AlertSnackbar status={errorStatus} type='error' message='Check your data!'/>
        </Container>
    );
};

export default Registration