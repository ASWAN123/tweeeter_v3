"use client";
import Image from "next/image";
import Filter_card from "../compoenents/Filter_card";
import Post from "../compoenents/post/Post";
import Profile_user_card from "./Profile_user_card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton_User_Card from "../compoenents/skeletons/Skeleton_user_card";
import Skeleton_post from "../compoenents/skeletons/skeleton_post";



const Page = () => {
    const options = ["Tweets", "Tweets & replies", "Media", "Likes"];

    async function getUser() {
        try {
            const response = await axios.get("/api/user/profile");
            console.log(response.data ,  'user');
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const {
        data: user,
        isPending :isUserPending,
        error : isUserError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });



    const getUserPosts  = async () =>{ 
        try {
            const response = await axios.get("/api/user/posts");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const {
        data: posts,
        isPending : isPostsPending,
        error : isPostsError,
        isLoading :isPostsLoading ,
    } = useQuery({
        queryKey: ["posts"] ,
        queryFn: getUserPosts ,
    });



    return (
        <main className=" w-full  mx-auto  ">
            <div className="relative min-w-full h-[250px]  bg-gradient-to-r from-blue-300 to-pink-400 block ">
                {/* add some shit to make the user uplaod his cover  */}
                <Image
                    src="/cover.png"
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                />
            </div>
            <div className="w-[95%]  md:w-[80%] mx-auto mt-4 flex flex-col md:grid md:grid-cols-3    md:items-start gap-4 relative">
                {/* { user && <Profile_user_card user ={user}/> } */}
                { isUserPending  && <Skeleton_User_Card   /> }
                { user && <Profile_user_card user={user} /> }
                <Filter_card options={options} defaultvalue="Tweets" />
                <div className="flex flex-col gap-4 mt-4 col-span-2 ">
                    { isPostsLoading && <Skeleton_post />}
                    {
                        posts?.map((post , index) => {
                            return (
                            <Post post={post} key={index} />
                            )
                        })
                    }
                    {/* <Post image="/post_image.jpg" />
                    <Post image="/post_image1.jpg" />
                    <Post image="/post_image2.jpg" /> */}

                </div>
            </div>
        </main>
    );
};

export default Page;
