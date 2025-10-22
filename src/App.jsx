import React, { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

function App() {
  // Mock data for testing TrackList and Track rendering
  const mockTracks = [
    { id: 1, name: "Tidal Wave", artist: "Meade", album: "MadeByMeade" }, 
    { id: 2, name: "Crafted Code", artist: "Sam Meade", album: "Portfolio" }, 
    { id: 3, name: "Red & Cream", artist: "MadeByMeade", album: "Brand Sound" }, 
  ];
  
  return(
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar />

      <div className="App=playlist">
        {/* Search results with mock tracks */}
        <SearchResults tracks={mockTracks}/>

        {/* Playlist component for future steps */}
        <Playlist />

      </div>
    </div>
  );
};

export default App;