let accessToken = '';
let expiresIn = 0;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        // TBC Add logic to retreive token from Spotify, for now mock data is used
        accessToken = "MOCK_TOKEN";
        expiresIn = 3600;

        return accessToken;
    }
};

export default Spotify;