"use client";
import React from "react";
import Image from "next/image";
import PrivacyMenu from "./PrivacyMenu";
import UploadImage from "./UploadImage";
import { useState } from "react";
import axios from "axios";
import { ImageIcon } from "../icons/Icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { userDetailsConfig } from "@/app/queryConfig";
import UploadImage2 from "./UplaodImage2";

const PostForm = () => {
    const { data: userDetails, isLoading: isUserLoading } = useQuery(
        userDetailsConfig(undefined)
    );

    const [url, setUrl] = useState(null);
    const [isPublic, setIsPublic] = useState(true);
    const [content, setContent] = useState(null);
    const queryClient = useQueryClient();

    const id = uuidv4();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content?.trim() === "" && url?.trim() === "") return;
        const hashtags = content.match(/#\w+/g);
        let newHashtags = hashtags?.map((x, index) => {
            return { name: x.toLowerCase() };
        });

        const data = {
            content: content,
            media_url: url,
            everyone_can_reply: isPublic,
            hashtags: newHashtags ?? [],
        };

        console.log(data);

        const response = await axios.post("/api/post/add", {
            ...data,
        });

        if (response.status == 201) {
            setContent("");
            setUrl("");

            queryClient.invalidateQueries({ queryKey: ["homePosts"] });
            queryClient.invalidateQueries({ queryKey: ["hashTags"] });

            return;
        }
    };

    return (
        <>
            <form
                action=""
                className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md "
                onSubmit={handleSubmit}
            >
                <h1 className="font-semibold font-poppins text-[12px] leading-[18px]  ">Tweet something</h1>
                <hr />
                <div className="flex  space-x-2 items-start ">
                    {userDetails && (
                        <Image
                            className="rounded"
                            src={userDetails?.media_url ?? "/profile.png"}
                            height={40}
                            width={40}
                            alt="profile"
                            quality={100}
                        />
                    )}
                    {/* input */}
                    <textarea
                        className=" text-[16px] outline-none w-full placeholder:text-gray-300 p-2 test-gray-200 font-notoSans  resize-none overflow-hidden"
                        value={content}
                        placeholder="What’s happening?"
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        name=""
                        id=""
                    ></textarea>
                </div>
                {url && (
                    <>
                        <div className="w-[70%] h-[200px] md:h-[250px] md:w-[350px] mx-auto my-8 relative">
                            <Image
                                fill
                                src={url}
                                alt="Picture of the author"
                                className="rounded-md shadow-sm  -z-0"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 absolute -top-[20px] -right-[20px] text-red-500 cursor-pointer "
                            onClick={() => {
                                setUrl(undefined);
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        </div>
                    </>
                )}

                {/* buttons  for  post comment form */}
                
                <div className="mt-4 flex items-center justify-between  gap-2 md:pl-6">
                    {/* <UploadImage
                        setUrl={setUrl}
                        Icon={
                            <ImageIcon
                                width={24}
                                height={24}
                                className=" text-blue-500 md:w-6 md:h-6 "
                            />
                        }
                        inputId={id}
                    /> */}
                    < UploadImage2
                        setUrl={setUrl}
                        Icon={
                            <ImageIcon
                                width={24}
                                height={24}
                                className=" text-blue-500 md:w-6 md:h-6 "
                            />
                        }
                        inputId={id}
                    />

                    <PrivacyMenu
                        isPublic={isPublic}
                        setIsPublic={setIsPublic}
                    />

                    <input
                        type="submit"
                        value="Tweet"
                        className=" font-notoSans cursor-pointer  w-fit px-6 font-semibold py-2 text-[12px] bg-[#2F80ED] text-white rounded-sm"
                    />
                </div>
            </form>
        </>
    );
};

export default PostForm;
