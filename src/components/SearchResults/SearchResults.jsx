import React from "react";
import TrackList from "../TrackList/TrackList";

function SearchResults() {
    return (
        <div clasName="search-results">
            <h2>Search Results</h2>
            <TrackList tracks={tracks} />
        </div>
    );
};

export default SearchResults;