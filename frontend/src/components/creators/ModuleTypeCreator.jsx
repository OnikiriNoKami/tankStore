import { Container, Grid, Typography, TextField, Button } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { moduleTypeCreate } from "../../asyncActions/creation"
import useValidatedInput from "../../hooks/useValidatedInput"


const ModuleTypeCreator = () => {
    const title = useValidatedInput('', {isEmpty: true, minLength: 2, maxLength:100})
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.clear()
    }

    const handleSubmit= (e) => {
        e.preventDefault()
        dispatch(moduleTypeCreate(title.value, token))
        handleClear()
    }

    return (
        <Container>
            <form onSubmit={(e)=> handleSubmit(e)}>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={10} sm={8}>
                    <Typography variant='h4'>
                        Module type creation
                    </Typography>
                </Grid>
                
                <Grid item xs={10} sm={8}>
                    <TextField
                        label='Title'
                        value={title.value}
                        onChange={title.onChange}
                        onBlur={title.onBlur}
                        error={title.errorStatus}
                        autoComplete='false'
                        variant='outlined'
                        fullWidth
                    />                   
                </Grid>
                <Grid item xs={10} sm={8}>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Button
                                type='submit'
                                variant='outlined'
                                disabled={!title.validInput}
                                color='primary'
                            >
                                Create
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClear}
                                variant='outlined'
                                disabled={title.isEmpty}
                                color='secondary'
                            >
                                Clear
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            </form>

        </Container>
    )
}

export default ModuleTypeCreator