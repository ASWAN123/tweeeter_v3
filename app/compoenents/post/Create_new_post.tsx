"use client"
import Image from "next/legacy/image";
import Privacy_menu from "./Privacy_menu";
import Upload_image from "./Upload_image";
import { useState } from "react";

const Create_new_post = () => {
    const [urls, setUrls] = useState<string[]>([]);


    return (
        <form
            action=""
            className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md "
        >
            <h1 className="font-semibold  ">Tweet something</h1>
            <hr />
            <div className="flex space-x-2 items-center ">
                <Image
                    src="/profile.png"
                    width={40}
                    height={40}
                    alt="Picture of the author"
                    className="rounded-md shadow-sm "
                    layout="responsive"
                />
                <textarea
                    className="w-full outline-none  p-2 resize-none"
                    placeholder="What's happening?"
                    name=""
                    id=""
                    cols="10"
                    rows="1"
                ></textarea>
            </div>
            {/* buttons  for  post comment form */}
            <div className="mt-4 flex items-center justify-between  gap-2 md:pl-6">
                <Upload_image  urls ={urls} setUrls = {setUrls}/>

                <Privacy_menu />

                <input
                    type="submit"
                    value="Tweet"
                    className="w-fit px-4 py-[0.3rem] text-[14px] bg-blue-400 text-white rounded-sm"
                />
            </div>
        </form>
    );
};

export default Create_new_post ;
