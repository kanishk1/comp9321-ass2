import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { format } from "date-fns";
import NumberFormat from "react-number-format";
import { actors } from "../../static/actors";
import { directors } from "../../static/directors";
import { genres } from "../../static/genres";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';

function renderRow(props) {
  const { data, index, style } = props;

  return React.cloneElement(data[index], {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block',
      ...style,
    },
  });
}

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%"
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

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
};

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = smUp ? 36 : 48;

  const outerElementType = React.useMemo(() => {
    return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <FixedSizeList
        style={{ padding: 0, height: Math.min(8, itemCount) * itemSize, maxHeight: 'auto' }}
        itemData={children}
        height={250}
        width="100%"
        outerElementType={outerElementType}
        innerElementType="ul"
        itemSize={itemSize}
        overscanCount={5}
        itemCount={itemCount}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});

const MovieForm = props => {
  const classes = useStyles();
  const [movieTitle, setMovieTitle] = React.useState("");
  const [genreList, setGenreList] = React.useState([]);
  const [actorList, setActorList] = React.useState([]);
  const [director, setDirector] = React.useState("");
  const [releaseDate, setReleaseDate] = React.useState(Date.now());
  const [budget, setBudget] = React.useState(0);

  const handleSubmit = () => {
    const info = {
      title: movieTitle,
      genre: genreList.map(item => item.title),
      actors: actorList.map(item => item.title),
      director: director,
      release_date: format(releaseDate, "yyyy-MM-dd"),
      budget: Number(budget)
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
            ListboxComponent={ListboxComponent}
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
            id="outlined-basic-director"
            className={classes.textField}
            label="Director"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            value={director}
            placeholder="Enter Director of Production"
            onChange={e => setDirector(e.target.value)}
          />
        </div>
        <div>
          <KeyboardDatePicker
            margin="normal"
            className={classes.textField}
            id="date-picker-dialog"
            label="Release Date"
            format="dd/MM/yyyy"
            value={releaseDate}
            inputVariant="outlined"
            color="secondary"
            onChange={setReleaseDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic-budget"
            className={classes.textField}
            label="Budget"
            margin="normal"
            variant="outlined"
            color="secondary"
            fullWidth={true}
            placeholder="Enter Production Budget"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            InputProps={{
              inputComponent: NumberFormatCustom
            }}
          />
        </div>

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default MovieForm;
