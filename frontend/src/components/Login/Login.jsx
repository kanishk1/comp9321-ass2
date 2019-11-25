import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../Context";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "25vh",
    marginBottom: "25vh",
    marginLeft: "33%",
    marginRight: "33%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  },
  success: {
    backgroundColor: "#43a047"
  },
  error: {
    backgroundColor: "#d32e2f"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  margin: theme.spacing(1)
}));

const Login = () => {
  const classes = useStyles();
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [openErrorSnack, setOpenErrorSnack] = React.useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = {
      username: username,
      password: password
    };
    fetch("/auth-token", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response =>
        response.json().then(data => ({ status: response.status, body: data }))
      )
      .then(respObj => {
        setIsLoggedIn(respObj.body.token);
        setIsLoading(false);
        if (respObj.status === 200) {
          history.push("/api-usage");
        } else {
          setOpenErrorSnack(true);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  return (
    <>
      {isError && <div>Oops. Something went wrong ...</div>}
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-basic-username"
            className={classes.textField}
            label="Username"
            margin="normal"
            variant="outlined"
            color="secondary"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic-password"
            className={classes.textField}
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            color="secondary"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={fetchData}
          disabled={isLoading}
        >
          Login
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openErrorSnack}
          onClose={() => setOpenErrorSnack(false)}
          variant="error"
          autoHideDuration={5000}
        >
          <SnackbarContent
            className={`${classes.error} ${classes.margin}`}
            message={
              <span id="message-id" className={classes.message}>
                <ErrorIcon
                  className={`${classes.icon} ${classes.iconVariant}`}
                />
                Oops...Incorrect Credentials
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={() => setOpenErrorSnack(false)}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
        {isLoading && <CircularProgress />}
      </form>
    </>
  );
};

export default Login;
