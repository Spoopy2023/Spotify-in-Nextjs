import { 
    HeartIcon,
  HomeIcon, 
  LibraryIcon, 
  LogoutIcon, 
  PlusCircleIcon, 
  RssIcon, 
  SearchIcon, 
} from '@heroicons/react/outline'
import { signOut, useSession } from "next-auth/react"
import { useState, useEffect } from 'react';
import useSpotify from '../hooks/useSpotify'


function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession(); 
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists(session).then((data) => {
                setPlaylists(data.body.items);
            })
        }
    })

    console.log(playlists);
    
    return (
        <div className="text-gray-500 text-sm border-r p-5 border-gray-900 overflow-y-visible h-screen">
            <div className="space-y-4">
            <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                    <LogoutIcon className="h-5 w-5" />
                    <p>Logout</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.5px] border-gray-900" />
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                
                <hr className="border-t-[0.5px] border-gray-900" />

                {playlists.map((playlists) => {
                    <p key={playlists.id} className="cursor-pointer hover:text-white">{playlists.name} test</p>
                })}
            </div>
        </div>
    );
}

export default Sidebar