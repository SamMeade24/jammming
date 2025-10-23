import React from "react";
import TrackList from "../TrackList/TrackList";

function SearchResults({ tracks, onAdd }) {
    return (
        <div className="search-results">
            <h2>Search Results</h2>
            <TrackList tracks={tracks} onAdd={onAdd} />
        </div>
    );
};

export default SearchResults;