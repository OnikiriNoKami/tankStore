import { Grid, Typography, Button } from "@material-ui/core";
import ButtonStyles from "../../../styles/ButtonStyles";

const TankStatusRow = ({ id, title, clickHandle, props }) => {
    const buttonStyles = ButtonStyles();
    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} sm={3}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Typography variant="h5">ID:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h5">{id}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={4}>
                        <Typography variant="h5">Title:</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                        <Typography noWrap={true} variant="h5">
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        clickHandle(id);
                    }}
                    className={buttonStyles.searchButton}
                >
                    CHANGE
                </Button>
            </Grid>
        </Grid>
    );
};
export default TankStatusRow;