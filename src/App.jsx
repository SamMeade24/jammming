import React, {useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";

function App() {
  // Mock data for testing TrackList and Track rendering
  const mockTracks = [
    { id: 1, name: "Tidal Wave", artist: "Meade", album: "MadeByMeade" }, 
    { id: 2, name: "Crafted Code", artist: "Sam Meade", album: "Portfolio" }, 
    { id: 3, name: "Red & Cream", artist: "MadeByMeade", album: "Brand Sound" }, 
  ];
  
  // Mock data for testing Playlist rendering
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: "Code Flow", artist: "Sam", album: "React Basics" }, 
    { id: 5, name: "Debugging Beats", artist: "Meade", album: "JS Essentials" }, 
  ]);

  function addTrack(track) {
    // Checks if the track is already within the playlist
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return; // Prevents duplication
    }

    // Adds a new track to the playlist
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }
  
  return(
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar />

      <div className="App-playlist">
        {/* Search results with mock tracks */}
        <SearchResults tracks={mockTracks} onAdd={addTrack} />

        {/* Playlist component for mock playlist */}
        <Playlist playlistName={playlistName} tracks={playlistTracks} />

      </div>
    </div>
  );
};

export default App;