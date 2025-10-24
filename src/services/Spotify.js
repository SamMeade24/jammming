let accessToken = '';
let expiresIn = 0;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        // TBC Add logic to retreive token from Spotify, for now mock data is used
        accessToken = "MOCK_TOKEN";
        expiresIn = 3600;

        return accessToken;
    }, 

    search(term) {
        console.log(`Searching Spotify for: ${term}`);
        return new Promise((resolve) => {
            const mockResults = [
                { id: 101, name: "Mock Song 1", artist: "Artist A", album: "Album X", uri: "spotify:track:101" },
                { id: 102, name: "Mock Song 2", artist: "Artist B", album: "Album Y", uri: "spotify:track:102" },
                { id: 103, name: "Mock Song 3", artist: "Artist C", album: "Album Z", uri: "spotify:track:103" },
            ];
            resolve(mockResults); 
        });

    },
};

export default Spotify;