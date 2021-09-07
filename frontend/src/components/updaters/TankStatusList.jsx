import { Container, Grid, Typography, Modal, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tankStatusFetch } from "../../asyncActions/fetcher";
import { tankTypeSearch } from "../../asyncActions/searchFetcher";
import BackdropStyles from "../../styles/BackdropStyles";
import TankStatusRow from "./rows/TankStatusRow";
import TankStatusUpdater from "./modals/TankStatusUpdater";
import SearchBar from "./SearcBar";

const TankStatusList = () => {
    const classes = BackdropStyles();
    const dispatch = useDispatch();
    const tankStatus = useSelector((state) => state.tankStatuses.statuses);

    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);

    const loadStatuses = () => {
        dispatch(tankStatusFetch());
    };

    useEffect(() => {
        loadStatuses();
    }, []);

    const handleClick = (id) => {
        setCurrentStatus(id);
        setOpen(true);
    };

    const searchCallBack = (query) => {
        dispatch(tankTypeSearch(query));
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <SearchBar
                label="Search in tank statuses..."
                callBack={searchCallBack}
                callReset={loadStatuses}
            />
            <Grid container spacing={3} justifyContent="center">
                {tankStatus.length !== 0 ? (
                    tankStatus.map((status) => {
                        return (
                            <Grid key={status.id} item xs={11} sm={10}>
                                <TankStatusRow
                                    id={status.id}
                                    title={status.title}
                                    clickHandle={handleClick}
                                />
                            </Grid>
                        );
                    })
                ) : (
                    <Typography variant="h4">No statuses</Typography>
                )}
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Paper className={classes.root}>
                    <TankStatusUpdater
                        reloadCallback={loadStatuses}
                        callBack={handleClose}
                        id={currentStatus}
                        xs={12}
                        sm={10}
                    />
                </Paper>
            </Modal>
        </Container>
    );
};

export default TankStatusList;
