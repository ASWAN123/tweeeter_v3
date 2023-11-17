import React from "react";

const Search_input = () => {
    return (
        <div className=" bg-[#FFFFFF] p-2 rounded-md h-[50px] flex gap-2 shadow-md items-center ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-neutral-400 "
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
            </svg>

            <input
                type="text"
                className="outline-none w-full text-[16px] placeholder:text-neutral-400 px-2 py-2 "
                placeholder="search"
            />
            <button className="bg-blue-500 px-6 py-2 text-white rounded-md  ml-auto">Search</button>
        </div>
    );
};

export default Search_input;
