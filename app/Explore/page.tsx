"use client";
import Post from "../compoenents/post/Post";
import FilterCard from "../compoenents/FilterCard";
import SearchInput from "./SearchInput";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";
import { explorePostsConfig } from "../queryConfig";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Page = () => {
    const options = ["Top", "Lastest", "Media"];
    const [filter, setFilter] = useState("Top");


    const {
        data: explorePosts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetched,
        isFetching,
        error,
        status
    } = useInfiniteQuery(explorePostsConfig(filter));




    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage ) {
                console.log('updated' ,  inView)
                fetchNextPage()
        }
    }, [ inView ,  hasNextPage , fetchNextPage]);

    return (
        <main className=" w-[95%] container  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
            <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  ">
                <FilterCard
                    options={options}
                    filter={filter}
                    setFilter={setFilter}
                    functionality = {explorePostsConfig}
                />
            </section>
            <section className="w-full md:w-[70%]  ">
                <SearchInput />

                <div className="flex flex-col gap-4 mt-4">
                    { isFetching && (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    )}

                    {isFetched &&
                        explorePosts &&
                        explorePosts?.pages?.map((group, index) => (
                            <>
                                {group?.posts.map((post: any, index: any) => {
                                    return (
                                        <Post key={index} postid={post.id}   />
                                    );
                                })}
                            </>
                        ))}

<button
                    ref={ref}
                    className="text-gray-500  min-h-[200px] max-h-[200px] font-poppins my-8 "
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
