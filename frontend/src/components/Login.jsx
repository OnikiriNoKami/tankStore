import React from 'react';
import Container from '@material-ui/core/Container'
import useBasicInput from '../hooks/useBasicInput';
import TextField from '@material-ui/core/TextField';
import { Grid, Button } from '@material-ui/core';

const Login = () => {
    const email = useBasicInput("")
    const password = useBasicInput("")

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
                        autoComplete={false}
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