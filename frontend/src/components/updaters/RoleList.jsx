import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import BackdropStyles from "../../styles/BackdropStyles"
import { roleFetch } from "../../asyncActions/fetcher"
import { roleSearch } from "../../asyncActions/searchFetcher"
import SearchBar from "./SearcBar"
import { Container, Grid, Typography, Modal, Paper } from "@material-ui/core"
import RoleRow from "./rows/RoleRow"
import RoleUpdater from './modals/RoleUpdater';


const RoleList = () => {
    const classes = BackdropStyles()
    const dispatch = useDispatch()
    const roles = useSelector(state=> state.roles.roles)
    const [open, setOpen] = useState(false)
    const [currentRole, setCurrentRole] = useState(null)

    const loadRoles = () => {
        dispatch(roleFetch())
    }

    useEffect(()=> {
        loadRoles()
    }, [])

    const handleClick = (id) => {
        setCurrentRole(id)
        setOpen(true)
    }

    const searchCallBack = (query) => {
        dispatch(roleSearch(query))
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Container>
            <SearchBar
                label='Search in roles...'
                callBack={searchCallBack}
                callReset={loadRoles}
            />
            <Grid container spacing={3} justifyContent="center">
                {roles.length !== 0 ? (
                    roles.map((role) => {
                        return (
                        <Grid key={role.id} item xs={11} sm={10}>
                            <RoleRow
                                id={role.id}
                                title={role.title}
                                description={role.description}
                                clickHandle={handleClick}
                            />
                        </Grid>
                        );
                    })
                ) : (
                    <Typography variant="h4">No roles</Typography>
                )}
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Paper className={classes.root}>
                    <RoleUpdater
                        reloadCallback={loadRoles}
                        callBack={handleClose}
                        clearLabel="reset"
                        submitLabel="save"
                        id={currentRole}
                        xs={12}
                        sm={10}
                    />
                </Paper>
            </Modal>
            

        </Container>
    )
}

export default RoleList