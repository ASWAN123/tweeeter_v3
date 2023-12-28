"use client";

import { useEdgeStore } from "../../lib/edgestore";
import { useState } from "react";

const UploadImage2 = ({ setUrl, Icon, inputId }) => {
    const [showInput, setShowInput] = useState(false);
    const [progessCountor , setProgressCountor] = useState(0)
    const { edgestore } = useEdgeStore();

    type UploadImageFunction = (file: File | undefined) => Promise<string>;

    const uploadImage: UploadImageFunction = async (file) => {
        if (!file) {
            console.error("No file selected");
            return "";
        }

        setShowInput(true)

        try {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange:(progress) => {
                    setProgressCountor(progress)
                }
            });

            const imageUrl = res.url;
            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    };

    const handleUploadFile = async () => {
        const fileInput = document.getElementById(inputId);
        if (fileInput) {
            fileInput.click() ;
        }
    };

    const handleFileChange = async (e: any) => {
        const imageUrl = await uploadImage(e.target.files?.[0]) ;
        setUrl(imageUrl) ;
        setShowInput(false)
    };

    return (
        <>
            <div className="" onClick={handleUploadFile}>
                {Icon}

                { showInput  && <div className="   p-4  md:w-[400px] z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1d4ed8] shadow-md rounded-md  flex flex-col gap-2 ">
                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-white">
                            Uploading ....
                        </span>
                        <span className="text-sm font-medium text-white ">
                            {progessCountor}%
                        </span>
                    </div>
                    <div className="w-full bg-[#60a5fa] rounded-full h-2.5">
                        <div
                            className="bg-[#eff6ff] h-2.5 rounded-full"
                            style={{ width: `${progessCountor}%` }}
                        ></div>
                    </div>
                </div> }
            </div>
            <label htmlFor="dropzone-file">
                <input
                    id={inputId}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
        </>
    );
};

export default UploadImage2;
