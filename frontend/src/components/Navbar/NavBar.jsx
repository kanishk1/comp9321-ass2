import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      flexGrow: 1,
      margin: theme.spacing(2),
      color: "#fff",
      fontWeight: 400
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  })
);

const NavBar = () => {
  const classes = useStyles();
  const location = useLocation();

  let pageTitle = "Movie Prediction";
  switch (location.pathname) {
    case "/":
      pageTitle = "Movie Prediction";
      break;
    case "/admin-login":
      pageTitle = "Admin Login";
      break;
    case "/api-usage":
      pageTitle = "API Usage Information";
      break;
    case "/db-input":
      pageTitle = "Input Data to Database";
      break;
    default:
      pageTitle = "Movie Prediction";
  }
  return (
    <AppBar position="static" className={classes.appBar}>
      <Box textAlign="center">
        <Typography variant="h6" className={classes.title}>
          {pageTitle}
        </Typography>
      </Box>
    </AppBar>
  );
};

export default NavBar;
