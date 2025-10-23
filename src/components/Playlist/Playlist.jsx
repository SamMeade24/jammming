import React from "react";
import TrackList from "../TrackList/TrackList";

function Playlist({ playlistName, tracks, onRemove }) {
    return (
        <div className="playlist">
            <h2>{playlistName}</h2>
            <TrackList tracks={tracks} onRemove={onRemove} />
        </div>
    );
};

export default Playlist;