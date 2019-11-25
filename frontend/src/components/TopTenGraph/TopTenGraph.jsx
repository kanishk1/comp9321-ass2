import React from "react";
import Plot from "react-plotly.js";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    graph: {
      margin: "0 auto"
    },
    graphContainer: {
      height: "40vh",
      padding: 0,
      position: "relative",
      textAlign: "center"
    }
  })
);

export default function TopTenGraph(props) {
  const classes = useStyles();

  return (
    <div className={classes.graphContainer}>
      <Plot
        data={[
          {
            x: props.x,
            y: props.y,
            orientation: "h",
            type: "bar",
            marker: { color: "purple" }
          }
        ]}
        layout={{
          showlegend: false,
          autosize: true,
          margin: {
            t: 40,
            l: 140
          },
          xaxis: {
            title: "Revenue ($)"
          },
          yaxis: {
            title: props.name
          },
          title: props.name
        }}
        config={{
          responsive: true,
          displaylogo: false,
          modeBarButtons: [["zoom2d", "pan2d", "toImage"]],
          displayModeBar: true
        }}
        style={{ width: "95%", height: "95%" }}
        useResizeHandler
        className={classes.graph}
      />
    </div>
  );
}
