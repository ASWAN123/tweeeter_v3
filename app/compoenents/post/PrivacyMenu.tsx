"use client";
import React from "react";
import { Menu } from "@headlessui/react";
import { BiImageAlt, BiWorld } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { WorldIcon } from "../icons/Icons";

const PrivacyMenu = ({ isPublic, setIsPublic }) => {
    return (
        <>
            <Menu as="div" className="relative mr-auto">
                <Menu.Button className="flex items-center gap-2 text-blue-500">
                    <WorldIcon
                        width={24}
                        height={24}
                        className=" text-blue-500 "
                    />
                    Everyone can reply
                </Menu.Button>
                <Menu.Items className="flex flex-col gap-2 absolute z-30 bg-white p-4  rounded-md  -ml-8 w-[280px] md:w-[300px] top-[60px] shadow-lg  border ">
                    <Menu.Item disabled>
                        <div className="flex flex-col gap-1 mb-2">
                            <p className="font-semibold">Who can reply?</p>
                            <span className="opacity-75">
                                Choose who can reply to this Tweet.
                            </span>
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            onClick={() => {
                                setIsPublic(true);
                            }}

                            className={` " rounded-md ${
                                isPublic ? "  bg-gray-300 " : "   hover:bg-gray-200 "
                            } flex  items-center gap-2   px-2  py-2`}
                        >
                            <BiWorld size={26} color="black" /> Everyone
                        </button>
                    </Menu.Item>
                    <Menu.Item>
                        <button
                            onClick={() => {
                                setIsPublic(false);
                            }}
                            className={` " rounded-md ${
                                isPublic ? " hover:bg-gray-200 " : " bg-gray-300 "
                            } flex  items-center gap-2   px-2  py-2`}
                        >
                            <BsFillPeopleFill size={26} color="black" /> People
                            you follow
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </>
    );
};

export default PrivacyMenu ;
