import { Container, Grid, Paper, Typography, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { nationFetch } from "../../../asyncActions/fetcher";
import { useEffect, useState } from "react";
import SearchBar from "../SearcBar";
import { nationSearch } from "../../../asyncActions/searchFetcher";
import NationRow from "../rows/NationRow";
import NationCRUD from "../../creators/NationCreator";
import BackdropStyles from "../../../styles/BackdropStyles";

const NationList = () => {
    const classes = BackdropStyles();
    const dispatch = useDispatch();
    const nations = useSelector((state) => state.nations.nations);
    const [currentNation, setCurrentNation] = useState(null);
    const [open, setOpen] = useState(false);

    const loadNations = () => {
        dispatch(nationFetch());
    };

    useEffect(() => {
        loadNations();
    }, []);

    const callBack = (query) => {
        dispatch(nationSearch(query));
    };

    const handleClick = (id) => {
        setOpen(true);
        setCurrentNation(id);
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
                callReset={loadNations}
            />
            <Grid container spacing={3} justifyContent="center">
                {nations.length !== 0 ? (
                    nations.map((nation) => {
                        return (
                            <Grid key={nation.id} item xs={11} sm={10}>
                                <NationRow
                                    id={nation.id}
                                    title={nation.title}
                                    clickHandle={handleClick}
                                />
                            </Grid>
                        );
                    })
                ) : (
                    <Typography variant="h4">No nations</Typography>
                )}
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Paper className={classes.root}>
                    <NationCRUD
                        role="updater"
                        reloadCallback={loadNations}
                        updaterCallback={handleChangeSubmit}
                        clearLabel="reset"
                        submitLabel="save"
                        id={currentNation}
                        xs={12}
                        sm={10}
                    />
                </Paper>
            </Modal>
        </Container>
    );
};

export default NationList;
