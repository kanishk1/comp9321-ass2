import React, { useState } from "react";
import Theme from "../Theme";
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context";
import NavBar from "../Navbar";
import MoviePrediction from "../MoviePrediction";
import APIUsage from "../APIUsage";
import Login from "../Login";
import DBInput from "../DBInput";
import SideNav from "../SideNav";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  }
}));

function App() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("authToken") || ""
  );

  const setToken = token => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(token);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: setToken }}>
      <MuiThemeProvider theme={Theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="App">
            <CssBaseline />
            <NavBar />
            <SideNav />
            <main className={classes.content}>
              <Switch>
                <Route exact path="/" component={MoviePrediction} />
                <Route exact path="/admin-login" component={Login} />
                <PrivateRoute exact path="/api-usage" component={APIUsage} />
                <PrivateRoute exact path="/db-input" component={DBInput} />
              </Switch>
            </main>
          </div>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </AuthContext.Provider>
  );
}

const PrivateRoute = ({ component: Component, path: string, ...rest }) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default App;
