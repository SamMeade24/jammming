let accessToken = localStorage.getItem("spotify_access_token") || '';
let expiresIn = 0;

// PKCE Helper Functions
function generateCodeVerifier(length = 128) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Spotify Module
const Spotify = {
    async redirectToAuth() {
        const clientId = "a1f18c7bf8f544a6a4bca7e1605f8230";
        const redirectUri = "http://127.0.0.1:5173/";
        const scopes = "playlist-modify-public playlist-modify-private user-read-email";

        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);

        localStorage.setItem("spotify_code_verifier", codeVerifier);

        const authUrl =
            `https://accounts.spotify.com/authorize?` +
            `client_id=${clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${encodeURIComponent(scopes)}` +
            `&code_challenge_method=S256` +
            `&code_challenge=${codeChallenge}`;

        window.location = authUrl;
    },

    async getTokenFromCode(code) {
        const codeVerifier = localStorage.getItem("spotify_code_verifier");
        const clientId = "a1f18c7bf8f544a6a4bca7e1605f8230";
        const redirectUri = "http://127.0.0.1:5173/";

        const body = new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier,
        });

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
        });

        const data = await response.json();

        if (data.access_token) {
            accessToken = data.access_token;
            localStorage.setItem("refresh_token", data.refresh_token);
            localStorage.setItem("spotify_access_token", accessToken);
            expiresIn = data.expires_in;
            return accessToken;
        } else {
            console.error("Spotify token exchange failed:", data);
            return null;
        }
    },

    async getAccessToken() {
        if (accessToken) return accessToken;

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            const token = await this.getTokenFromCode(code);
            if (token) {
                window.history.replaceState({}, document.title, "/"); // clear code from URL
                return token;
            }
        }

        // If no token and no code, redirect to Spotify login
        await this.redirectToAuth();
    },

    async search(term) {
        let token = await this.getAccessToken();
        if (!token) return [];

        const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;

        let response = await fetch(searchUrl, {
            headers: { Authorization: `Bearer ${token}` }, 
        });

        if (response.status === 401) {
            console.warn("Access token expired. Refreshing...");
            token = await this.getAccessToken();

            if (token) {
                response = await fetch(searchUrl, {
                    headers: { Authorization: `Bearer ${token}` }, 
                });
            } else {
                console.error("Failed to refresh access token. Please log in again.");
                return [];
            }
        }

        const data = await response.json();
        if (!data.tracks) return [];

        return data.tracks.items.map(track => ({
            id: track.id, 
            name: track.name, 
            artist: track.artists[0].name, 
            album: track.album.name, 
            uri: track.uri, 
        }));
    }, 

    // Get's the user's Spotify profile to obtain user ID
    async getCurrentUserId() {
        const token = await this.getAccessToken();
        if (!token) throw new Error('No Spotify access token');

        const res = await fetch('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(`Failed to get user: ${res.status} ${res.statusText} ${err.error?.message || ''}`);
        }
        const data = await res.json();
        return data.id;
    },
    
    // Create's a playlist for the user
    async createPlaylist(userId,name = 'New Playlist', description = '', isPublic = false) {
        const token = await this.getAccessToken();
        if (!token) throw new Error('No Spotify access token');

        const body = {
            name: name, 
            description: description, 
            public: !!isPublic
        };

        const res = await fetch(`https://api.spotify.com/v1/users/${encodeURIComponent(userId)}/playlists`, {
            method: 'POST', 
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        });

        if(!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(`Create playlist failed: ${res.status} ${res.statusText} ${err.error?.message || ''}`);
        }

        const data = await res.json();
        return data;
    }, 

    // Adds tracks to a Playlist
    async addTracksToPlaylist(playlistId, uris = []) {
        if(!Array.isArray(uris) || uris.length === 0) {
            return null;
        }
        const token = await this.getAccessToken();
        if (!token) throw new Error(`No Spotify access token`);

        const res = await fetch(`https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistId)}/tracks`, {
            method: 'POST', 
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uris }) 
        });

        if(!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(`Create playlist failed: ${res.status} ${res.statusText} ${err.error?.message || ''}`);
        }
        
        const data = await res.json();
        return data;
    }, 

    // Create & add tracks
    async savePlaylistToSpotify(playlistName, trackUris = [], { description = 'Created with Jammming', isPublic = false } = {}) {
        if(!playlistName || !Array.isArray(trackUris) || trackUris.length === 0) {
            throw new Error('A playlist name is needed and non-empty track URIs');
        }

        const userId = await this.getCurrentUserId();
        const playlist = await this.createPlaylist(userId, playlistName, description, isPublic);
        await this.addTracksToPlaylist(playlist.id, trackUris);

        return playlist;
    }, 
};

// Refreshes the access token
async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        console.error("No refresh token has been found. You need to re-autenticate. ");
        return null;
    }

    const clientId = "a1f18c7bf8f544a6a4bca7e1605f8230";
    const body = new URLSearchParams({
        grant_type: "refresh_token", 
        refresh_token: refreshToken, 
        client_id: clientId
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST", 
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }, 
        body: body.toString()
    });

    if (!response.ok) {
        console.error("Failed to refresh access token")
        return null;
    }

    const data = await response.json();
    accessToken = data.access_token;
    localStorage.setItem("spotify_access_token", accessToken);
    console.log("Access token refreshed!");
    return data.access_token;
}

export default Spotify;
