import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react"
import SpotifyWebApi from "spotify-web-api-node";


const spotifyApi = new SpotifyWebApi({
    clientId: 'replace',
    clientSecret: 'replace',
})

function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            if (session.error  === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session])

    return spotifyApi;
}

export default useSpotify
