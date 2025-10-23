import React from "react";

function Track( { track, onAdd, onRemove } ) {
    const addButton = onAdd ? (
        <button onClick={() => onAdd(track)}>+</button>
    ) : null;

    const removeButton = onRemove ? (
        <button onClick={() => onRemove(track)}>-</button>
    ) : null;
    
    return (
        <div className="track">
            <h3>{track.name}</h3>
            <p>{track.artist} | {track.album}</p>
            {addButton}
            {removeButton}
        </div>
    );
};

export default Track;