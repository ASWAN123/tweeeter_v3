"use client";
// import Create_new_post from "./compoenents/post/PostForm";
import Post from "./compoenents/post/Post";
import Hashtags from "./compoenents/trends/Hashtags";
import PepoleToFollow from "./compoenents/trends/PepoleToFollow";
import SkeletonPost from "./compoenents/skeletons/skeletonPost";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
    hashTagsConfig,
    homePostsConfig,
    userDetailsConfig,
} from "./queryConfig";
import SkeletonHashtags from "./compoenents/skeletons/SkeletonHashtags";
import PostForm from "./compoenents/post/PostForm";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Home() {
    const {
        data: homePosts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isFetched,
    } = useInfiniteQuery(homePostsConfig);
    const { data: hashTags, isLoading: isHashtagsLoading } =
        useQuery(hashTagsConfig);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            console.log("updated", inView);
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <main className=" container w-[95%]  md:w-[80%] mx-auto mt-8 flex gap-4 ">
            <section className="w-full md:w-[70%] h-[50px] ">
                <PostForm />
                <div className="flex flex-col gap-4 mt-8">
                    {isLoading && (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    )}

                    {isFetched &&
                        homePosts &&
                        homePosts?.pages.map((group, index) => (
                            <>
                                {group?.posts.map((post: any, index: any) => {
                                    return (
                                        <Post key={index} postid={post.id} />
                                    );
                                })}
                            </>
                        ))}

                    <button
                        ref={ref}
                        className="text-gray-500 font-poppins  min-h-[200px] max-h-[200px] my-8 "
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
            <section className=" min-w-[30%] max-w-[30%]  hidden md:block space-y-4 ">
                {isHashtagsLoading ? (
                    <SkeletonHashtags />
                ) : (
                    <Hashtags hashTags={hashTags} />
                )}

                <PepoleToFollow />
            </section>
        </main>
    );
}
