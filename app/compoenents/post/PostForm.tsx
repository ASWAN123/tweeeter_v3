"use client";
import Image from "next/image";
import PrivacyMenu from "./PrivacyMenu";
import UploadImage from "./UploadImage";
import {  useState } from "react";
import axios from "axios";
import { ImageIcon } from "../icons/Icons";
import { useQueryClient } from "@tanstack/react-query";


const Create_new_post = () => {
    const [url, setUrl] = useState<string>('');
    const [isPublic, setIsPublic] = useState(true);
    const [content, setContent] = useState<string>('') ;
    const queryClient = useQueryClient();


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (content.trim() === '' && url.trim() === '') return


        const data = {
            content: content,
            media_url: url,
            everyone_can_reply: isPublic,
        };

        const response  =  await  axios.post('/api/post/add' ,  {
            ...data
        })

        if(response.status == 201){
            setContent('')
            setUrl('')
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            return
        }
        

    };

    return (
        <>
        <form
            action=""
            className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md "
            onSubmit={handleSubmit}
        >
            <h1 className="font-semibold  ">Tweet something</h1>
            <hr />
            <div className="flex  space-x-2 items-center ">
                <Image
                    className="rounded"
                    src="/profile.png"
                    height={40}
                    width={40}
                    alt="profile"
                    quality={100}
                />
                <textarea
                    className="w-full outline-none  p-2 resize-none block"
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    cols={10}
                    rows={1}
                ></textarea>
            </div>
            {url && (
                <div className="w-full h-[200px] md:h-[250px] md:w-[350px] mx-auto my-8 relative">
                    <Image
                        fill
                        src={url}
                        alt="Picture of the author"
                        className="rounded-md shadow-sm  -z-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}
            {/* buttons  for  post comment form */}
            <div className="mt-4 flex items-center justify-between  gap-2 md:pl-6">
                <UploadImage setUrl={setUrl}  Icon = {
                                 <ImageIcon
                    width={24}
                    height={24}
                    className=  ' text-blue-500 md:w-6 md:h-6 '
                /> 
                }/>

                <PrivacyMenu isPublic={isPublic} setIsPublic={setIsPublic} />

                <input
                    type="submit"
                    value="Tweet"
                    className=" cursor-pointer  w-fit px-4 py-[0.3rem] text-[14px] bg-blue-400 text-white rounded-sm"
                />
            </div>
        </form>
        
        </>
    );
};

export default Create_new_post;