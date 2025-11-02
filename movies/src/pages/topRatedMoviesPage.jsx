import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import Spinner from "../components/spinner";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

const TopRatedMoviesPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isPending, isError } = useQuery ({
        queryKey: ["topRated", { page }],
        queryFn: () => getTopRatedMovies(page),
        keepPreviousData: true,
    });

    if (isPending) {
     return <Spinner />;
    }
    if (isError) {
     return <h1>{error.message}</h1>;
    }

    const movies = data.results;
    const totalPages = Math.min(data.total_pages, 500);

    return (
        <>
        <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => <AddToPlaylistIcon movie={movie} />}
        />
        <Grid container justifyContent="center" sx={{ paddingBottom: 4 }}>
            <Pagination
            count={totalPages}
            page={page}
            color="primary"
            onChange={(event, value) => setPage(value)}
            />
            </Grid>
        </>
    );
};

export default TopRatedMoviesPage;