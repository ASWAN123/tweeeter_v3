"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { userPostsConfig } from "../queryConfig";
import { useQueryClient } from "@tanstack/react-query";

const FilterCard = ({ options   , filter ,  setFilter ,functionality  ,  userId = null }) => {
    const queryClient = useQueryClient();

    const HandlefilterToggle  = (filterType) => {
        setFilter(filterType)
        queryClient.invalidateQueries(functionality(userId  ,  filterType ));
    }


    




    return (
        <div className=" bg-[#FFFFFF]  font-poppins font-semibold rounded-md  flex flex-col gap-2 shadow-md   col-span-1 mt-4">
            <ul className="  py-4 mt-2 font-semibold text-neutral-500 text-[14px] px-0  ">
                {options.map((option, index) => {
                    return (
                        <li
                            key={option}
                            onClick={() => {HandlefilterToggle(option)}}
                            className={` py-1 items-center   flex flex-row     hover:cursor-pointer ${ filter === option ? "text-[#2F80ED] " : " text-neutral-500" }`}
                        >
                            
                            <span className={`${ filter === option ? "bg-[#2F80ED]" : " bg-transparent " } h-12 w-1 mr-6 rounded-r-md`}></span>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FilterCard;
