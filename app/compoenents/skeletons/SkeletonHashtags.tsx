import React from "react";

const SkeletonHashtags = () => {
    return (
        <div className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md  mx-auto ">
            <h1 className="font-semibold  ">Trends for you</h1>
            <hr />
            <ul className=" space-y-4  mt-2">
                <li className="flex flex-col gap-2">
                    <div className="rounded h-6 bg-gray-100  w-40 skeleton"></div>
                    <div className="rounded h-4 bg-gray-100 w-24 skeleton"></div>
                </li>
                <li className="flex flex-col gap-2">
                    <div className="rounded h-6 bg-gray-100 w-40 skeleton"></div>
                    <div className="rounded h-4 bg-gray-100 w-24 skeleton"></div>
                </li>
                <li className="flex flex-col gap-2">
                    <div className="rounded h-6 bg-gray-100 w-40 skeleton"></div>
                    <div className="rounded h-4 bg-gray-100 w-24 skeleton"></div>
                </li>
            </ul>
        </div>
    );
};

export default SkeletonHashtags;
