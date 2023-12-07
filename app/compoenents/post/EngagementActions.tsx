'use client'

import { CommentIcon, HeartIcon, RetweetIcon, SaveIcon } from "../icons/Icons";

import classNames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";


const EngagementActions = ({ postID , likes }) => {
    const [liked ,  notLiked ] = useState({

    })
    const alreadyliked = likes?.find((x) => x.postId  == postID);
    let id = alreadyliked?.id;
    const queryClient = useQueryClient();
    
    




    const handleToggleLike = async() => {

        if (alreadyliked) {

            const resposne  = await axios.post('/api/userIntraction/unlike' ,  {
                id 
            })
            queryClient.invalidateQueries({ queryKey: ['post' , postID] });
            return 

        }else{
                        
            const resposne  = await axios.post('/api/userIntraction/like' ,  {
                postID 
            })
            queryClient.invalidateQueries({ queryKey: ['post' , postID] });
            return  

        }

        
    };

    const LikeClass = classNames({
        "flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-red-500": alreadyliked ? true : false,
        "text-neutral-500": alreadyliked ? false : true,
    });

    return (
        <div className="flex justify-between ">
            <button className="flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]">
                <CommentIcon
                    width={16}
                    height={16}
                    className=" text-neutral-500 md:w-6 md:h-6"
                />
                Comment
            </button>
            <button className="flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]">
                <RetweetIcon
                    width={16}
                    height={16}
                    className=" text-neutral-500 md:w-6 md:h-6"
                />
                Retweet
            </button>
            <button onClick={ handleToggleLike} className={LikeClass}>
                <HeartIcon width={16} height={16} className=" md:w-6 md:h-6 " />
                {liked ? "Liked" : "Like"}
            </button>
            <button className="flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]">
                <SaveIcon
                    width={16}
                    height={16}
                    className=" text-neutral-500 md:w-6 md:h-6"
                />
                Save
            </button>
        </div>
    );
};

export default EngagementActions;
