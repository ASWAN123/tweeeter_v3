"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UploadImage from "../post/UploadImage";
import { ImageIcon } from "../icons/Icons";
import HashtagInput from "../post/HashtagInput";

const CreateNewComment = ({ postId , profileimg }) => {
    const [url, setUrl] = useState<string>("");
    const [content, setContent] = useState("");
    const queryClient = useQueryClient();

    // submit the  comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim() === "" && url.trim() === "") return;

        const data = {
            content: content,
            media_url: url,
            postId: postId,
        };
        console.log(data);

        const response = await axios.post("/api/comment/add", {
            ...data,
        });

        if (response.status == 201) {
            // check  this later make sure to remove input text to avoid delete on submit because it  looks ugly
            setContent("");
            setUrl("");
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
        }

        console.log(response, "this  is  coming  form  the  comment  compo");
    };





    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center w-full gap-2  "
        >
            <Image
                className="rounded"
                src= {profileimg}
                height={40}
                width={40}
                alt="profile"
                quality={100}
            />
            <div className="flex bg-[#f2f2f2] rounded-md border w-full flex-col text-[14px] relative ">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    className=" bg-neutral-100  bg-transparent outline-none text-[#BDBDBD] text-sm rounded-md w-full p-2.5 "
                    placeholder="tweet your reply"
                />

                <UploadImage
                    setUrl={setUrl}
                    Icon={
                        <ImageIcon
                            width={24}
                            height={24}
                            className=" text-gray-400  cursor-pointer absolute right-2 top-2 "
                        />
                    }
                />
            </div>

        </form>
    );
};

export default CreateNewComment;
