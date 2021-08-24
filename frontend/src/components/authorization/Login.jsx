import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField';
import { Grid, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from '../../asyncActions/auth';
import useValidatedInput from '../../hooks/useValidatedInput';
import AlertSnackbar from '../AlertSnackbar';
import { authResetConn } from '../../store/StatusReducer';

const Login = () => {
    const email = useValidatedInput("", {minLength: 3, isEmpty: true, isEmail: true})
    const password = useValidatedInput("", {minLength: 6, isEmpty: true, maxLength: 100})
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(authResetConn(null))
        dispatch(login(email.value, password.value))
    }
    const [errorStatus, setErrorStatus] = useState(false)
    useEffect(() => {
        setErrorStatus(email.errorStatus||password.errorStatus)
    }, [email.errorStatus, password.errorStatus])

    
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
                        onChange={email.onChange}
                        onBlur={email.onBlur}
                        variant='outlined'
                        autoComplete='false'
                        error={email.errorStatus}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField 
                        label="Password" 
                        value={password.value}
                        onChange={password.onChange}
                        onBlur={password.onBlur}
                        type='password' 
                        variant='outlined'
                        error = {password.errorStatus}
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={8}>
                    <Button 
                        onClick={handleSubmit}
                        color='primary'
                        variant='outlined'
                        disabled={(!email.validInput || !password.validInput)}
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
            <AlertSnackbar status={errorStatus} type='error' message='Check your data!'/>
        </Container>
    );
};

export default Login