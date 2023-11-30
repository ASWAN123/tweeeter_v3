"use client";

import { ImageIcon } from "../icons/Icons";
import { useEdgeStore } from "..//../lib/edgestore";

const HandleUploadFile = () => {
    const HandleClick = document.getElementById("dropzone-file")?.click();
};

const Upload_image = ({  setUrl ,  formtype }) => {
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
        <>
            {/* Icon */}
                <ImageIcon
                    width={24}
                    height={24}
                    onClick={HandleUploadFile}
                    className={  formtype == 'post' ? ' text-blue-500 md:w-6 md:h-6 ' : ' text-gray-300 absolute right-2 top-2 '  }
                />

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
        </>
    );
};

export default Upload_image;
