import { Container, Grid, Button, TextField } from "@material-ui/core";
import useValidatedInput from "../../hooks/useValidatedInput";
import ButtonStyles from "../../styles/ButtonStyles";

const SearchBar = ({ label, callBack }) => {
  const classes = ButtonStyles();
  const searchQuery = useValidatedInput("", {
    isEmpty: true,
    minLength: 2,
    maxLenght: 100,
  });

  const handleClick = (e) => {
    e.preventDefault();
    callBack(searchQuery.value)
  };

  return (
    <Container>
      <form>
        <Grid container spacing={2} direction="row">
          <Grid item xs={10}>
            <TextField
              size="small"
              onChange={searchQuery.onChange}
              onBlur={searchQuery.onBlur}
              value={searchQuery.value}
              autoComplete="off"
              fullWidth
              variant="outlined"
              label={label}
            ></TextField>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={(e) => {
                handleClick(e);
              }}
              className={classes.searchButton}
              variant="outlined"
            >
              FIND
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SearchBar;
