import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortFilter, setSortFilter] = useState("");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1)
    .filter((m) => genreId > 0 ? m.genre_ids.includes(genreId) : true);


  displayedMovies = displayedMovies.sort((a, b) => {
    switch (sortFilter) {
      case "rating":
        return b.vote_average - a.vote_average;
      case "releaseDate":
        return new Date(b.release_date) - new Date(a.release_date);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleChange = (type, value) => {
    if (type === "name") {
      setNameFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    } else if (type === "sort") {
      setSortFilter(value);
    }
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortFilter={sortFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
