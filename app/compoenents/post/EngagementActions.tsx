import React from "react";
import { CommentIcon, HeartIcon, RetweetIcon, SaveIcon } from "../icons/Icons";
import { HandleLike } from "@/app/hooks/useLike";

const EngagementActions = ({postID}) => {

    const   handelToggleLike  = () => {
        HandleLike(postID)
    }

    




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
            <button onClick = {handelToggleLike} className="flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]">
                <HeartIcon
                    width={16}
                    height={16}
                    className=" text-neutral-500 md:w-6 md:h-6"
                />
                Like
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
