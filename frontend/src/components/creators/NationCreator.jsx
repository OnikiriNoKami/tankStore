import { Button, Container, TextField,Grid, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { nationCreate } from "../../asyncActions/creation"
import { nationUpdater } from "../../asyncActions/updating"
import useValidatedInput from "../../hooks/useValidatedInput"
import CreatorStyles from "../../styles/CreatorStyles"

const defaultRole = 'creator'

const NationCRUD = ({role = defaultRole, reloadCallback=null, id=null, clearLabel='update', updaterCallback=null, submitLabel='create', xs=10, sm=8}) => {
    const classes = CreatorStyles()
    const title = useValidatedInput('', {maxLength: 250,isEmpty: true, minLength: 2})
    const token = useSelector(state => state.token.token)
    const nationData = useSelector(state => state.nations.nations.filter(nation => nation.id === id)[0])
    const [updater, setUpdater] = useState(false)
    const [creator, setCreator] = useState(false)
    const dispatch = useDispatch()

    const handleClear = () => {
        if(creator){
            title.clear()
        }
        if(updater){
            title.setValue(nationData.title)
        }
    }

    const handleSubmit = () => {
        if(creator){
                dispatch(nationCreate(title.value, token)) 
                handleClear()        
        }
        if(updater){
            dispatch(nationUpdater(id, title.value, token, reloadCallback))
            if(updaterCallback){
                updaterCallback()
            }
        }  
        
    }

    useEffect(()=> {
        if(role === 'updater'){
            setUpdater(true)
            title.setValue(nationData.title)
            title.setDefault(nationData.title)
        }
        if(role === 'creator'){
            setCreator(true)
        }

    }, [])

    return (
        <Container>
            <Grid container spacing={3} justifyContent='center'>
                <Grid item 
                    xs={xs} sm={sm} >
                    <Typography variant='h4'>
                        {role==='updater'? "Nation update" : 'Nation creation'}
                    </Typography>
                </Grid>
                <Grid item xs={xs} sm={sm}>
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
                <Grid item xs={xs} sm={sm}>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Button
                                onClick={handleSubmit}
                                variant='outlined'
                                disabled={!title.validInput||(updater&&title.isDefault)}
                                color='primary'
                            >
                                {submitLabel}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={handleClear}
                                variant='outlined'
                                disabled={title.isEmpty||(updater&&title.isDefault)}
                                color='secondary'
                            >
                                {clearLabel}
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>
                
            </Grid>            
        </Container>
    )
}

export default NationCRUD