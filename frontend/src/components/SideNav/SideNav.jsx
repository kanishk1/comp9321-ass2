import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PieChartIcon from "@material-ui/icons/PieChart";
import StorageIcon from "@material-ui/icons/Storage";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}));

const SideNav = () => {
  const classes = useStyles();
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to={"/admin-login"}>
          <ListItem button key={"Admin Login"}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={"Admin Login"} />
          </ListItem>
        </Link>
        <Link to={"/"}>
          <ListItem button key={"Movie Predictions"}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary={"Movie Predictions"} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {isLoggedIn && (
        <>
          <List>
            <Link to={"/api-usage"}>
              <ListItem button key={"API Usage"}>
                <ListItemIcon>
                  <PieChartIcon />
                </ListItemIcon>
                <ListItemText primary={"API Usage"} />
              </ListItem>
            </Link>
            <Link to={"/db-input"}>
              <ListItem button key={"Input to Database"}>
                <ListItemIcon>
                  <StorageIcon />
                </ListItemIcon>
                <ListItemText primary={"Input to Database"} />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </>
      )}
    </Drawer>
  );
};

export default SideNav;
