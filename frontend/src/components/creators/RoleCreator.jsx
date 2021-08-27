import { Container, Grid, Typography, TextField, Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { roleCreate } from "../../asyncActions/creation"
import useValidatedInput from "../../hooks/useValidatedInput"


const RoleCreator = () => {

    const title = useValidatedInput('', {minLength: 2, isEmpty: true, maxLength: 250})
    const description = useValidatedInput('', {minLength: 2,isEmpty: true, maxLength: 999})
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.clear()
        description.clear()
    }

    const handleSubmit = () => {
        dispatch(roleCreate(title.value, description.value, token))
        handleClear()
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
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Button
                                onClick={handleSubmit}
                                variant='outlined'
                                disabled={!title.validInput||!description.validInput}
                                color='primary'
                            >
                                Create
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClear}
                                variant='outlined'
                                disabled={title.isEmpty&&description.isEmpty}
                                color='secondary'
                            >
                                Clear
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>

        </Container>
    )
    
    
}

export default RoleCreator