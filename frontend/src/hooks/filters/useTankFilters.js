import { Grid } from "@material-ui/core";
import useNationFilter from "./useNationFilter";
import useTankStatusFilter from "./useTankStatusFilter";
import useTankTypeFilter from "./useTankTypesFilter";
import GridStyles from "../../styles/filter/GridStyles";

const useTankFilter = () => {
    const styles = GridStyles()
    const nation = useNationFilter();
    const type = useTankTypeFilter();
    const status = useTankStatusFilter();

    const render = () => {
        return (
            <Grid container justifyContent='center' className={styles.GridMarginBottom}>
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
            statuses: status.values
        }
    };
};

export default useTankFilter;
