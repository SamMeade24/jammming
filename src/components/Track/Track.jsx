import React from "react";

function Track( { track } ) {
    return (
        <div className="track">
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
            <button onClick={() => ongamepaddisconnected(track)}>+</button>
        </div>
    );
};

export default Track;