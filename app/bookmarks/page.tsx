"use client" ;
import React, { useState } from "react";
import FilterCard from "../compoenents/FilterCard";
import Post from "../compoenents/post/Post";
import { useQuery } from "@tanstack/react-query";
import { savedPostsConfig } from "../queryConfig";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";

const Page = () => {

    const options = ["Tweets", "Tweets & replies", "Media", "Likes"];
    const [filter , setFilter ] = useState( "Tweets" )
    const {data: savedPosts ,isFetched,isFetching,error, } = useQuery(savedPostsConfig);

    let AllPosts;

    switch (filter) {
        case 'Tweets & replies':
            AllPosts = savedPosts;
            break ;
        case 'Media':
            AllPosts = savedPosts.filter((x:any) => x.media_url != null )
            break;
        case 'Likes':
            AllPosts = savedPosts.filter((x:any) => x.likes.length > 0 )
            break;
        default:
            AllPosts = savedPosts ;
            break;
    }





    
    return (
        <main className=" w-[95%] container  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
            <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  ">
                <FilterCard options={options} filter={filter} setFilter={setFilter} />
            </section>
            <section className="w-full md:w-[70%]  ">

                <div className="flex flex-col gap-4 mt-4">
                    
                    {isFetching  && (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    )}


                    {isFetched &&
                        AllPosts?.map((post, index) => {
                            return <Post key={index} postid={post.saves[0].postId} />;
                        })}

                    
                    {
                        isFetched &&  AllPosts?.length == 0 && <div className="mx-auto">
                            <p>No post has been saved</p>
                        </div>
                    }
                    


                    

                </div>
            </section>
        </main>
    );
};

export default Page;
