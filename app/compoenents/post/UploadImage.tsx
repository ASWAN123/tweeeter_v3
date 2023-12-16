"use client";
import { ImageIcon } from "../icons/Icons";
import { useEdgeStore } from "../../lib/edgestore";
import axios from "axios";
import { useRef } from "react";

const UploadImage = ({ setUrl, Icon }) => {
  const { edgestore } = useEdgeStore();
  

//   type UploadImageFunction = (file: File | undefined) => Promise<string>;

//   const uploadImage: UploadImageFunction = async (file) => {
//     if (!file) {
//       console.error("No file selected");
//       return "";
//     }

//     try {
//       const res = await edgestore.publicFiles.upload({
//         file,
//       });

//       const imageUrl = res.url; 
//       console.log(imageUrl);
//       return imageUrl;
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       return ""; 
//     }
//   }; 


  const handleUploadFile = async () => {
    const fileInput = document.getElementById("dropzone-file");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (e:any) => {
    // const imageUrl = await uploadImage(e.target.files?.[0]);
    // urlRef.current = e.target.files?.[0];
    console.log(e.target.files?.[0])
    setUrl(e.target.files?.[0])
  };

  return (
    <>
      {/* Icon */}
      <div onClick={handleUploadFile}>{Icon}</div>
      <label htmlFor="dropzone-file">
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </>
  );
};

export default UploadImage;
