import ButtonStyles from "../../styles/ButtonStyles";
import GridStyles from "../../styles/filter/GridStyles";
import useNationFilter from "../../hooks/filters/useNationFilter";
import useTankTypeFilter from "../../hooks/filters/useTankTypesFilter";
import useTankStatusFilter from "../../hooks/filters/useTankStatusFilter";
import { useState } from "react";
import PriceFilterHorizontal from "./PriceFilterHorizontal";
import {
    Grid,
    Button,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";

const TankFilterHorizontal = ({ applyFilter, reloadCallback }) => {
    const classes = ButtonStyles();
    const styles = GridStyles();
    const nation = useNationFilter();
    const type = useTankTypeFilter();
    const status = useTankStatusFilter();
    const [priceFilterValid, setPriceFilterValid] = useState(false);
    const [priceFilter, setPriceFilter] = useState([]);
    const [clear, setClear] = useState(false);

    const [applyed, setApplyed] = useState(false);

    const handleClear = () => {
        setClear(true);
        nation.clear();
        type.clear();
        status.clear();
    };

    const handleReset = (e) => {
        handleClear();
        if (applyed) {
            setApplyed(false);
            reloadCallback();
        }
    };

    const handleApply = () => {
        if (nation.valid || type.valid || status.valid || priceFilterValid) {
            setApplyed(true);
            applyFilter([
                ...nation.filter,
                ...type.filter,
                ...status.filter,
                ...priceFilter,
            ]);
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={11}>
                <Accordion style={{marginBottom: 10, marginTop: 8,}}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Additional filter</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            justifyContent="center"
                            className={styles.GridMarginBottom}
                        >
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    spacing={3}
                                    justifyContent="center"
                                >
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
                                        <PriceFilterHorizontal
                                            clear={clear}
                                            setClear={setClear}
                                            filterGetter={setPriceFilter}
                                            filterValid={setPriceFilterValid}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6} sm={4} md={3}>
                                                <Button
                                                    onClick={handleApply}
                                                    color="primary"
                                                    className={
                                                        classes.searchButton
                                                    }
                                                    variant="outlined"
                                                    disabled={
                                                        !nation.valid &&
                                                        !status.valid &&
                                                        !type.valid &&
                                                        !priceFilterValid
                                                    }
                                                >
                                                    apply filter
                                                </Button>
                                            </Grid>
                                            <Grid item xs={6} sm={4} md={3}>
                                                <Button
                                                    onClick={handleReset}
                                                    color="secondary"
                                                    className={
                                                        classes.searchButton
                                                    }
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
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
};

export default TankFilterHorizontal;
