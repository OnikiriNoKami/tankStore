import { Button, Container, TextField,Grid, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { nationCreate } from "../../asyncActions/creation"
import useValidatedInput from "../../hooks/useValidatedInput"
import { failMessage } from "../../store/MessageStore"

const defaultRole = 'creator'

const NationCRUD = ({role = defaultRole, id=null}) => {
    const title = useValidatedInput('', {maxLength: 250,isEmpty: true, minLength: 2})
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.clear()
    }

    const handleSubmit = () => {
        if(role === 'creator'){
                dispatch(nationCreate(title.value, token))         
        }
        if(role === 'updater'){
            console.log('update')
        }  
        handleClear()
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

export default NationCRUD