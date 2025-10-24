import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./services/Spotify";

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
    { id: 4, name: "Code Flow", artist: "Sam", album: "React Basics", uri: "spotify:track:104" }, 
    { id: 5, name: "Debugging Beats", artist: "Meade", album: "JS Essentials", uri: "spotify:track:105" }, 
  ]);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const token = Spotify.getAccessToken();
    console.log(token);
  }, []);

  function search(term) {
    Spotify.search(term).then(results => setSearchResults(results));
  };

  function addTrack(track) {
    // Checks if the track is already within the playlist
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return; // Prevents duplication
    };

    // Adds a new track to the playlist
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  function removeTrack(track) {
    // Removes track from the playlist
    setPlaylistTracks((prevTracks) => prevTracks.filter((savedTrack)=> savedTrack.id !== track.id));
  };

  function updatePlaylistName(name) {
    setPlaylistName(name);
  };

  function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    console.log("Saving Playlist:", playlistName, trackURIs);
  };
  
  return(
    <div className="App">
      <h1>Jamming</h1>
      <SearchBar onSearch={search} />

      <div className="App-playlist">
        {/* Search results with mock tracks */}
        <SearchResults tracks={searchResults} onAdd={addTrack} />

        {/* Playlist component for mock playlist */}
        <Playlist playlistName={playlistName} tracks={playlistTracks} onRemove={removeTrack} onNameChange={updatePlaylistName} onSave={savePlaylist} />

      </div>
    </div>
  );
};

export default App;