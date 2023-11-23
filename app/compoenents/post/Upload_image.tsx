"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { BiImageAlt, BiWorld } from "react-icons/bi";
import { ImageIcon } from "../icons/Icons";

import { useEdgeStore } from "..//../lib/edgestore";

const HandleUploadFile = () => {
    const HandleClick = document.getElementById("dropzone-file")?.click();
};

const Upload_image = ({ urls, setUrls }) => {
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();

    const uploadImage = async () => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    console.log(progress);
                },
            });

            console.log(res.url)
            setUrls((prevUrls) => [...prevUrls, res.url]);
        }
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
                        setFile(e.target.files?.[0]);
                        uploadImage();
                    }}
                />
            </label>
        </div>
    );
};

export default Upload_image;
