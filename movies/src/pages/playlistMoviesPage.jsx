import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";

const PlaylistMoviesPage = () => {
    const { mustWatch: movieIds } = useContext(MoviesContext);

    const playlistQueries = useQueries({
        queries: movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        }),
    });

    const isLoading = playlistQueries.some((q) => q.isLoading);
    if (isLoading) return <Spinner />;

    const movies = playlistQueries
        .map((q) => q.data)
        .filter((data) => !!data)
        .map((data) => {
            if (data.genres) {
                data.genre_ids = data.genres.map((g) => g.id);
        }
        return data;
    });

    return (
        <PageTemplate
            title="My Playlist"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                    <RemoveFromPlaylistIcon movie={movie} />
                    <WriteReview movie={movie} />
                    </>
                );
            }}
        />
    );
}

export default PlaylistMoviesPage;