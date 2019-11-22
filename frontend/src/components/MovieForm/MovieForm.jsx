import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: "25%",
    marginRight: "25%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const genres = [
  { title: "Action" },
  { title: "Romance" },
  { title: "Comedy" },
  { title: "Sci-Fi" }
];

const actors = [
  { title: "Tom Hanks" },
  { title: "Emma Watson" },
  { title: "Al Pacino" },
  { title: "Emily Blunt" }
];

const MovieForm = props => {
  const classes = useStyles();
  const [movieTitle, setMovieTitle] = React.useState("");
  const [genreList, setGenreList] = React.useState([]);
  const [actorList, setActorList] = React.useState([]);
  const [country, setCountry] = React.useState("");

  const handleSubmit = () => {
    const info = {
      movie_title: movieTitle,
      genre_list: genreList,
      actor_list: actorList,
      country: country
    };
    console.log(info);
    props.setInfo(info);
  };

  return (
    <>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-basic-movie"
            className={classes.textField}
            label="Movie Title"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            placeholder="Enter Title of the Movie"
            value={movieTitle}
            onChange={e => setMovieTitle(e.target.value)}
          />
        </div>
        <div>
          <Autocomplete
            id="combo-box"
            options={genres}
            multiple
            className={classes.textField}
            getOptionLabel={option => option.title}
            value={genreList}
            onChange={(_event, value) => setGenreList(value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Genre"
                variant="outlined"
                color="secondary"
                margin="normal"
                fullWidth={true}
                placeholder="Enter Genre of the Movie"
              />
            )}
          />
        </div>
        <div>
          <Autocomplete
            id="combo-box-actors"
            options={actors}
            multiple
            value={actorList}
            className={classes.textField}
            getOptionLabel={option => option.title}
            onChange={(_event, value) => setActorList(value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Actors"
                color="secondary"
                margin="normal"
                variant="outlined"
                fullWidth={true}
                placeholder="Enter the lead Actors"
              />
            )}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic-country"
            className={classes.textField}
            label="Country"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            placeholder="Enter Country of Production"
            onChange={e => setCountry(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Predict
        </Button>
      </form>
    </>
  );
};

export default MovieForm;
