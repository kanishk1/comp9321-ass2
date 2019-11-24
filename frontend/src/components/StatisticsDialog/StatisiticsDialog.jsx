import React from "react";
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
    height: "40vh",
    position: "relative",
    textAlign: "center"
  }
}));

const StatisticsDialog = props => {
  const classes = useStyles();

  const values = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
  const labels = [
    "Label 1",
    "Label 2",
    "Label 3",
    "Label 4",
    "Label 5",
    "Label 6",
    "Label 7",
    "Label 8",
    "Label 9",
    "Label 10"
  ];

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
              <TopTenGraph x={values} y={labels} name="Top 10 Actors" />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TopTenGraph x={values} y={labels} name="Top 10 Directors" />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TopTenGraph x={values} y={labels} name="Top 10 Genres" />
            </Grid>
          </Grid>
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
