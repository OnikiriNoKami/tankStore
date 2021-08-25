import { Button, Container, TextField,Grid, Typography } from "@material-ui/core"
import useValidatedInput from "../../hooks/useValidatedInput"


const NationCreator = () => {
    const title = useValidatedInput('', {maxLength: 250, minLength: 2})


    const handleSubmit = () => {
        console.log('submited')
    }
    return (
        <Container>
            <Grid container>
                <Grid item xs={8}>
                    <Typography variant='h4'>
                        Creation of a Nation
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <TextField 
                        label='Title'
                        value={title.value} 
                        onChange={title.onChange}
                        autoComplete='off'
                        onBlur={title.onBluer}
                        error={title.errorStatus}
                        variant='outlined'
                        fullWidth
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button
                        onClick={handleSubmit}
                        variant='outlined'
                        disabled={!title.validInput}
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NationCreator