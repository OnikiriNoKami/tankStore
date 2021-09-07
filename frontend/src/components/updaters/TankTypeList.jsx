import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import BackdropStyles from "../../styles/BackdropStyles"
import { tankTypeFetch } from "../../asyncActions/fetcher"
import { tankTypeSearch } from "../../asyncActions/searchFetcher"
import SearchBar from "./SearcBar"
import { Container, Grid, Typography, Modal, Paper } from "@material-ui/core"
import TypeRow from "./rows/TypeRow"
import TypeUpdater from "./modals/TypeUpdater"


const TankTypeList = () => {
    const classes = BackdropStyles()
    const dispatch = useDispatch()
    const tankTypes = useSelector(state=> state.tankTypes.tankTypes)
    const [open, setOpen] = useState(false)
    const [currentType, setCurrentType] = useState(null)

    const loadTypes = () => {
        dispatch(tankTypeFetch())
    }

    useEffect(()=> {
        loadTypes()
    }, [])

    const handleClick = (id) => {
        setCurrentType(id)
        setOpen(true)
    }

    const searchCallBack = (query) => {
        dispatch(tankTypeSearch(query))
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Container>
            <SearchBar
                label='Search in types...'
                callBack={searchCallBack}
                callReset={loadTypes}
            />
            <Grid container spacing={3} justifyContent="center">
                {tankTypes.length !== 0 ? (
                    tankTypes.map((type) => {
                        return (
                        <Grid key={type.id} item xs={11} sm={10}>
                            <TypeRow
                                id={type.id}
                                title={type.title}
                                titleShort={type.title_short}
                                clickHandle={handleClick}
                            />
                        </Grid>
                        );
                    })
                ) : (
                    <Typography variant="h4">No types</Typography>
                )}
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Paper className={classes.root}>
                    <TypeUpdater
                        reloadCallback={loadTypes}
                        callBack={handleClose}
                        clearLabel="reset"
                        submitLabel="save"
                        id={currentType}
                        xs={12}
                        sm={10}
                    />
                </Paper>
            </Modal>

        </Container>
    )
}

export default TankTypeList