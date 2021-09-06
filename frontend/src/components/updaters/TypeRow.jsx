import { Grid, Typography, Button } from "@material-ui/core";
import ButtonStyles from "../../styles/ButtonStyles";

const TypeRow = ({ id, title, titleShort, clickHandle, props }) => {
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
            <Grid item xs={12} sm={6} md={7}>
                <Grid container spacing={1}>
                    <Grid item xs={4} sm={4}>
                        <Typography variant="h6">Title:</Typography>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                        <Typography noWrap={true} variant="h6">
                            {title}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={1} md={1}>
                <Grid container>
                    
                    <Grid item xs={12}>
                        <Typography variant="h6">{titleShort}</Typography>
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
export default TypeRow;
