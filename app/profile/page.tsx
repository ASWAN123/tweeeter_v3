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
            const response = await axios.get("/api/user");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const {
        data: user,
        isPending,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
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
                {isPending && <Skeleton_User_Card />}
                {!isPending && <Profile_user_card user={user} />}
                <Filter_card options={options} defaultvalue="Tweets" />
                <div className="flex flex-col gap-4 mt-4 col-span-2 ">
                    <Skeleton_post />
                    <Post image="/post_image.jpg" />
                    <Post image="/post_image1.jpg" />
                    <Post image="/post_image2.jpg" />

                </div>
            </div>
        </main>
    );
};

export default Page;
