"use client"
import Image from "next/image";
import { HeartIcon } from "../icons/Icons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { postDetailsConfig } from "@/app/queryConfig";
import { useQueryClient } from "@tanstack/react-query";

const Comment = ({ comment }) => {
    
    const {data  :session } = useSession()
    const queryClient = useQueryClient();


    const Commentalreadyliked = comment.commentLikes.find(
        (x: any) => x.commentId == comment.id && comment.userId ==  session?.user?.sub   );
    
    let likeID = Commentalreadyliked?.id;
    const [like, setLike] = useState(Commentalreadyliked);
    const [likeId, setLikeId] = useState(likeID);



    const handleToggleLike = async () => {
        if (like) {
            setLike(false);
            const resposne = await axios.post("/api/comment/unlike", {
                id: likeId,
            });
            queryClient.invalidateQueries(postDetailsConfig(comment.postId));

            return;
        } else {
            setLike(true);
            const resposne = await axios.post("/api/comment/like", {
                id:comment.id,
            });
            setLikeId(resposne.data.Liked.id);
            queryClient.invalidateQueries(postDetailsConfig(comment.postId));

            return;
        }
    };









    return (
        <div className="w-full flex gap-2 items-start mb-2">
            <Image
                className="rounded"
                src={comment.User.media_url ?? "/profile.png"}
                height={40}
                width={40}
                alt="profile"
                quality={100}
            />
            <div className="w-full  flex flex-col gap-2 ">
                <div className="flex  flex-col gap-2 bg-neutral-100 p-2 rounded-md">
                    <div className="flex gap-2 items-center">
                        <p className=" font-medium text-[14px]   font-poppins ">{comment.User.name}</p>
                        <span className="text-[#BDBDBD] text-[12px] font-notoSans font-medium">
                            {new Date(comment.created_at).toLocaleString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "long",
                                    hour: "numeric",
                                    minute: "numeric",
                                }
                            )}
                        </span>
                    </div>
                    <div>
                        <p className=" font-notoSans  font-normal text-[16px] text-[#4F4F4F] ">{comment.content}</p>
                        { comment.media_url  &&
                        <Image
                        className="rounded"
                        src={comment.media_url}
                        height={150}
                        width={250}
                        alt="profile"
                        quality={100}
                    />
                        }

                    </div>
                </div>
                <div className="flex items-center gap-2  font-notoSans text-[12px] font-semibold text-[#BDBDBD]">
                    <HeartIcon
                        width={16}
                        height={16}
                        className={ like ? "text-red-400 cursor-pointer" : "cursor-pointer text-[#BDBDBD] " }
                        onClick={handleToggleLike}
                    />{" "}
                    Like , {comment.commentLikes.length} Likes
                </div>
            </div>
        </div>
    );
};

export default Comment;
