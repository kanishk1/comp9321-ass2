import React from "react";
import PredictHit from "../PredictHit";
import PredictRevenue from "../PredictRevenue";
import MovieForm from "../MovieForm";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import StatisticsDialog from "../StatisticsDialog";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  movieContainer: {
    width: "100%",
    display: "flex"
  },
  predictionContainer: {
    width: "45%",
    textAlign: "center",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "inline-block"
  },
  formContainer: {
    width: "50%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    display: "inline-block"
  },
  prediction: {},
  button: {
    marginLeft: theme.spacing(2),
    textAlign: "left"
  }
}));

const MoviePrediction = () => {
  const classes = useStyles();
  const [movieInfo, setMovieInfo] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.movieContainer}>
      <Box className={classes.formContainer}>
        <MovieForm setInfo={setMovieInfo} />
      </Box>
      <Box className={classes.predictionContainer}>
        <PredictHit className={classes.prediction} movieInfo={movieInfo} />
        <PredictRevenue className={classes.prediction} movieInfo={movieInfo} />
        <Box className={classes.button}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            disabled={movieInfo ? false : true}
            onClick={handleOpen}
          >
            Explore Statistics
          </Button>
        </Box>
      </Box>
      <StatisticsDialog open={openDialog} handleClose={handleClose} movieInfo={movieInfo}/>
    </div>
  );
};

export default MoviePrediction;
