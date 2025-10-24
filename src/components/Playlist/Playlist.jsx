import React from "react";
import TrackList from "../TrackList/TrackList";

function Playlist({ playlistName, tracks, onRemove }) {
    return (
        <div className="playlist">
            <input type="text" value={playlistName} onChange={(e) => onNameChange(e.target.value)} />
            <TrackList tracks={tracks} onRemove={onRemove} />
        </div>
    );
};

export default Playlist;