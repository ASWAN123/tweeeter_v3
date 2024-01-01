"use client";
import React, { useState } from "react";
import FilterCard from "../compoenents/FilterCard";
import Post from "../compoenents/post/Post";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { savedPostsConfig } from "../queryConfig";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";

const Page = () => {
    const options = ["Tweets",  "Media", "Likes"];
    const [filter, setFilter] = useState("Tweets");
    const {
        data: savedPosts,
        isFetched,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching,
        error,
    } = useInfiniteQuery(savedPostsConfig(filter));

    return (
        <main className=" w-[95%] container  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
            <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  ">
                <FilterCard
                    options={options}
                    filter={filter}
                    setFilter={setFilter}
                    functionality={savedPostsConfig}
                />
            </section>
            <section className="w-full md:w-[70%]  ">
                <div className="flex flex-col gap-4 mt-4">
                    {isFetching && (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    )}

                    {isFetched &&
                        savedPosts &&
                        savedPosts?.pages?.map((group, index) => (
                            <>
                                {group?.posts.map((post: any, index: any) => {
                                    return (
                                        <Post key={post.id} postid={post.id} />
                                    );
                                })}
                            </>
                        ))}

                    <button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ? "Loading more..."
                            : hasNextPage
                            ? "Load More"
                            : "Nothing more to load"}
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Page;
