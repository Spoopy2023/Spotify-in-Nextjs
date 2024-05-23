 import {getProviders, signIn} from "next-auth/react";
import Head from "next/head"

function Login({ providers }) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <Head>
                <title>Nextjs Music | Auth</title>
            </Head>
            <h3 className="text-white text-6xl">Login to continue.</h3><br/><br/><br/>
           <img className="w-52 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify"/> <br/><br/><br/>
           {Object.values(providers).map((provider) => (
               <div key={provider.name}>
                   <button className="bg-[#18D860] hover:bg-[#16be57] text-white p-5 rounded-lg"
                   onClick={() => signIn(provider.id, { callbackUrl: "/" } )}>Login with {provider.name}</button>
               </div>
           ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}