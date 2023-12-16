"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EngagementActions from "./EngagementActions";
import CreateNewComment from "../comment/CommentForm";
import Comment from "../comment/Comment";
import SkeletonComment from "../skeletons/SkeletonComment";
import SkeletonPost from "../skeletons/skeletonPost";
import { postDetailsConfig } from "../../queryConfig";

const Post = ({ postid }) => {
    const {
        data: postDetails,
        isFetched,
        isLoading,
        error,
    } = useQuery(postDetailsConfig(postid));

    if (isLoading) {
        return <SkeletonPost />;
    }



    return (
        <div className="bg-[#ffffff] flex flex-col gap-3 p-4 relative shadow-md rounded-md last:mb-8">
            <div className="flex items-center gap-4">
                <div className="relative w-[40px] h-[40px]">
                    <Image
                        className="rounded"
                        src={postDetails.author.media_url ?? "/profile.png"}
                        height={40}
                        width={40}
                        alt="cover author"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Link href={`/user/${postDetails.author.id}`}>
                        <a className="cursor-pointer font-semibold text-[16px]">
                            {postDetails?.author?.name}
                        </a>
                    </Link>
                    <span className="text-neutral-400">
                        {new Date(postDetails.created_at).toLocaleString(
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
            </div>

            <p className="text-[16px] md:text-[12px]">{postDetails.content}</p>
            {postDetails.media_url && (
                <div className="w-full h-[200px] md:h-[500px] relative">
                    <Image
                        src={postDetails.media_url}
                        alt="Picture of the author"
                        className="rounded-md shadow-sm -z-0"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            <div className="flex justify-end space-x-3 text-neutral-400 -mb-2 md:mb-auto md:-mt-1">
                <span>{postDetails.comments.length} Comments</span>
                <span>{postDetails.Retweets.length} Retweets</span>
                <span>{postDetails.saves.length} Saved</span>
            </div>

            <div className="flex flex-col gap-2">
                <hr />
                <EngagementActions post={postDetails} />
                <hr />
                <CreateNewComment
                    postId={postDetails?.id}
                    profileimg={postDetails.author.media_url ?? "/profile.png"}
                />
                {postDetails?.comments.length > 0 && <hr />}

                <div className="mt-2">
                    {postDetails.comments.map((comment: any, index: any) => (
                        <Comment comment={comment} key={index} />
                    ))}
                    {postDetails.comments.length === 0 && (
                        <div className="w-full flex items-center justify-center my-4">
                            <p>No comments for this post</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;
