import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const PredictRevenue = props => {
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
        <p>Our magic says...it'll make {revenue}</p>
      )}
    </div>
  );
};

export default PredictRevenue;
