import React, { useState, useEffect, useRef } from "react";
import Icon from "@material-ui/core/Icon";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "./Components/Loader/Loader";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("batman");
  const [query, setQuery] = useState("");
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(3);
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);
  useEffect(() => {
    setLoading(true);
    fetch(`http://www.omdbapi.com/?apikey=8a761d4&s=${search}`)
      .then(res => res.json())
      .then(res => {
        setMovies(res.Search);
        setLoading(false);
      });
  }, [search]);

  const handleQuery = e => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    setSearch(query);
    setQuery("");
  };
  const handlePagination = (event, page) => {
    const l = page * 3;
    const f = l - 3;
    setFirst(f);
    setLast(l);
  };
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ margin: "5rem 0" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={4}
          style={{ display: "flex" }}
        >
          <TextField
            label="Search Movie"
            fullWidth
            onChange={handleQuery}
            ref={inputEl}
            value={query}
          />
          <Button
            size="medium"
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SearchIcon />}
            onClick={handleSearch}
          >
            Send
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} justify="center">
        {!loading ? (
          movies ? (
            movies.slice(first, last).map(movie => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Poster"
                        height="400"
                        image={movie.Poster}
                        title="Poster"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {movie.Title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Year {movie.Year}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Alert severity="error">Nothing Found!</Alert>
            </Grid>
          )
        ) : (
          <Loader />
        )}
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ margin: "3rem 0" }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={4}
          style={{ display: "flex" }}
        >
          {movies && !loading && (
            <Pagination
              count={Math.ceil(movies.length / 3)}
              color="primary"
              onChange={handlePagination}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
