"use client";
import Create_new_post from "./compoenents/post/Post_form";
import Post from "./compoenents/post/Post";
import Hashtags from "./compoenents/trends/Hashtags";
import Pepole_to_follow from "./compoenents/trends/Pepole_to_follow";
import { useQuery, useQueryClient} from "@tanstack/react-query"
import axios from "axios";
import Skeleton_post from "./compoenents/skeletons/skeleton_post";
import { useState } from "react";

export default function Home() {
    // const [loading  ,  setLoading] = useState(false)
    const queryClient = useQueryClient();


    const getUserPosts  = async () =>{ 
        try {
            const response = await axios.get("/api/user/posts");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const {
        data: posts,
        isPending,
        error,
        isLoading ,
    } = useQuery({
        queryKey: ["posts"] ,
        queryFn: getUserPosts ,
    });

    console.log( 'posts' ,  posts )

    return (
        <main className=" w-[95%]  md:w-[80%] mx-auto mt-8 flex gap-4 ">

            <section className="w-full md:w-[70%] h-[50px] ">
                {/* <div>{session?.user?.email}</div> */}
                <Create_new_post queryClient ={ queryClient }  />
                {/* posts */}
                <div className="flex flex-col gap-4 mt-8" >
                    {
                       isLoading   &&   <Skeleton_post  />
                    }

                    {/* {
                       loading &&   <Skeleton_post  />
                    } */}

                    {
                        !isPending && posts?.map(( post ,  index) => {
                            return <Post key={index}  post = {post} />
                        })
                    }
                </div>
            </section>
            <section className=" min-w-[30%] max-w-[30%]  hidden md:block space-y-4 " >
                
                <Hashtags />
                <Pepole_to_follow />
                

            </section>

        </main>
    );
}
