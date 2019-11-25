import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plot from "react-plotly.js";
import { AuthContext } from "../Context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  graph: {
    margin: "0 auto"
  },
  graphContainer: {
    height: "60vh",
    width: "40vw",
    padding: 0,
    position: "relative",
    textAlign: "center",
    margin: "10% auto"
  }
}));

const APIUsage = () => {
  const classes = useStyles();
  const [usage, setUsage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/private/usage/`, {
      headers: {
        "Auth-Token": isLoggedIn
      }
    })
      .then(response => response.json())
      .then(response => {
        setUsage(response);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [isLoggedIn]);
  const values = Object.values(usage);
  const labels = ["200", "201", "400", "401", "403"];
  return (
    <>
      {isError && <div>Oops. Something went wrong ...</div>}
      {!isError && isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <div className={classes.graphContainer}>
          <Plot
            data={[
              {
                values: values,
                labels: labels,
                type: "pie"
              }
            ]}
            layout={{
              autosize: true,
              title: "API Response Status Metrics"
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
      )}
    </>
  );
};

export default APIUsage;
