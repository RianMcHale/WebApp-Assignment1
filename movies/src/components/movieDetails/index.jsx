import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { useQuery } from '@tanstack/react-query';
import { getMovieCredits, getMovieRecommendations } from '../../api/tmdb-api';
import Grid from '@mui/material/Grid';
import { Link } from "react-router";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: creditsData, isError: creditsError } = useQuery({
    queryKey: ['credits', { id: movie.id }],
    queryFn: getMovieCredits,
  });
  const { data: recommendationsData, isError: recError } = useQuery({
    queryKey: ['recommendations', { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{ ...chip }} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
        <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      {movie.production_countries && movie.production_countries.length > 0 && (
        <Paper component="ul" sx={{ ...root }}>
          <li>
            <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
          </li>
          {movie.production_countries.map((country) => (
            <li key={country.name}>
              <Chip label={country.name} sx={{ ...chip }} />
            </li>
          ))}
        </Paper>
      )}

      {/* cast list */}
      {creditsData && creditsData.cast && creditsData.cast.length > 0 && (
        <>
          <Typography variant="h6" component="p" sx={{ marginTop: 2 }}>
            Cast
          </Typography>
          <Paper component="ul" sx={{ ...root }}>
            {creditsData.cast.slice(0, 10).map((member) => (
              <li key={member.cast_id || member.credit_id}>
                <Chip
                label={`${member.name} as ${member.character}`}
                sx={{ ...chip }}
                />
              </li>
            ))}
          </Paper>
        </>
      )}
      {/* recommended movies  */}
      {recommendationsData && recommendationsData.results && recommendationsData.results.length > 0 && (
        <>
          <Typography variant="h6" component="p" sx={{ marginTop: 2}}>
            Recommendations
          </Typography>
          <Paper component="div" sx={{ padding: 1 }}>
          <Grid container spacing={1}>
            {recommendationsData.results.slice(0, 12).map((rec) => (
              <Grid item key={rec.id}>
                <Chip
                label={rec.title}
                component={Link}
                to={`/mvoies/${rec.id}`}
                clickable
                sx={{ margin: 0.5 }}
                />
                </Grid>
            ))}
            </Grid>
            </Paper>
          </>
      )}
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "1em",
          right: "1em",
        }}
      >
      <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
