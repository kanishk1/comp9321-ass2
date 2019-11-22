import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../Context";
import { useHistory } from "react-router-dom";

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
  }
}));

const Login = () => {
  const classes = useStyles();
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = {
      username: username,
      password: password
    };
    fetch("/auth/login", {
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
        {isLoading && <CircularProgress />}
      </form>
    </>
  );
};

export default Login;
