import { Container, Grid, Typography, TextField, Button } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { roleUpdater } from "../../../asyncActions/updating"
import useValidatedInput from "../../../hooks/useValidatedInput"


const RoleUpdater = ({id=null, callBack= null, reloadCallback=null}) => {
    const title = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:250})
    const description = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:998})
    const roleData = useSelector(state => state.roles.roles.find(type => id===type.id))
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.setValue(roleData.title)
        description.setValue(roleData.description)
    }

    const handleSubmit = () => {
        dispatch(roleUpdater(id, title.value, description.value, token, reloadCallback))
        if(callBack){
            callBack()
        }
    }

    useEffect(()=>{
        title.setValue(roleData.title)
        title.setDefault(roleData.title)
        description.setValue(roleData.description)
        description.setDefault(roleData.description)
    },[])

    return (        
        <Container>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item xs={10} sm={8}>
                    <Typography variant='h4'>
                        Tank type updater
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
                        error={description.errorStatus}
                        onChange={description.onChange}
                        value={description.value}
                        onBlur={description.onBlur}
                        autoComplete='off'
                        multiline
                        minRows={4}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={10} sm={8}>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Button
                                onClick={handleSubmit}
                                variant='outlined'
                                disabled={!title.validInput||!description.validInput||(title.isDefault&&description.isDefault)}
                                color='primary'
                            >
                                save
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClear}
                                variant='outlined'
                                disabled={title.isEmpty&&description.isEmpty||(title.isDefault&&description.isDefault)}
                                color='secondary'
                            >
                                reset
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>


            </Grid>
        </Container>
    )
}

export default RoleUpdater