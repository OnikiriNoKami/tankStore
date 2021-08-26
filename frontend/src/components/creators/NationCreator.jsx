import { Button, Container, TextField,Grid, Typography } from "@material-ui/core"
import useValidatedInput from "../../hooks/useValidatedInput"


const NationCreator = () => {
    const title = useValidatedInput('', {maxLength: 250,isEmpty: true, minLength: 2})


    const handleSubmit = () => {
        console.log('submited')
    }
    return (
        <Container>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item 
                    xs={10} sm={8} >
                    <Typography variant='h4'>
                        Nation creation
                    </Typography>
                </Grid>
                <Grid item xs={10} sm={8}>
                    <TextField 
                        label='Title'
                        value={title.value} 
                        onChange={title.onChange}
                        autoComplete='off'
                        onBlur={title.onBlur}
                        error={title.errorStatus}
                        variant='outlined'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={10} sm={8}>
                    <Button
                        onClick={handleSubmit}
                        variant='outlined'
                        disabled={!title.validInput}
                        color='primary'
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NationCreator