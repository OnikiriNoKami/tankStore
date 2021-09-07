import { Grid, Typography, Button } from "@material-ui/core";
import ButtonStyles from "../../../styles/ButtonStyles";

const RoleRow = ({ id, title, description, clickHandle, props }) => {
    const buttonStyles = ButtonStyles();
    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} sm={2}>
                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <Typography variant="h6">ID:</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="h6">{id}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={7} md={8}>
                <Grid container spacing={1}>
                    <Grid item xs={3} sm={3} md={2}>
                        <Typography variant="h6">Title:</Typography>
                    </Grid>
                    <Grid item xs={9} sm={4} md={4}>
                        <Typography noWrap={true} variant="h6">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={5} md={6}>
                        <Typography noWrap={true} variant='h6'>
                            {description}
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
export default RoleRow;