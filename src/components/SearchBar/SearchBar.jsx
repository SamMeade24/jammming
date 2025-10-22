import React from "react";

function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Enter an artist, song or album" />
            <button>Search</button>
        </div>
    );
};

export default SearchBar;