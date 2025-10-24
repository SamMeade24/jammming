import React from "react";
import TrackList from "../TrackList/TrackList";

function Playlist({ playlistName, tracks, onRemove, onNameChange }) {
    return (
        <div className="playlist">
            <input type="text" value={playlistName} onChange={(e) => onNameChange(e.target.value)} placeholder="Enter your playlist name" />
            <TrackList tracks={tracks} onRemove={onRemove} />
        </div>
    );
};

export default Playlist;