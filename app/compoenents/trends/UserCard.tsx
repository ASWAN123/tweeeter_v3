"use client";
import Image from "next/image";
import { FriendIcon } from "../icons/Icons";
import { userDetailsConfig } from "@/app/queryConfig";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const User_card = ({ user }) => {
    const { data: session } = useSession();
    const queryClient = useQueryClient();
    const { data: userDetails, isLoading: isUserLoading } = useQuery(
        userDetailsConfig(user.id)
    );

    // update  this  to  work with  the  user  objects
    // const afollower = userDetails?.followers.find(
    //     (x) => x.userId == session?.user?.sub
    // );
    // console.log(afollower ,  user.id  )

    

    const [follow, setFollow] = useState();
        
    
    useEffect(() => {
        let check  = userDetails?.followers.find(
            (x) => x.userId == session?.user?.sub
        )
        if(check){
            setFollow(check.id)
        }
    } ,  [session?.user?.sub, userDetails])

    const doFolllow = async () => {
        setFollow(true);
        const userId = userDetails.id;

        const response = await axios.post("/api/userIntraction/dofollow", {
            userId,
        });

        setFollow(response.data.addedfollower.id)
        queryClient.invalidateQueries(userDetailsConfig(user.id ));
        
    };

    const undoFollow = async () => {
        setFollow(false);
        const id = follow
        const response = await axios.post("/api/userIntraction/unfollow", {
            id ,
        });
        queryClient.invalidateQueries(userDetailsConfig(user.id )) ;

        console.log(response);
    };

    const handleToggle = () => {
        
        if (follow) {
            undoFollow();
        } else {
            doFolllow();
        }
    };

    return (
        <>
            <div className="flex items-start gap-2 ">
                {userDetails && (
                    <>
                        <Image
                            className="rounded"
                            src={userDetails?.media_url ?? "/profile.png"}
                            height={40}
                            width={40}
                            alt="cover author"
                        />
                        <div className="flex flex-col ">
                            <Link href={`/profile?id=${userDetails.id}`}>
                            <p className="font-semibold text-[14px]">
                                {userDetails.name.length > 12
                                    ? `${userDetails.name.substring(0, 12)}...`
                                    : userDetails.name}
                            </p>
                            </Link>
                            <span className="text-neutral-300">
                                {userDetails.followers.length} followers
                            </span>
                        </div>
                        <button onClick={handleToggle} className="flex  gap-1 bg-blue-500 px-2 rounded-sm py-1 text-white ml-auto ">
                            <FriendIcon
                                width={16}
                                height={16}
                                className= { follow ? " hidden" : " text-white "}
                            />
                            {follow ? "Following" : "+ Follow"}
                        </button>{" "}
                    </>
                )}
            </div>
            {userDetails && (
                <p className="col-span-3">
                    Photographer & Filmmaker based in Copenhagen, Denmark
                </p>
            )}
            {userDetails && userDetails.posts[0]?.media_url && (
                <div className="w-full h-[200px] md:h-[200px] relative col-span-3">
                    <Image
                        src={userDetails.posts[0].media_url ?? "/profile.png"}
                        alt="Picture of the author"
                        className="rounded-md shadow-sm  -z-0"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}
        </>
    );
};

export default User_card;
