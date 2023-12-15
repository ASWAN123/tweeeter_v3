"use client";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UploadImage from "../post/UploadImage";
import { ImageIcon } from "../icons/Icons";
import HashtagInput from "../post/HashtagInput";

const CreateNewComment = ({ postId }) => {
    const [url, setUrl] = useState<string>("");
    const [value, setValue ] = useState("");
    const queryClient = useQueryClient();

    // submit the  comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (value.trim() === "" && url.trim() === "") return;

        const data = {
            content: value,
            media_url: url,
            postId: postId,
        };
        console.log(data);

        const response = await axios.post("/api/comment/add", {
            ...data,
        });

        if (response.status == 201) {
            // check  this later make sure to remove input text to avoid delete on submit because it  looks ugly
            setValue("");
            setUrl("");
            queryClient.invalidateQueries({ queryKey: ["post" , postId ] });
        }

        console.log(response, "this  is  coming  form  the  comment  compo");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center w-full  min-h-[50px] max-h-[50px] gap-2  "
        >
            <Image
                className="rounded"
                src="/profile.png"
                height={40}
                width={40}
                alt="profile"
                quality={100}
            />
            <div className="flex w-full flex-col text-[14px] relative">
                {/* <input
                    type="text"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    className=" bg-neutral-100 border outline-none text-gray-900 text-sm rounded-md w-full p-2.5 "
                    placeholder="tweet your reply"
                /> */}
                <div className="'bg-neutral-100  border text-gray-900 text-sm rounded-md w-full p-2.5'">
                <HashtagInput value={value} setValue={setValue}  />
                </div>
                <UploadImage
                    Icon={
                        <ImageIcon
                            width={24}
                            height={24}
                            className=" text-gray-300 absolute right-2 top-2 "
                        />
                    }
                    setUrl={setUrl}
                />
            </div>
        </form>
    );
};

export default CreateNewComment;
