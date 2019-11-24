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

const PredictRevenue = props => {
  const classes = useStyles();
  const [revenue, setRevenue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    console.log("triggered");
    setIsLoading(true);
    const queryParams = "?movie_title=ken";
    fetch(`/movie/revenue/${queryParams}`)
      .then(response =>
        response.json().then(data => ({ status: response.status, body: data }))
      )
      .then(respObj => {
        setRevenue(respObj.body.No);
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
            Revenue Prediction:
          </Typography>
          <Typography component="h1" variant="h1">
            $0
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default PredictRevenue;
