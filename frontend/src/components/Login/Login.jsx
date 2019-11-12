import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "25vh",
    marginBottom: "25vh",
    marginLeft: '33%',
    marginRight: '33%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Login = () => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Username"
            margin="normal"
            variant="outlined"
            color="secondary"
            placeholder="Enter Username"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            color="secondary"
            placeholder="Enter Password"
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
