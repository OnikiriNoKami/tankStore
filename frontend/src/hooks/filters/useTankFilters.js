import { Grid, Button } from "@material-ui/core";
import useNationFilter from "./useNationFilter";
import useTankStatusFilter from "./useTankStatusFilter";
import useTankTypeFilter from "./useTankTypesFilter";
import GridStyles from "../../styles/filter/GridStyles";
import { useEffect, useState } from "react";
import ButtonStyles from "../../styles/ButtonStyles";

const useTankFilter = () => {
    const classes = ButtonStyles();
    const styles = GridStyles();
    const nation = useNationFilter();
    const type = useTankTypeFilter();
    const status = useTankStatusFilter();
    const [filter, setFilter] = useState([]);
    const [applyReq, setApplyReq] = useState(false);

    const handleClear = () => {
        nation.clear();
        type.clear();
        status.clear();
    };

    const handleClick = (e) => {
        setApplyReq(true);
    };

    const handleReset = (e) => {
        setApplyReq(false);
        handleClear();
        setTimeout(()=>{
           handleClick();
        }, 250);
    };

    useEffect(() => {
        setFilter([...nation.filter, ...type.filter, ...status.filter]);
    }, [nation.filter, type.filter, status.filter]);

    useEffect(()=>{
        if(applyReq){
            setApplyReq(false);
        }
    }, [applyReq])

    const render = () => {
        return (
            <Grid
                container
                justifyContent="center"
                className={styles.GridMarginBottom}
            >
                <Grid item xs={11}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} md={4}>
                            {nation.render()}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {type.render()}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {status.render()}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Button
                                        onClick={(e) => {
                                            handleClick(e);
                                        }}
                                        color="primary"
                                        className={classes.searchButton}
                                        variant="outlined"
                                        //disabled={!searchQuery.validInput}
                                    >
                                        apply filter
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Button
                                        onClick={(e) => {
                                            handleReset(e);
                                        }}
                                        color="secondary"
                                        className={classes.searchButton}
                                        variant="outlined"
                                    >
                                        clear filter
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    return {
        render,
        values: {
            nations: nation.values,
            types: type.values,
            statuses: status.values,
        },
        filter,
        clear: handleClear,
        request: applyReq,
    };
};

export default useTankFilter;
