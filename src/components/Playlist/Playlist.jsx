import React from "react";
import TrackList from "../TrackList/TrackList";

function Playlist({ playlistName, tracks }) {
    return (
        <div className="playlist">
            <h2>{playlistName}</h2>
            <TrackList tracks={tracks} />
        </div>
    );
};

export default Playlist;