"use client";
import Image from "next/image";
import {  useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UploadImage from "../post/UploadImage";
import { ImageIcon } from "../icons/Icons";
import { v4 as uuidv4 } from "uuid";
import  { postDetailsConfig } from "@/app/queryConfig"
 

const CreateNewComment = ({ postId, profileimg }) => {
    const queryClient = useQueryClient();


    const [url, setUrl] = useState<string>();
    const [content, setContent] = useState("");
    const id = uuidv4();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ( content.trim() === "" && url?.trim() === "" ) return ;


        const data = {
            content: content,
            media_url: url,
            postId: postId,
        };

        const response = await axios.post("/api/comment/add", {
            ...data,
        });

        // queryClient.invalidateQueries({
        //     queryKey: ["postDetails", postId],
        // });
        queryClient.invalidateQueries(postDetailsConfig(postId));

        if (response.status == 201) {
            setContent("") ;
            setUrl("") ; 
        }

        
    };

    return (
        <>
        <form
            onSubmit={handleSubmit}
            className="flex items-center w-full gap-2  "
        >
            <Image
                className="rounded"
                src={profileimg}
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
                    inputId={id}
                />
            </div>
        </form>
            {url && (
                    <div className="w-full h-[100px] md:h-[100px] md:w-[200px] mx-auto my-8 relative">
                        <Image
                            fill
                            src={url}
                            alt="Picture of the author"
                            className="rounded-md shadow-sm  -z-0"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}
        </>
    );
};

export default CreateNewComment;
function postDetailsQueryKey(postId: any) {
    throw new Error("Function not implemented.");
}

