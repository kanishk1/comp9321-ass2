import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paperContainer: {
    width: "100%",
    height: "35vh",
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const PredictHit = props => {
  const classes = useStyles();

  const [movieSuccess, setMovieSuccess] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    const queryParams = "?movie_title=ken";
    fetch(`/movie/success/${queryParams}`)
      .then(response =>
        response.json().then(data => ({ status: response.status, body: data }))
      )
      .then(respObj => {
        setMovieSuccess(respObj.body.Bad);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [props.movieInfo]);

  return (
    <div>
      {isError && <div>Oops. Something went wrong ...</div>}
      {!isError && isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <Paper className={classes.paperContainer}>
          <Typography component="h5" variant="h5">
            Success Prediction:
          </Typography>

          <Typography component="h1" variant="h1">
            HIT
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default PredictHit;
