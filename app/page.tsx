"use client";
import Create_new_post from "./compoenents/post/PostForm";
import Post from "./compoenents/post/Post";
import Hashtags from "./compoenents/trends/Hashtags";
import PepoleToFollow from "./compoenents/trends/PepoleToFollow";
import SkeletonPost from "./compoenents/skeletons/skeletonPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";



const fetchPosts = async () => {
    const response = await axios.get('/api/posts')
    return response.data

    }







export  default  function  Home() {

    const { data : posts ,  isFetched ,  isFetching , error } = useQuery({
        queryKey:['posts'] ,
        queryFn : fetchPosts 
    })







    
    return (
        <main className=" w-[95%]  md:w-[80%] mx-auto mt-8 flex gap-4 ">

            <section className="w-full md:w-[70%] h-[50px] ">
                {/* <div>{session?.user?.email}</div> */}
                <Create_new_post  />
                {/* posts */}
                <div className="flex flex-col gap-4 mt-8" >
                    {
                       isFetching   &&   <><SkeletonPost  /><SkeletonPost  /><SkeletonPost  /></>
                    }

                    {
                        isFetched && posts?.map(( post ,  index) => {
                            return <Post key={index}  postid = {post.id} />
                        })
                    }
                </div>
            </section>
            <section className=" min-w-[30%] max-w-[30%]  hidden md:block space-y-4 " >
                
                <Hashtags />
                <PepoleToFollow />
                

            </section>

        </main>
    );
}
