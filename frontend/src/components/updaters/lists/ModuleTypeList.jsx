import { Container, Grid, Typography, Modal, Paper } from "@material-ui/core"
import { moduleTypesFetch } from "../../../asyncActions/fetcher";
import { moduleTypesSearch } from "../../../asyncActions/searchFetcher";
import BackdropStyles from "../../../styles/BackdropStyles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../SearcBar';
import ModuleTypeRow from '../rows/ModuleTypeRow';
import ModuleTypeUpdater from '../modals/ModuleTypeUpdater';

const ModuleTypeList = () => {
    const classes = BackdropStyles();
    const dispatch = useDispatch();
    const moduleTypes = useSelector((state) => state.moduleTypes.moduleTypes);
    const [currentModuleType, setCurrentModuleType] = useState(null);
    const [open, setOpen] = useState(false);

    const loadModuleTypes = () => {
        dispatch(moduleTypesFetch());
    };

    useEffect(() => {
        loadModuleTypes();
    }, []);

    const callBack = (query) => {
        dispatch(moduleTypesSearch(query));
    };

    const handleClick = (id) => {
        setOpen(true);
        setCurrentModuleType(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeSubmit = () => {
        setOpen(false);
    };

    return (
        <Container>
            <SearchBar
                label="Search by title..."
                callBack={callBack}
                callReset={loadModuleTypes}
            />
            <Grid container spacing={3} justifyContent="center">
                {moduleTypes.length !== 0 ? (
                    moduleTypes.map((type) => {
                        return (
                            <Grid key={type.id} item xs={11} sm={10}>
                                <ModuleTypeRow
                                    id={type.id}
                                    title={type.title}
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
                    <ModuleTypeUpdater
                        reloadCallback={loadModuleTypes}
                        callBack={handleClose}
                        id={currentModuleType}
                        xs={12}
                        sm={10}
                    />
                </Paper>
            </Modal>

        </Container>
    );

}

export default ModuleTypeList