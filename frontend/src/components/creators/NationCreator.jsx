import { Button, Container, TextField,Grid, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { createNation } from "../../asyncActions/creation"
import useValidatedInput from "../../hooks/useValidatedInput"


const NationCreator = () => {
    const title = useValidatedInput('', {maxLength: 250,isEmpty: true, minLength: 2})
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()


    const handleSubmit = () => {
        dispatch(createNation(title.value, token))
    }
    const handleClear = () => {
        title.clear()
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
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Button
                                onClick={handleSubmit}
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
        </Container>
    )
}

export default NationCreator