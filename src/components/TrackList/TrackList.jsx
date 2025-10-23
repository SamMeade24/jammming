import React from "react";
import Track from "../Track/Track";

function TrackList( { tracks, onAdd }) {
    return (
        <div className="track-list">
            {tracks.map(track => (
                <Track key={track.id} track={track} onAdd={onAdd} />
            ))}
        </div>
    );
};

export default TrackList;