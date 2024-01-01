"use client";
import Image from "next/image";
import { EditContentIcon, EditIcon } from "../compoenents/icons/Icons";
import { useEffect, useRef, useState } from "react";
import UploadImage from "../compoenents/post/UploadImage";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useEdgeStore } from "../lib/edgestore";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import UploadImage2 from "../compoenents/post/UplaodImage2";

const ProfileUserCard = ({ user }) => {
    // console.log(user);

    const { data: session } = useSession();
    const queryClient = useQueryClient();

    const [url, setUrl] = useState();
    
    // editable bio
    const [bioEdit, setBioEdit] = useState(true);
    const  [ bioConent  , setBioContent  ] = useState( user.bio )
    
    // update  this  to  work with  the  user  objects
    const afollower = user?.followers.find(
        (x) => x.userId == session?.user?.sub
    );

    const [follow, setFollow] = useState(afollower ? true : false);

    const id = uuidv4();

    const handleInputBlur = () => {
        const updateUserData = async () => {
            const response = await axios.post("/api/user/update", {
                bio: bioConent,
            });
            queryClient.invalidateQueries({ queryKey: ["userDetails"] });
        };

        if (bioConent !== user.bio) {
            updateUserData();
        }

    }

    useEffect(() => {
        const updateUserData = async () => {
            const response = await axios.post("/api/user/update", {
                media_url: url,
            });
            queryClient.invalidateQueries({ queryKey: ["userDetails"] });
        };

        if (url) {
            updateUserData();
        }
    }, [queryClient, url]);

    const doFolllow = async () => {
        setFollow(true);
        const userId = user.id;

        const response = await axios.post("/api/userIntraction/dofollow", {
            userId,
        });

        console.log(response);
    };

    const undoFollow = async () => {
        setFollow(false);
        const id = afollower.id;
        const response = await axios.post("/api/userIntraction/unfollow", {
            id,
        });

        console.log(response);
    };

    const handleToggle = () => {
        console.log("clicked");
        if (follow) {
            undoFollow();
        } else {
            doFolllow();
        }
    };

    return (
        <div className="min-h-[163px]  flex flex-col  md:flex-row items-center gap-4 md:items-start bg-white rounded-md w-full py-4 px-6 -mt-24 col-span-3 shadow-md ">
            <div className="min-w-[160px]   rounded-md bg-white min-h-[160px] md:min-w-[150px] md:min-h-[150px] w-[100px] h-[100px] relative  shadow-sm -z-0  -mt-32 md:-mt-20">
                {session?.user?.sub == user?.id && (
                    <UploadImage2
                        Icon={
                            <EditIcon className=" w-8 h-8 absolute text-black rounded-full -top-2 -left-2 z-[35] p-1  bg-white    cursor-pointer " />
                        }
                        setUrl={setUrl}
                        inputId={id}
                    />
                )}

                <Image
                    src={url ?? user?.media_url ?? "/profile.png"}
                    alt="Picture of the author"
                    className=" rounded-md p-[5px] z-10"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="w-full flex flex-col gap-2 md:flex-col md:gap-6  flex-wrap ">
                <div className="  flex flex-col md:flex-row items-center gap-6 font-poppins " >
                    <p className="text-center w-fit text-[24px] font-semibold   mb-2  ">
                        {user?.name}
                    </p>
                    <div className="flex flex-col gap-2 md:flex-row md:ml-4 text-[#828282]  items-center">
                        <p className="text-[12px]  font-medium   ">
                            <span className="  text-[#333333] font-semibold  ">
                                {user.following.length}
                            </span>{" "}
                            Following
                        </p>
                        <p className="text-[12px]   font-medium ">
                            <span className="  text-[#333333]  font-semibold  ">
                                {user.followers.length}
                            </span>{" "}
                            Follower
                        </p>
                    </div>
                </div>

                <label htmlFor="" className=" md:max-w-[50%] flex flex-col md:flex-row  items-center gap-2 font-notoSans">
                    <textarea
                        className=" p-1 font-medium text-[#828282] resize-none bg-transparent w-full placeholder:w-fit  text-[16px]  "
                        
                        placeholder={
                            user.bio && user.id == session?.user?.sub
                                ? user.bio
                                : "write something about yourself"
                        }
                        value={ bioConent }
                        onChange={(e) => {setBioContent(e.target.value)}}
                        onBlur={handleInputBlur}
                        rows={2}
                    ></textarea>
                </label>
            </div>
            {session?.user?.sub != user?.id && (
                <button
                    onClick={handleToggle}
                    className="bg-blue-500 font-notoSans mx-auto px-4 font-medium py-1 rounded-md md:ml-auto text-white text-[12px] flex  shrink-0 items-center  flex-nowrap"
                >
                    {follow ? "Following" : "+ Follow"}
                </button>
            )}
        </div>
    );
};

export default ProfileUserCard;
