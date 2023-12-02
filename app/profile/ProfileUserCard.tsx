"use client";
import Image from "next/image";
import { EditIcon } from "../compoenents/icons/Icons";
import { useEffect, useState } from "react";
import UploadImage from "../compoenents/post/UploadImage";
import axios from "axios";

const ProfileUserCard = ({ user }) => {
    console.log(user)
    const [url  , setUrl ] = useState() ;


    const UplaodProfile = async () => {

        const  response = await axios.post('/api/user/update' , {
            media_url : url
        })
        console.log(response.data)
        // setUrl(null)


    }

    useEffect(() => {
        if(url){
            UplaodProfile(url)
            
        }
    } ,  [url])






    return (
        <div className="min-h-[163px]  flex flex-col  md:flex-row items-center gap-4 md:items-start bg-white rounded-md w-full py-4 px-6 -mt-24 col-span-3 shadow-md ">
            <div className="min-w-[160px]   rounded-md bg-white min-h-[160px] md:min-w-[150px] md:min-h-[150px] w-[100px] h-[100px] relative  shadow-sm -z-0  -mt-32 md:-mt-20">
                
                <UploadImage
                    Icon={
                        <EditIcon
                            // width={28}
                            // height={28}
                            className=" w-8 h-8 absolute text-black rounded-full -top-2 -left-2 z-50 p-1  bg-white    cursor-pointer "
                        />
                    }
                    setUrl={setUrl}
                />
                
                <Image
                    src={ url??  user.media_url??   "/profile.png"}
                    alt="Picture of the author"
                    className=" rounded-md p-[5px] z-10 "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className=" flex flex-col gap-2 md:flex-row md:gap-6 items-center w-[70%]  flex-wrap ">
                <p className="text-center w-fit text-[24px] font-semibold  ">
                    {user.name}
                </p>
                <div className="flex flex-row  items-center gap-6">
                    <p className="text-[12px]  font-bold text-neutral-400">
                        <span className="  text-black ">33k</span> Following
                    </p>
                    <p className="text-[12px]  font-semibold text-neutral-400">
                        <span className="  text-black ">23k</span> Follower
                    </p>
                </div>
                <p className=" w-full col-span-3 text-center text-[18px] text-[#828282]  md:text-start ">
                    {user.bio}
                </p>
            </div>
            <button className="bg-blue-500 mx-auto px-4 py-1 rounded-md md:ml-auto text-white text-[16px] flex  shrink-0 items-center  flex-nowrap">
                + Follow
            </button>
        </div>
    );
};

export default ProfileUserCard ;
