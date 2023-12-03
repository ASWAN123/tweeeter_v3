"use client";
import React from "react";
import { Menu } from "@headlessui/react";
import { DropdownIcon, FriendIcon, LogoutIcon, ProfileIcon, SettingIcon } from "./icons/Icons";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";


const DropDownMenu = () => {
    return  (
        <Menu as="div" className="">
        <Menu.Button className="flex items-center gap-2 text-gray-500">
            <div className="relative flex gap-2 items-center ">
                <Image
                    className="rounded"
                    src="/profile.png"
                    height={35}
                    width={35}
                    alt="profile"
                    quality={100}
                />
                <p className="hidden md:block">Abderrahim Assou</p>
                <DropdownIcon
                    width={20}
                    height={20}
                    className="text-gray-400 hidden md:block " 
                />
            </div>
        </Menu.Button>
        <Menu.Items className="flex flex-col gap-2 absolute z-30 bg-white p-4  rounded-md  -ml-8 md:ml-2 w-[280px] md:w-[192px] top-[60px] shadow-lg  border ">
            <Menu.Item>
                <Link href="/profile" className="flex gap-2 items-center p-2 rounded hover:bg-gray-200">
                    <ProfileIcon width={24} height={24} className="text-gray-500" />
                    Profile
                </Link >
            </Menu.Item>
            <Menu.Item>
                < Link href="" className="flex gap-2 items-center p-2 rounded hover:bg-gray-200">
                    <FriendIcon width={24} height={24} className="text-gray-500" />
                    Group Chat
                </ Link >
            </Menu.Item>
            <Menu.Item>
                < Link href="/settings" className="flex gap-2 items-center p-2 rounded hover:bg-gray-200">
                    <SettingIcon width={24} height={24} className="text-gray-500" />
                    Setting
                </Link>
            </Menu.Item>
            <Menu.Item disabled>
                <hr />
            </Menu.Item>
            <Menu.Item>
            <button onClick={() => {signOut()}} className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 text-red-500">
                    <LogoutIcon width={24} height={24}  />
                    Logout
                </button>
            </Menu.Item>
        </Menu.Items>
    </Menu>
    )
};

export default DropDownMenu;
