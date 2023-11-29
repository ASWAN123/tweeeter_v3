"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { BiImageAlt, BiWorld } from "react-icons/bi";
import { ImageIcon } from "../icons/Icons";
import { useEdgeStore } from "..//../lib/edgestore";

const HandleUploadFile = () => {
    const HandleClick = document.getElementById("dropzone-file")?.click();
};

const Upload_image = ({  setUrl }) => {
    const { edgestore } = useEdgeStore();
    
    type UploadImageFunction = (file: File | undefined) => void;

    const uploadImage: UploadImageFunction = async (file) => {
        if (!file) {
            console.error('No file selected');
            return;
        }
    
        const res = await edgestore.publicFiles.upload({
            file,
        });
        setUrl(res.url);
    };





    return (
        <div>
            {/* Icon */}
            <div onClick={HandleUploadFile}>
                <ImageIcon
                    width={24}
                    height={24}
                    className=" text-blue-500 md:w-6 md:h-6 "
                />
            </div>
            <label htmlFor="dropzone-file">
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      console.log(e.target.files)
                        uploadImage( e.target.files?.[0] ) ;
                    }}
                />
            </label>
        </div>
    );
};

export default Upload_image;
