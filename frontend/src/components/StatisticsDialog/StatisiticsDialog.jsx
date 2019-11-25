import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TopTenGraph from "../TopTenGraph";
import Plot from "react-plotly.js";

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  graph: {
    margin: "0 auto"
  },
  graphContainer: {
    padding: 0,
    height: "60vh",
    position: "relative",
    textAlign: "center"
  }
}));

const StatisticsDialog = props => {
  const classes = useStyles();
  const [respStats, setRespStats] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (props.movieInfo) {
      fetch(
        `/top_10/?actors=${props.movieInfo.actors.toString()}&genres=${props.movieInfo.actors.toString()}&directors=${
          props.movieInfo.director
        }`
      )
        .then(response => response.json())
        .then(response => {
          setRespStats(response);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    } else {
      setIsLoading(false);
    }
  }, [props.movieInfo]);

  console.log(respStats);

  const pieValues = [10, 20, 40, 10, 20];
  const pieLabels = [
    "Movie Title",
    "Genres",
    "Actors",
    "Director",
    "Release Date"
  ];
  return (
    <>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          Feature Statistics
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText>
            These graphs show important each of the features are in the movie's
            success
          </DialogContentText>
          {respStats && (
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <div className={classes.graphContainer}>
                  <Plot
                    data={[
                      {
                        values: pieValues,
                        labels: pieLabels,
                        type: "pie"
                      }
                    ]}
                    layout={{
                      autosize: true,
                      title: "Feature Importance Breakdown",
                      hoverinfo: "percent+name",
                      textinfo: "none",
                      showlegend: false
                    }}
                    config={{
                      responsive: true,
                      displaylogo: false,
                      modeBarButtons: [["zoom2d", "pan2d", "toImage"]],
                      displayModeBar: true
                    }}
                    style={{ width: "120%", height: "120%" }}
                    useResizeHandler
                    className={classes.graph}
                  />
                </div>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TopTenGraph
                  x={respStats.actors.revenue.reverse()}
                  y={respStats.actors.names.reverse()}
                  input={respStats.actors.input}
                  name="Top 10 Actors"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TopTenGraph
                  x={respStats.directors.revenue.reverse()}
                  y={respStats.directors.names.reverse()}
                  input={respStats.directors.input}
                  name="Top 10 Directors"
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TopTenGraph
                  x={respStats.genres.revenue.reverse()}
                  y={respStats.genres.names.reverse()}
                  input={respStats.genres.input}
                  name="Top 10 Genres"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatisticsDialog;
