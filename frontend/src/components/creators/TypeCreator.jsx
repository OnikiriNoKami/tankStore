import { Container, Grid, Typography, TextField, Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { tankTypeCreate } from "../../asyncActions/creation"
import useValidatedInput from "../../hooks/useValidatedInput"


const TypeCreator = () => {
    const title = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:250})
    const titleShort = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:10})
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.clear()
        titleShort.clear()
    }

    const handleSubmit = () => {
        dispatch(tankTypeCreate(title.value, titleShort.value, token))
        handleClear()
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
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Button
                                onClick={handleSubmit}
                                variant='outlined'
                                disabled={!title.validInput||!titleShort.validInput}
                                color='primary'
                            >
                                Create
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClear}
                                variant='outlined'
                                disabled={title.isEmpty&&titleShort.isEmpty}
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

export default TypeCreator