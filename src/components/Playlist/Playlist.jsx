import React from "react";
import TrackList from "../TrackList/TrackList";

function Playlist({ playlistName, tracks, onRemove, onNameChange, onSave }) {
    return (
        <div className="playlist">
            <input type="text" value={playlistName} onChange={(e) => onNameChange(e.target.value)} placeholder="Enter your playlist name" />
            <TrackList tracks={tracks} onRemove={onRemove} />
            <button className="playlist-save" onClick={onSave}>Save to Spotify</button>
        </div>
    );
};

export default Playlist;