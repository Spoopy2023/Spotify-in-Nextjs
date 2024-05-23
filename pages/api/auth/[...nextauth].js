import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken(token) {
    try {

        spotifyApi.getAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);

        return { 
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }

    } catch (error) {
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}


export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
      signIn: '/auth/login'
  },

  callbacks: {
    async jwt({ token, account, user }){

        // Inital Sign in
        if(account && user) {
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at + 1000,
            };
        }

        if (Date.now() < token.accessTokenExpires) {
            console.log("EXISTING ACCESS TOEKN IS VALID")
            return token;
        }

        console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
        return await refreshAccessToken(token)
    }, 

    async session({ session, token }) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
    }
  },
});
