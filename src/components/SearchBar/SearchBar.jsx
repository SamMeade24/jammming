import React, { useState } from "react";
import Spotify from "../../services/Spotify";

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState("");

    const handleSearch = () => {
        const token = Spotify.getAccessToken();
        console.log(token);

        onSearch(term);
    };
    
    return (
        <div className="search-bar">
            <input type="text" placeholder="Enter an artist, song or album" value={term} onChange={(e) => setTerm(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;