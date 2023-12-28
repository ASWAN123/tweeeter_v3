import React from "react";
import { SearchIcon } from "../compoenents/icons/Icons";

const SearchInput = () => {
    return (
        <div className=" bg-[#FFFFFF]  font-notoSans font-medium text-[16px] p-2 rounded-md h-[50px] mt-4 flex gap-2 shadow-md items-center ">
            <SearchIcon
                width={32}
                height={32}
                className="text-neutral-500 "
            />

            <input
                type="text"
                className="outline-none w-full text-[16px] placeholder:text-neutral-400 px-2 py-2 "
                placeholder="search"
            />
            <button className="bg-blue-500 px-6 py-2 text-white rounded-md  ml-auto font-notoSans text-[12px] font-medium">
                Search
            </button>
        </div>
    );
};


export default SearchInput;
