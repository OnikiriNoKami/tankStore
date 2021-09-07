import { Container, Grid, Typography, TextField, Button } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { tankTypeUpdater } from "../../../asyncActions/updating"
import useValidatedInput from "../../../hooks/useValidatedInput"


const TypeUpdater = ({id=null, callBack= null, reloadCallback=null}) => {
    const title = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:250})
    const titleShort = useValidatedInput('', {minLength:2,isEmpty: true, maxLength:10})
    const typeData = useSelector(state => state.tankTypes.tankTypes.find(type => id===type.id))
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.setValue(typeData.title)
        titleShort.setValue(typeData.title_short)
    }

    const handleSubmit = () => {
        dispatch(tankTypeUpdater(id, title.value, titleShort.value, token, reloadCallback))
        if(callBack){
            callBack()
        }
    }

    useEffect(()=>{
        title.setValue(typeData.title)
        title.setDefault(typeData.title)
        titleShort.setValue(typeData.title_short)
        titleShort.setDefault(typeData.title_short)
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
                                disabled={!title.validInput||!titleShort.validInput||(title.isDefault&&titleShort.isDefault)}
                                color='primary'
                            >
                                save
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClear}
                                variant='outlined'
                                disabled={title.isEmpty&&titleShort.isEmpty||(title.isDefault&&titleShort.isDefault)}
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

export default TypeUpdater