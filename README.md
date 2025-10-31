# Jammming

Jammming is a React web application that allows users to search for songs on Spotify, create custom playlists, and save them directly to their Spotify account. This project was built using **React** and **Vite**, with full integration of the Spotify Web API using the **Authorization Code with PKCE** flow.

---

## Features

- Search Spotify for tracks by artist, song name, or album
- Add tracks to a custom playlist
- Remove tracks from the playlist
- Rename playlists
- Save playlists to your Spotify account
- Full authentication with Spotify using PKCE flow
- Real-time feedback messages during save operations
- Responsive, component-based UI

---

## Installation & Setup

1. **Clone the repository**  
    git clone <your-repo-url>  
    cd Jammming

2. **Install dependencies**  
    npm install

3. **Run the app locally**  
    npm run dev

4. **Access the app**  
    Open your browser at `http://localhost:5173` (or the address provided by Vite).

> The app will prompt you to log in to Spotify the first time you search or save a playlist.

---

## Project Structure

Jammming/
├── public/ # Static assets
├── src/
│ ├── components/ # React components
│ │ ├── Playlist/
│ │ ├── SearchBar/
│ │ ├── SearchResults/
│ │ ├── Track/
│ │ └── TrackList/
│ ├── services/
│ │ └── Spotify.js # Spotify API module
│ ├── App.jsx
│ ├── App.css
│ └── main.jsx
├── package.json
├── vite.config.js
└── README.md

---

## How It Works

1. **Authentication**  
   The app uses Spotify’s Authorization Code with PKCE flow to securely access a user’s account. Tokens are stored in localStorage and automatically refreshed when expired.

2. **Searching Tracks**  
   Enter a search term in the search bar. The app queries Spotify’s `/v1/search?type=track` endpoint and displays results including song name, artist, album, and a “+” button to add tracks.

3. **Creating a Playlist**  
   - Add tracks from the search results.
   - Enter a playlist name.
   - Click “Save to Spotify” to create the playlist in your Spotify account.
   - Feedback messages show progress or errors (e.g., missing name or tracks).

4. **Managing Tracks**  
   - Tracks can be removed using the “-” button.
   - Playlists can be renamed by typing directly into the playlist name field.

---

## Usage

1. **Search for a track**  
    - Type an artist, track, or album into the search bar.
    - Press Enter or click Search.

2. **Add tracks to your playlist**  
    - Click the `+` icon next to a track in the search results.

3. **Remove tracks from your playlist**  
    - Click the `-` icon next to a track in your playlist.

4. **Rename your playlist**  
    - Click on the playlist name and type a new name.

5. **Save playlist to Spotify**  
    - Click the **Save to Spotify** button.
    - The app will show a message when the save is complete.

---

## Technologies Used

- React.js
- Vite
- JavaScript (ES6+)
- Spotify Web API (Authorization Code with PKCE)
- Fetch API

---

## Contributing

If you want to contribute to Jammming:

1. Fork the repository  
2. Create a new branch for your feature or bugfix  
3. Commit changes with meaningful messages  
4. Push your branch and open a Pull Request

---

## License

This project is open-source and available under the MIT License.
