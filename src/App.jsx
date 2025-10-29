import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./services/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    async function initSpotify() {
      const token = await Spotify.getAccessToken();
      console.log("Spotify access token:", token);
    }
  
    initSpotify();
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