"use client";

import { useEdgeStore } from "../../lib/edgestore";

const UploadImage = ({ setUrl, Icon, inputId }) => {
    const { edgestore } = useEdgeStore();

    type UploadImageFunction = (file: File | undefined) => Promise<string>;

    const uploadImage: UploadImageFunction = async (file) => {
        if (!file) {
            console.error("No file selected");
            return "";
        }

        try {
            const res = await edgestore.publicFiles.upload({
                file,
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
            fileInput.click();
        }
    };

    const handleFileChange = async (e: any) => {
        const imageUrl = await uploadImage(e.target.files?.[0]);
        setUrl(imageUrl);
    };

    return (
        <>
            <div className="relative" onClick={handleUploadFile}>
              {Icon}
              
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

export default UploadImage;
