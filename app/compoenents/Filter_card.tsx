"use client";
import { useState } from "react";

const Filter_card = ({ options , defaultvalue }) => {

    const [selectOption, setSelectOption] = useState(defaultvalue);

    return (
        <div className=" bg-[#FFFFFF]  rounded-md  flex flex-col gap-2 shadow-md   col-span-1 mt-4">
            <ul className="  py-4 mt-2 font-semibold text-neutral-500 text-[14px] px-0  ">
                {options.map((option, index) => {
                    return (
                        <li
                            key={index}
                            className={` py-1 items-center   flex flex-row     hover:cursor-pointer ${ selectOption === option ? "text-blue-500" : " text-neutral-500" }`}
                        >
                            
                            <span className={`${ selectOption === option ? "bg-blue-500" : " bg-transparent " } h-12 w-1 mr-6 rounded-r-md`}></span>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Filter_card;
