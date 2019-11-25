import React, { useEffect } from "react";
import MovieForm from "../MovieForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { AuthContext } from "../Context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formContainer: {
    width: "50%",
    marginRight: "25%",
    marginLeft: "25%"
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

const DBInput = () => {
  const classes = useStyles();
  const { isLoggedIn } = React.useContext(AuthContext);
  const [movieInfo, setMovieInfo] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = React.useState(false);
  const [openErrorSnack, setOpenErrorSnack] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = movieInfo;
      fetch("/private/input-movie", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Auth-Token": isLoggedIn,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          setIsLoading(false);
          if (response.status === 201) {
            setOpenSuccessSnack(true);
          } else {
            setOpenErrorSnack(true);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setOpenErrorSnack(true);
        });
    };
    if (movieInfo) {
      fetchData();
    }
  }, [movieInfo, isLoggedIn]);

  return (
    <div className={classes.formContainer}>
      <h1>Input to database here</h1>
      <MovieForm setInfo={setMovieInfo} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSuccessSnack}
        onClose={() => setOpenSuccessSnack(false)}
        variant="error"
        autoHideDuration={5000}
      >
        <SnackbarContent
          className={`${classes.success} ${classes.margin}`}
          message={
            <span id="message-id" className={classes.message}>
              <CheckCircleIcon
                className={`${classes.icon} ${classes.iconVariant}`}
              />
              Yay! New movie added to the database
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenSuccessSnack(false)}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
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
              <ErrorIcon className={`${classes.icon} ${classes.iconVariant}`} />
              Oops...Something went wrong, please try again
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
      {!openErrorSnack && isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default DBInput;
