import { Grid, Typography, Button } from "@material-ui/core";

const NationRow = ({ id, title, props }) => {
  return (
    <Grid container justifyContent='center' spacing={1}>
      <Grid item xs={12} sm={5}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="h5">ID:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">{id}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Grid container spacing={1}>
          <Grid item xs={4} sm={3}>
            <Typography variant="h5">Title:</Typography>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default NationRow;
