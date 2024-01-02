"use client";
import Image from "next/image";
import React from "react";
import FilterCard from "../compoenents/FilterCard";
import Post from "../compoenents/post/Post";
import ProfileUserCard from "./ProfileUserCard";
import axios from "axios";
import {
    useInfiniteQuery,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import SkeletonUserCard from "../compoenents/skeletons/SkeletonUserCard";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";
import { userDetailsConfig, userPostsConfig } from "../queryConfig";
import { EditIcon } from "../compoenents/icons/Icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import UploadImage2 from "../compoenents/post/UplaodImage2";
import { useInView } from "react-intersection-observer";

const Profile = ({ searchParams: { id: userId } }) => {
    const { data: session } = useSession();

    const options = ["Tweets", "Media", "Likes"];
    const [filter, setFilter] = useState("Tweets");

    const id = uuidv4();

    const queryClient = useQueryClient();

    const [url, setUrl] = useState();

    const {
        data: userDetails,
        isLoading: isUserLoading,
        isFetched,
    } = useQuery(userDetailsConfig(userId));

    const {
        data: userPosts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isUserPostsLoading,
    } = useInfiniteQuery(userPostsConfig(userId, filter));

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage ) {
               
                fetchNextPage()
        }
    }, [ inView ,  hasNextPage , fetchNextPage]);



    // useEffect  to  update the  profile  cover
    useEffect(() => {
        const updateUserData = async () => {
            const response = await axios.post("/api/user/update", {
                cover: url,
            });

            queryClient.invalidateQueries({ queryKey: ["userDetails" ] });
        };

        if (url) {
            updateUserData();
        }
    }, [url, queryClient]);

    return (
        <main className=" w-full    ">
            <div className="relative min-w-full h-[250px]  bg-gradient-to-r from-blue-300 to-pink-400 block ">
                {session?.user?.sub == userDetails?.id && (
                    <UploadImage2
                        Icon={
                            <EditIcon className=" w-8 h-8 absolute  rounded-full top-2 right-2 z-30 p-1  text-white    cursor-pointer " />
                        }
                        setUrl={setUrl}
                        inputId={id}
                    />
                )}
                {userDetails && (
                    <Image
                        src={url ?? userDetails?.cover ?? "/cover.png"}
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                    />
                )}
            </div>
            <div className="w-[95%]  md:w-[80%] mx-auto mt-4 flex flex-col md:grid md:grid-cols-3    md:items-start gap-4 relative">
                {userDetails ? (
                    <ProfileUserCard user={userDetails} />
                ) : (
                    <SkeletonUserCard />
                )}

                <FilterCard
                    options={options}
                    filter={filter}
                    setFilter={setFilter}
                    functionality={userPostsConfig}
                    userId={userId}
                />

                <div className="flex flex-col gap-4 mt-4 col-span-2 ">
                    {isUserPostsLoading && <><SkeletonPost /><SkeletonPost /><SkeletonPost /></>}

                    {isFetched &&
                        userPosts &&
                        userPosts?.pages?.map((group, index) => (
                            <>
                                {group?.posts.map((post: any, index: any) => {
                                    return (
                                        <Post
                                            key={post.id}
                                            postid={post.id}
                                            is_retweet={post.is_retweet}
                                            
                                        />
                                    );
                                })}
                            </>
                        ))}





                <button
                    ref={ref}
                    className="text-gray-500 w-full min-h-[200px] max-h-[200px] font-poppins my-8 "
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                        ? "Load More"
                        : "Nothing more to load" }
                </button>

                



                </div>

                    
            </div>
        </main>
    );
};

export default Profile;
