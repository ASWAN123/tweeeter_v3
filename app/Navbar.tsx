"use client";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineBookmark } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import DropDownMenu from "./compoenents/DropDownMenu";
import { useQuery } from "@tanstack/react-query";
import { userDetailsConfig } from "./queryConfig";



const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    const pages = [
        { path: "/", name: "Home" },
        { path: "/explore", name: "Explore" },
        { path: "/bookmarks", name: "Bookmarks" },
    ];

    const {  data: userDetails,isPending: isUserPending,error: isUserError,isFetching: isUserFetching, } = useQuery(userDetailsConfig())

    return (
        <nav>
            <header className="h-[60px] w-full shadow-sm flex items-center px-2 md:px-20 justify-between bg-[#FFFFFF] ">
                <a
                    href="/"
                    className="flex items-center gap-2 font-semibold md:text-black text-transparent "
                >
                    <AiFillCodeSandboxCircle size={24} color="blue" /> Tweeter
                </a>
                {/* list  for desktop version */}

                <ul className="hidden md:flex items-center min-h-full w-[300px] gap-4 ">
                    {pages.map((elem, index) => {
                        return (
                            <li
                                key={index}
                                className="h-[60px]  flex flex-col w-full  items-center justify-center  gap-4  "
                            >
                                <Link
                                    className="pt-4  hover:cursor-pointer font-medium text-[14px] text-neutral-500  "
                                    href={elem.path}
                                >
                                    {elem.name}
                                </Link>
                                <span
                                    className={`-mb-[5px] w-full h-1 rounded-t-md ${
                                        elem.path === pathname
                                            ? "bg-blue-500"
                                            : "bg-transparent"
                                    }`}
                                ></span>
                            </li>
                        );
                    })}
                </ul>

                {!session && (
                    <div className="font-medium  flex items-center  space-x-6  ">
                        <Link className="hover:text-blue-500 " href="/login">
                            Login
                        </Link>
                        <Link className="hover:text-blue-500 " href="/register">
                            Join us!
                        </Link>
                    </div>
                )}

                {session && (
                    <DropDownMenu user = {userDetails} />
                )}
            </header>
            {/* list for mobile  version */}
            <ul className="flex md:hidden justify-between items-center px-8 h-[60px] w-full space-x-6 fixed bottom-0 bg-[#FFFFFF]  z-[1000] shadow-md border-t-1 ">
                <li className=" p-4 font-medium hover:cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition  duration-300  ">
                    <Link href="/">
                        <GoHomeFill size={30} color="gray" />
                    </Link>
                </li>
                <li className=" p-4 font-medium hover:cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition  duration-300  ">
                    <Link href="/explore" className="">
                        <MdOutlineExplore size={30} color="blue" />
                    </Link>
                </li>
                <li className=" p-4 font-medium hover:cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition  duration-300  ">
                    <Link href="/bookmarks">
                        <MdOutlineBookmark
                            size={30}
                            color="gray"
                            className=""
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
