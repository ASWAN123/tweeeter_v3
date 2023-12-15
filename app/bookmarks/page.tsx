"use client" ;
import React from "react";
import FilterCard from "../compoenents/FilterCard";
import Post from "../compoenents/post/Post";
import { useQuery } from "@tanstack/react-query";
import { postsQueryConfig } from "../queryConfig";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";

const page = () => {
    const options = ["Tweets", "Tweets & replies", "Media", "Likes"];
    const {
        data: posts,
        isFetched,
        isFetching,
        error,
    } = useQuery(postsQueryConfig);

    return (
        <main className=" w-[95%]  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
            <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  ">
                <FilterCard options={options} defaultvalue="Tweets" />
            </section>
            <section className="w-full md:w-[70%]  ">
                {/* <div className="flex flex-col gap-4 mt-4">
                    <p>No posts yet ...</p>

                </div> */}

                <div className="flex flex-col gap-4 mt-4">
                    {isFetching && (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    )}

                    {isFetched &&
                        posts?.map((post, index) => {
                            return <Post key={index} postid={post.id} />;
                        })}
                </div>
            </section>
        </main>
    );
};

export default page;
