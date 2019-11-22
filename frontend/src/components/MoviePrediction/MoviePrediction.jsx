import React from "react";
import PredictHit from "../PredictHit";
import PredictRevenue from "../PredictRevenue";
import MovieForm from "../MovieForm";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  predictionContainer: {
    bottom: "5%",
    width: "100%",
    textAlign: "center",
    display: "flex",
    marginLeft: "25%",
    marginRight: "25%"
  },
  prediction: {
    width: "50%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));
const MoviePrediction = () => {
  const [movieInfo, setMovieInfo] = React.useState({});
  const classes = useStyles();
  return (
    <>
      <MovieForm setInfo={setMovieInfo} />
      <Box className={classes.predictionContainer}>
        <PredictHit className={classes.prediction} movieInfo={movieInfo} />
        <PredictRevenue className={classes.prediction} movieInfo={movieInfo} />
      </Box>
    </>
  );
};

export default MoviePrediction;
