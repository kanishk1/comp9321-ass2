import React, { useEffect } from "react";
import MovieForm from "../MovieForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../Context";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formContainer: {
    width: "50%",
    marginRight: "25%",
    marginLeft: "25%"
  }
}));
const DBInput = () => {
  const classes = useStyles();
  const { isLoggedIn } = React.useContext(AuthContext);
  const [movieInfo, setMovieInfo] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [callSuccess, setCallSuccess] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = movieInfo;
      fetch("/api-info/input-movie", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Auth-Token": isLoggedIn,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => {
          setCallSuccess(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    };
    if (movieInfo) {
      fetchData();
    }
  }, [movieInfo, isLoggedIn]);

  return (
    <div className={classes.formContainer}>
      <h1>Input to database here</h1>
      <MovieForm setInfo={setMovieInfo} />
      {isError && <div>Oops. Something went wrong ...</div>}
      {!isError && isLoading && (
        <div>
          <CircularProgress />
        </div>
      )}
      {movieInfo && !isError && !isLoading && (
        <p>DB input was {callSuccess ? "Successful" : "Unsuccessful"}</p>
      )}
    </div>
  );
};

export default DBInput;
