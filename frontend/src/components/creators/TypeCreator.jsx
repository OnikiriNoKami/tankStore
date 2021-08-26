import { Container, Grid, Typography, TextField, Button } from "@material-ui/core"
import useValidatedInput from "../../hooks/useValidatedInput"


const TypeCreator = () => {
    const title = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:250})
    const titleShort = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:10})

    const handleSubmit = () => {
        console.log('submited')
    }

    return (        
        <Container>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={10} sm={8}>
                    <Typography variant='h4'>
                        Tank type creation
                    </Typography>
                </Grid>
                <Grid item xs={10} sm={8}>
                    <TextField 
                        label='Tank type title'
                        fullWidth
                        error={title.errorStatus}
                        onChange={title.onChange}
                        value={title.value}
                        onBlur={title.onBlur}
                        autoComplete='off'
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={10} sm={8}>
                    <TextField 
                        label='Type short'
                        fullWidth
                        error={titleShort.errorStatus}
                        onChange={titleShort.onChange}
                        value={titleShort.value}
                        onBlur={titleShort.onBlur}
                        autoComplete='off'
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={10} sm={8}>
                    <Button 
                        onClick={handleSubmit}
                        disabled={!title.validInput||!titleShort.validInput}
                        variant='outlined'
                        color='primary'
                    >
                        Create
                    </Button>
                </Grid>


            </Grid>
        </Container>
    )
}

export default TypeCreator