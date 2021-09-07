import { Button, Container, Grid, TextField, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { tankStatusUpdater } from "../../../asyncActions/updating"
import useValidatedInput from "../../../hooks/useValidatedInput"
import { useEffect } from "react"


const TankStatusUpdater = ({id=null, callBack=null, reloadCallback=null}) => {
    const title = useValidatedInput('', {isEmpty: true, minLength: 2, maxLength: 100})
    const statusData = useSelector(state => state.tankStatuses.statuses.find(status => id===status.id))
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.setValue(statusData.title)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(tankStatusUpdater(id, title.value, token, reloadCallback))
        if(callBack){
            callBack()
        }
    }

    useEffect(()=>{
        title.setValue(statusData.title)
        title.setDefault(statusData.title)
    }, [])

    return (
        <Container>
            <form onSubmit={(e)=> handleSubmit(e)}>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={10} sm={8}>
                    <Typography variant='h4'>
                        Status creation
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
                                disabled={!title.validInput|| title.isDefault}
                                color='primary'
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClear}
                                variant='outlined'
                                disabled={title.isEmpty || title.isDefault}
                                color='secondary'
                            >
                                Reset
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            </form>
        </Container>
    )

}

export default TankStatusUpdater