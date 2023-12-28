"use client";
import Image from "next/image";
import FilterCard from "../compoenents/FilterCard";
import Post from "../compoenents/post/Post";
import ProfileUserCard from "./ProfileUserCard";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SkeletonUserCard from "../compoenents/skeletons/SkeletonUserCard";
import SkeletonPost from "../compoenents/skeletons/skeletonPost";
import { userDetailsConfig, userPostsConfig } from "../queryConfig";
import UploadImage from "../compoenents/post/UploadImage";
import { EditIcon } from "../compoenents/icons/Icons";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import UploadImage2 from "../compoenents/post/UplaodImage2";






const Page = ({ searchParams: { id: userId } }) => {
    const { data: session } = useSession();

    const options = ["Tweets", "Tweets & replies", "Media", "Likes"];
    const [filter , setFilter ] = useState( "Tweets" )


    const id = uuidv4();

    const queryClient = useQueryClient();

    const [url, setUrl] = useState();

    const { data: userDetails, isLoading: isUserLoading ,  isFetched } = useQuery(
        userDetailsConfig(userId)
    );



    const { data: userPosts, isLoading: isUserPostsLoading } = useQuery(
        userPostsConfig(userId)
    );
    


    useEffect(() => {
        const updateUserData = async () => {
            const response = await axios.post("/api/user/update", {
                cover : url ,
            });

            queryClient.invalidateQueries({ queryKey: ["userDetails"] });
        };

        if (url) {
            updateUserData();
        }
    }, [ url , queryClient]);


    let AllPosts;

    switch (filter) {
        case 'Tweets & replies':
            AllPosts = userPosts;
            break ;
        case 'Media':
            AllPosts = userPosts.filter((x:any) => x.media_url != null )
            break;
        case 'Likes':
            // console.log(userPosts)
            AllPosts = userPosts.filter((x:any) => x.likes.length > 0 )
            break;
        default:
            AllPosts = userPosts;
            break;
    }
      




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
                {/* { ( ( isUserLoading && userDetails ) || isFetched ) ? (
                    <SkeletonUserCard />
                ) : (
                    < ProfileUserCard user={userDetails} />
                )} */}

                {
                    userDetails ? <ProfileUserCard user={userDetails} /> : < SkeletonUserCard  />
                }

                <FilterCard options={options}  filter={filter} setFilter ={setFilter} />

                <div className="flex flex-col gap-4 mt-4 col-span-2 ">
                    {isUserPostsLoading && <SkeletonPost />}
                    {AllPosts?.map((post: any) => {
                        return <Post postid={post.id} key={post.id} />;
                    })}
                </div>
            </div>
        </main>
    );
};

export default Page;
