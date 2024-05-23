import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash"

const colours = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-yellow-500",
    "from-purple-500",
    "from-pink-500",
    "from-emerald-500",
    "from-cyan-500",
    "from-teal-500",
    "from-sky-400",
    "from-rose-400",
];


function Center() {
const { data: session } = useSession();

const [colour, setColour] = useState(null);

useEffect(() => {
    setColour(shuffle(colours).pop());
}, [])

    return (
        <div className="flex-grow text-white col-span-full">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <img className="rounded-full w-10 h-10" 
                    src={session?.user.image} 
                    alt="User Profile" 
                    />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>

            <section className={`flex itmes-end space-x-7 bg-gradient-to-b to-black ${colour} h-80 text-white p-8`}>
                {/* <img src="" alt="" />
                <div>

                </div> */}
            </section>
        </div>
    )
}

export default Center
