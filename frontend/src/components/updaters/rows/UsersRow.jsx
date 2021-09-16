import { Grid, Typography, Button } from "@material-ui/core";
import ButtonStyles from "../../../styles/ButtonStyles";

const UsersRow = ({ id, email, clickHandle, props }) => {
    const buttonStyles = ButtonStyles();
    return (
        <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12} sm={3}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Typography variant="h6">ID:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h6">{id}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
                <Grid container spacing={1}>
                    <Grid item xs={3} sm={3}>
                        <Typography variant="h6">Email:</Typography>
                    </Grid>
                    <Grid item xs={9} sm={9}>
                        <Typography  variant="h6">
                            {email}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
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

export default UsersRow;