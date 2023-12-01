"use client"
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Upload_image from "../post/Upload_image";

const Create_new_comment = ({postId}) => {



    const [url, setUrl] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const queryClient = useQueryClient();


    // submit the  comment 
    const handleSubmit = async (e) => {
        e.preventDefault() ;
        if (content.trim() === "" && url.trim() === "") return ;

        const data = {
            content: content,
            media_url: url ,
            postId : postId ,
        };
        console.log(data)

        const response = await axios.post("/api/comment/add", {
            ...data ,
        });

        if(response.status == 201){
            setContent('')
            setUrl('')
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }

        console.log( response ,  'this  is  coming  form  the  comment  compo')
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full  min-h-[50px] max-h-[50px] gap-2  ">
            <Image
                className="rounded"
                src="/profile.png"
                height={40}
                width={40}
                alt="profile"
                quality={100}
            />
            <div className="flex w-full flex-col text-[14px] relative">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                    className=" bg-neutral-100 border outline-none text-gray-900 text-sm rounded-md w-full p-2.5 "
                    placeholder="tweet your reply"
                />

                <Upload_image formtype="comment" setUrl = {setUrl} />

            </div>
        </form>
    );
};

export default Create_new_comment;
