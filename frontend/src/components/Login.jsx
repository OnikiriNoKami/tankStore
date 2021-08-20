import React from 'react';
import Container from '@material-ui/core/Container'
import useBasicInput from '../hooks/useBasicInput';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from '../asyncActions/auth';

const Login = () => {
    const email = useBasicInput("")
    const password = useBasicInput("")
    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(login(email.value, password.value))
    }

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
                        {...email} 
                        variant='outlined'
                        autoComplete='false'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField 
                        label="Password" 
                        {...password}
                        type='password' 
                        variant='outlined'
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={8}>
                    <Button 
                        onClick={handleSubmit}
                        color='primary'
                        variant='outlined'
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
            
            
        </Container>
    );
};

export default Login