import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
"user-modify-playback-state",
"user-read-currently-playing",
"user-follow-modify",
"user-follow-read",
"user-library-read",
"streaming",
"user-read-playback-position",
"user-top-read",
"user-read-recently-played",
"playlist-modify-private",
"playlist-read-collaborative",
"playlist-read-private",
"playlist-modify-public",
].join(',');

const params = {
    scopes: scopes,
};

const queryParamString = new URLSearchParams(params);


const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: 'replace',
    clientSecret: 'replace',
    redirectUri: 'http://<your_domain.com>/api/auth/callback/spotify'
})

export default spotifyApi;

export { LOGIN_URL };
