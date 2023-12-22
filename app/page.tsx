"use client";
import Create_new_post from "./compoenents/post/PostForm";
import Post from "./compoenents/post/Post";
import Hashtags from "./compoenents/trends/Hashtags";
import PepoleToFollow from "./compoenents/trends/PepoleToFollow";
import SkeletonPost from "./compoenents/skeletons/skeletonPost";
import { useQuery } from "@tanstack/react-query";
import { hashTagsConfig, homePostsConfig } from "./queryConfig";
import SkeletonHashtags from "./compoenents/skeletons/SkeletonHashtags";
import PostForm from "./compoenents/post/PostForm";

export default function Home() {
    const { data: homePosts, isLoading, isFetched } = useQuery(homePostsConfig);

    const { data: hashTags, isLoading: isHashtagsLoading } =
        useQuery(hashTagsConfig);

    return (
        <main className=" w-[95%]  md:w-[80%] mx-auto mt-8 flex gap-4 ">
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
                        homePosts?.map((post: any, index: any) => {
                            return <Post key={index} postid={post.id} />;
                        })}
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
