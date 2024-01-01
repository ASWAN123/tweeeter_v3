"use client";
import Post from "../compoenents/post/Post";
import FilterCard from "../compoenents/FilterCard";
import SearchInput from "./SearchInput";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";
import { explorePostsConfig } from "../queryConfig";
import { useState } from "react";

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

    // let AllPosts  = [].concat(...explorePosts?.pages)

    // switch (filter) {
    //     case "Media":
    //         AllPosts = AllPosts.filter((x: any) => x.media_url != null );
    //         break;
    //     case "Lastest":
    //         // latest is the  default  params  for  api
    //         AllPosts = explorePosts;
    //         break;
    //     case "People":
    //         // people  i only have  posts  for  people no group invoves in social  media app
    //         AllPosts = explorePosts;
    //         break;
    //     default:
    //         // && b.likes - a.likes && b.saves - a.saves
    //         AllPosts = AllPosts?.sort((a, b) => b.comments - a.comments && );
    //         console.log(AllPosts);
    //         break;
    // }

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
                </div>
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
            </section>
        </main>
    );
};

export default Page;
