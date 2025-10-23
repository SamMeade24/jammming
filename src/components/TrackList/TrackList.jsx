import React from "react";
import Track from "../Track/Track";

function TrackList( { tracks, onAdd, onRemove }) {
    return (
        <div className="track-list">
            {tracks.map(track => (
                <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default TrackList;