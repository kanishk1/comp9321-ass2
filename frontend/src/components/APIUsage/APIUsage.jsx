import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../Context";

const APIUsage = () => {
  const [usage, setUsage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { isLoggedIn } = React.useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api-info/usage/`, {
      headers: {
        "Auth-Token": isLoggedIn
      }
    })
      .then(response => response.json())
      .then(response => {
        setUsage(response.No);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [isLoggedIn]);

  return (
    <>
      {isError && <div>Oops. Something went wrong ...</div>}
      {!isError && isLoading ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <p>This is your usage {usage}</p>
      )}
    </>
  );
};

export default APIUsage;
