"use client";

import Create_new_post from "./compoenents/post/Create_new_post";
import Post from "./compoenents/post/Post";
import Hashtags from "./compoenents/trends/Hashtags";
import Pepole_to_follow from "./compoenents/trends/Pepole_to_follow";
import  { useSession } from "next-auth/react"
import { useQuery} from "@tanstack/react-query"

export default function Home() {
    const  {data : session } = useSession()
    
    const { isPending, error, data } = useQuery({
        queryFn : () =>{
            console.log('hi')
        },
        queryKey: ['hi']

    })

    




    return (
        <main className=" w-[95%]  md:w-[80%] mx-auto mt-8 flex gap-4 ">
            <section className="w-full md:w-[70%] h-[50px] ">
                <div>{session?.user?.email}</div>
                <Create_new_post />
                {/* posts */}
                <div className="flex flex-col gap-4 mt-8" >
                    <Post  image="/post_image.jpg" />
                    <Post  image="/post_image1.jpg" />
                    <Post  image="/post_image2.jpg" />

                </div>
            </section>
            <section className=" min-w-[30%] max-w-[30%]  hidden md:block space-y-4 " >
                
                <Hashtags />
                <Pepole_to_follow />

            </section>

        </main>
    );
}
