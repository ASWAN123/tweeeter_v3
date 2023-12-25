"use client";
import { useState } from "react";

const FilterCard = ({ options   , filter ,  setFilter }) => {


    




    return (
        <div className=" bg-[#FFFFFF]  rounded-md  flex flex-col gap-2 shadow-md   col-span-1 mt-4">
            <ul className="  py-4 mt-2 font-semibold text-neutral-500 text-[14px] px-0  ">
                {options.map((option, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => {setFilter(option)}}
                            className={` py-1 items-center   flex flex-row     hover:cursor-pointer ${ filter === option ? "text-blue-500" : " text-neutral-500" }`}
                        >
                            
                            <span className={`${ filter === option ? "bg-blue-500" : " bg-transparent " } h-12 w-1 mr-6 rounded-r-md`}></span>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FilterCard;
