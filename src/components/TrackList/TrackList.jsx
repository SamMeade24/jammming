import React from "react";
import track from "../Track/Track";

function TrackList( { tracks }) {
    return (
        <div className="track-list">
            {tracks.map(track => (
                <Track key={track.id} track={track} />
            ))}
        </div>
    );
};

export default TrackList;