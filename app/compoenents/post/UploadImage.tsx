"use client";

import { ImageIcon } from "../icons/Icons";
import { useEdgeStore } from "../../lib/edgestore";

const HandleUploadFile = () => {
    const HandleClick = document.getElementById("dropzone-file")?.click();
};

const UploadImage = ({ setUrl, Icon }) => {
    const { edgestore } = useEdgeStore();

    type UploadImageFunction = (file: File | undefined) => void;

    const uploadImage: UploadImageFunction = async (file) => {
        if (!file) {
            console.error("No file selected");
            return;
        }

        const res = await edgestore.publicFiles.upload({
            file,
        });
        setUrl(res.url);
    };

    return (
        <>
            {/* Icon */}

            <div onClick={HandleUploadFile}>{Icon}</div>
            <label htmlFor="dropzone-file">
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                        console.log(e.target.files);
                        uploadImage(e.target.files?.[0]);
                    }}
                />
            </label>
        </>
    );
};

export default UploadImage;
