import { Container, Grid, Typography, TextField, Button } from "@material-ui/core"
import useValidatedInput from "../../hooks/useValidatedInput"


const RoleCreator = () => {

    const title = useValidatedInput('', {minLength: 5, isEmpty: true, maxLength: 250})
    const description = useValidatedInput('', {isEmpty: false, maxLength: 999})

    const handleSubmit = () => {
        console.log('submited')
    }

    return (
        <Container>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={10} sm={8}>
                    <Typography variant='h4'>
                        Role creation
                    </Typography>
                </Grid>
                <Grid item xs={10} sm={8}>
                    <TextField
                        label='Role title'
                        value={title.value}
                        error={title.errorStatus}
                        onChange={title.onChange}
                        onBlur={title.onBlur}
                        variant='outlined'
                        autoComplete='off'
                        fullWidth          
                    />                        
                </Grid>
                <Grid item xs={10} sm={8}>
                    <TextField
                        label='Role description'
                        value={description.value}
                        error={description.errorStatus}
                        onChange={description.onChange}
                        onBlur={description.onBlur}
                        variant='outlined'
                        autoComplete='off'
                        multiline
                        minRows={4}
                        fullWidth
                    />                        
                </Grid>
                <Grid item xs={10} sm={8}>
                    <Button 
                        onClick={handleSubmit}
                        disabled={!title.validInput||!description.validInput}
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

export default RoleCreator