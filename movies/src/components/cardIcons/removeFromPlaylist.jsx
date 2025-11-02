import React, { useContext } from "react";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";
import Icon from "@mui/material/Icon";

const RemoveFromPlaylistIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemove = (e) => {
        e.preventDefault();
        context.removeFromMustWatch(movie);
    };

    return (
        <IconButton aria-label="remove from playlist" onClick={handleRemove}>
            <PlaylistRemoveIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromPlaylistIcon;