"use client";
import Image from "next/image";
import FilterCard from "../compoenents/FilterCard";
import Post from "../compoenents/post/Post";
import ProfileUserCard from "./ProfileUserCard";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SkeletonUserCard from "../compoenents/skeletons/SkeletonUserCard";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";
import { userDetailsConfig } from "../queryConfig";
import UploadImage from "../compoenents/post/UploadImage";
import { EditIcon } from "../compoenents/icons/Icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
    const options = ["Tweets", "Tweets & replies", "Media", "Likes"];
    const id = uuidv4();
    const queryClient = useQueryClient();

    const {
        data: userDetails,
        isPending: isUserPending,
        error: isUserError,
        isLoading : isUserLoading ,
        isFetching: isUserFetching,
    } = useQuery(userDetailsConfig);
    const [url, setUrl] = useState();

    const getUserPosts = async () => {
        try {
            const response = await axios.get("/api/user/posts");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const {
        data: userPosts,
        isPending: isPostsPending,
        error: isPostsError,
        isLoading: isPostsLoading,
        isFetching: isPostFetching,
    } = useQuery({
        queryKey: ["userPosts"],
        queryFn: getUserPosts,
    });



    useEffect(() => {
        console.log("start updating  stuff ");

        const updateUserData = async () => {
            const response = await axios.post("/api/user/update", {
                cover: url,
            });

            console.log(response);
            console.log("done setting up the state");
            queryClient.invalidateQueries({ queryKey: ["userDetails"] });
        };

        if (url) {
            updateUserData();
        }
    }, [queryClient, url]);
    console.log(userDetails , 'user Details')

    return (
        <main className=" w-full  mx-auto  ">
            <div className="relative min-w-full h-[250px]  bg-gradient-to-r from-blue-300 to-pink-400 block ">
                {/* add some shit to make the user uplaod his cover  */}
                <UploadImage
                    Icon={
                        <EditIcon className=" w-8 h-8 absolute  rounded-full top-2 right-2 z-50 p-1  text-white    cursor-pointer " />
                    }
                    setUrl={setUrl}
                    inputId={id}
                />
                {
                    userDetails &&
                    <Image
                        src = { url ?? userDetails?.cover ?? "/cover.png" }
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                        priority={true}
                    />
                    
                }
            </div>
            <div className="w-[95%]  md:w-[80%] mx-auto mt-4 flex flex-col md:grid md:grid-cols-3    md:items-start gap-4 relative">
                {isUserLoading ? (
                    <SkeletonUserCard />
                ) : (
                    <ProfileUserCard user={userDetails} />
                )}

                <FilterCard options={options} defaultvalue="Tweets" />

                <div className="flex flex-col gap-4 mt-4 col-span-2 ">
                    {isPostFetching && <SkeletonPost />}
                    {userPosts?.map((post: any) => {
                        return <Post postid={post.id} key={post.id} />;
                    })}
                </div>
            </div>
        </main>
    );
};

export default Page;
