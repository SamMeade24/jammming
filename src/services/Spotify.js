let accessToken = '';
let expiresIn = 0;

// PKCE Helper Functions
function generateCodeVerifier(length = 128) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return base64;
};

const Spotify = {
    async redirectToAuth() {
        const clientId = "a1f18c7bf8f544a6a4bca7e1605f8230";
        const redirectUri = "http://127.0.0.1:5173/";
        const scopes = "playlist-modify-public playlist-modify-private user-read-email";
  
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
  
        localStorage.setItem("spotify_code_verifier", codeVerifier);
  
        const authUrl = `https://accounts.spotify.com/authorize?` +
            `client_id=${clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${encodeURIComponent(scopes)}` +
            `&code_challenge_method=S256` +
            `&code_challenge=${codeChallenge}`;
  
        window.location = authUrl;
    },

    async getTokenFromCode() {
        // Parse the URL for the code
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (!code) return null;
      
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
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body.toString()
        });
      
        const data = await response.json();
        if (data.access_token) {
            accessToken = data.access_token;
            expiresIn = data.expires_in;
            return accessToken;
        } else {
            console.error("Spotify token exchange failed:", data);
            return null;
        }
    }, 

    async getAccessToken() {
        if (accessToken) return accessToken;
    
        const token = await this.getTokenFromCode();
        if (token) return token;
    
        await this.redirectToAuth();
    }, 

    async search(term) {
        const token = await this.getAccessToken();
        if (!token) return [];
      
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
      
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
};
  
export default Spotify;