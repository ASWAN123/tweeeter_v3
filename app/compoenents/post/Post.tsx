"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {  useQuery } from "@tanstack/react-query";
import EngagementActions from "./EngagementActions";
import CreateNewComment from "../comment/CommentForm";
import Comment from "../comment/Comment";
import SkeletonComment from "../skeletons/SkeletonComment";
import SkeletonPost from "../skeletons/skeletonPost";
import { hashTagsConfig, postDetailsConfig } from "../../queryConfig";
import { DeleteIcon, RetweetIcon } from "../icons/Icons";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Post = ({ postid , is_retweet = undefined }) => {
    const queryClient = useQueryClient();
    const { data: session } = useSession();
    const {
        data: postDetails,
        isLoading,
        isFetching,
        isFetched,
        error,
    } = useQuery(postDetailsConfig(postid));




    return (
        <>
            {postDetails && (
                <div className="bg-[#ffffff] flex flex-col  gap-3 p-4 relative shadow-md rounded-md last:mb-8">
                    {is_retweet && (
                        <div className=" rounded-md w-fit  flex gap-2 text-green-800 text-[16px] bg-green-300 px-2 py-1">
                            <RetweetIcon
                                width={20}
                                height={20}
                                className="text-green-800 md:w-[20px] md:h-[20px]"
                            />
                            <p className=" font-notoSans">Retweeted</p>
                        </div>
                    )}
                    <div className="flex items-center gap-4 ">
                        <div className="relative w-[40px] h-[40px]">
                            <Image
                                className="rounded"
                                src={
                                    postDetails.author.media_url ??
                                    "/profile.png"
                                }
                                height={40}
                                width={40}
                                alt="cover author"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Link
                                href={`/profile?id=${postDetails.author.id}`}
                                className=" font-poppins  font-medium cursor-pointer  text-[16px]"
                            >
                                {postDetails?.author?.name}
                            </Link>
                            <span className="text-neutral-400 font-notoSans font-medium">
                                {new Date(
                                    postDetails.created_at
                                ).toLocaleString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    hour: "numeric",
                                    minute: "numeric",
                                })}
                            </span>
                        </div>

                    </div>

                    <p className="text-[16px] md:text-[16px] font-notoSans font-normal text-[#4F4F4F] ">
                        {postDetails.content}
                    </p>
                    {postDetails.media_url && (
                        <div className=" h-[320px] md:h-[500px] w-full relative">
                            <Image
                                src={postDetails.media_url}
                                alt="Picture of the author"
                                className="rounded-md shadow-sm -z-0"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        {/* <hr /> */}
                        {postDetails && (
                            <EngagementActions post={postDetails} />
                        )}
                        <hr />
                        <CreateNewComment
                            postId={postDetails?.id}
                            profileimg={
                                postDetails.author.media_url ?? "/profile.png"
                            }
                        />
                        {postDetails?.comments.length > 0 && <hr />}

                        <div className="mt-2">
                            {!isLoading &&
                                postDetails.comments.map(
                                    (comment: any, index: any) => (
                                        <Comment
                                            comment={comment}
                                            key={comment.id}
                                        />
                                    )
                                )}
                        </div>
                    </div>
                </div>
            )}

            {isLoading && <SkeletonPost />}
        </>
    );
};

export default Post;
