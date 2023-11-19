"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { BiImageAlt, BiWorld } from "react-icons/bi";
import { ImageIcon } from "../icons/Icons";


const HandleUploadFile = () => {
    const HandleClick = document.getElementById('dropzone-file')?.click()
}

const Upload_image = () => {
    let [isOpen, setIsOpen] = useState(false);

    
    return       <div>
    {/* Icon */}
    <div onClick={HandleUploadFile}>
      <ImageIcon  width={24} height={24} className=" text-blue-500 md:w-6 md:h-6 " />
    </div>
    <label htmlFor="dropzone-file">
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={(e) => {
          console.log('Selected file:', e.target.files[0]);
        }}
      />
    </label>
  </div>
};

export default Upload_image;
