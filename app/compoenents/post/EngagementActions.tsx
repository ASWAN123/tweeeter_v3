"use client";
import { CommentIcon, HeartIcon, RetweetIcon, SaveIcon } from "../icons/Icons";
import classNames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { postDetailsConfig } from "@/app/queryConfig";

const EngagementActions = ({ post }) => {
    const queryClient = useQueryClient();

    let postId = post.id;
    let author = post.author.id;

    // like
    const alreadyliked = post.likes.find(
        (x: any) => x.postId == postId && x.userId == author
    );
    let likeID = alreadyliked?.id;
    const [like, setLike] = useState(alreadyliked);
    const [likeId, setLikeId] = useState(likeID);

    // comment
    let alreadyCommented = post.comments.find(
        (x: any) => x.postId == postId && x.userId == author
    );
    let commentID = alreadyCommented?.id;
    const [comment, setComment] = useState(alreadyCommented);

    // saved
    const alreadySaved = post.saves.find(
        (x: any) => x.postId == postId && x.userId == author
    );
    let saveID = alreadySaved?.id;
    const [save, setSave] = useState(alreadySaved);
    const [saveId, setSaveId] = useState(saveID);

    // retweet
    const alreadyRetweeted = post.Retweets.find(
        (x: any) => x.postId == postId && x.userId == author
    );
    let retweetID = alreadyRetweeted?.id;
    const [retweet, setRetweet] = useState(retweetID);
    const [retweetId, setRetweetId] = useState(retweetID);

    //  end  count stuf

    const handleToggleLike = async () => {
        if (like) {
            setLike(false);
            const resposne = await axios.post("/api/userIntraction/unlike", {
                id: likeId,
            });
            queryClient.invalidateQueries(postDetailsConfig(postId));

            return;
        } else {
            setLike(true);
            const resposne = await axios.post("/api/userIntraction/like", {
                postId,
            });
            setLikeId(resposne.data.Liked.id);
            queryClient.invalidateQueries(postDetailsConfig(postId));

            return;
        }
    };




    const handleToggleSave = async () => {
        if (save) {
            setSave(false);

            const resposne = await axios.post("/api/userIntraction/unsave", {
                id: saveId,
            });


            queryClient.invalidateQueries(postDetailsConfig(postId));
            

            return;
        } else {
            setSave(true);

            const resposne = await axios.post("/api/userIntraction/save", {
                postId,
            });

            
            
            setSaveId(resposne.data.saved.id);

            

            queryClient.invalidateQueries(postDetailsConfig(postId));

            

            return;
        }
    };






    const handleToggleRetweet = async () => {
        if (retweet) {
            setRetweet(false);
            const resposne = await axios.post(
                "/api/userIntraction/undoRetweet",
                {
                    id: retweetId,
                }
            );
            queryClient.invalidateQueries(postDetailsConfig(postId));

            return;
        } else {
            setRetweet(true);
            const resposne = await axios.post("/api/userIntraction/retweet", {
                postId,
            });
            setRetweetId(resposne.data.retweeted.id);
            queryClient.invalidateQueries(postDetailsConfig(postId));

            return;
        }
    };

    const LikeClass = classNames({
        "flex gap-2  items-center mx-2  px-2 md:px-6 md:py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-red-500": like ? true : false,
        "text-neutral-500": like ? false : true,
    });

    const CommentClass = classNames({
        "flex gap-2  items-center md:mx-2  px-2 md:px-6 py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-gray-900": comment ? true : false,
        "text-neutral-500": comment ? false : true,
    });

    const SaveClass = classNames({
        "flex gap-2  items-center mx-2  px-2 md:px-6 py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-blue-500": save ? true : false,
        "text-neutral-500": save ? false : true,
    });

    const RetweetClass = classNames({
        "flex gap-2  items-center mx-2  px-2 md:px-6 py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-green-300": retweet ? true : false,
        "text-neutral-500": retweet ? false : true,
    });

    return (
        <>
            <div className="flex justify-end space-x-3 text-neutral-400 -mb-2 md:mb-auto md:-mt-1">
                <span>{post.comments.length} Comments</span>
                <span>{post.Retweets.length} Retweets</span>
                <span>{post.saves.length} Saved</span>
            </div>

            <div className="flex justify-between   lg:md:6 ">
                <button className={CommentClass}>
                    <CommentIcon
                        width={16}
                        height={16}
                        className=" md:w-[20px] md:h-[20px]"
                    />
                    Comment
                </button>
                <button onClick={handleToggleRetweet} className={RetweetClass}>
                    <RetweetIcon
                        width={16}
                        height={16}
                        className="  md:w-[20px] md:h-[20px]"
                    />
                    {retweet ? "Retweeted" : "Retweet"}
                </button>
                <button onClick={handleToggleLike} className={LikeClass}>
                    <HeartIcon
                        width={16}
                        height={16}
                        className=" md:w-[20px] md:h-[20px] "
                    />
                    {like ? "Liked" : "Like"}
                </button>
                <button onClick={handleToggleSave} className={SaveClass}>
                    <SaveIcon
                        width={16}
                        height={16}
                        className="  md:w-[20px] md:h-[20px]"
                    />
                    {save ? "Saved" : "Save"}
                </button>
            </div>
        </>
    );
};

export default EngagementActions;
