import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const PredictHit = props => {
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
        <p>Our magic says...its a {movieSuccess}</p>
      )}
    </div>
  );
};

export default PredictHit;
