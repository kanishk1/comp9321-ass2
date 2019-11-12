import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: "25%",
    marginRight: "25%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const MovieForm = () => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Movie Title"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            placeholder="Enter Title of the Movie"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Genre"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            placeholder="Enter Genre of the Movie"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Actors"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            placeholder="Enter the lead Actors"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Country"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            placeholder="Enter Country of Production"
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Predict
        </Button>
      </form>
    </>
  );
};

export default MovieForm;
