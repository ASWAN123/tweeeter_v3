import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineBookmark } from "react-icons/md";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <header className="h-[60px] shadow-sm flex items-center px-2 md:px-20 justify-between bg-[#FFFFFF]    ">
                <a href="/" className="flex items-center gap-2 font-semibold md:text-black text-transparent ">
                    <AiFillCodeSandboxCircle size={24} color="blue" /> Tweeter
                </a>
                {/* list  for desktop version */}
                <ul className="hidden md:flex items-center min-h-full  space-x-10  ">
                    <li className=" text-neutral-500 text-[14px] p-5 font-medium hover:cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition  duration-300  ">
                        <Link href="/">Home</Link>
                    </li>
                    <li className=" text-neutral-500 text-[14px] p-5 font-medium hover:cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition  duration-300  ">
                        <Link href="/explore" >Explore</Link>
                    </li>
                    <li className=" text-neutral-500 text-[14px] p-5 font-medium hover:cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition  duration-300  ">
                        <Link href="/">Bookmarks</Link>
                    </li>
                </ul>

                <div className="font-medium  flex items-center  space-x-6  ">
                    <Link href="/login">Login</Link>
                    <Link href="/register" className="">
                        Join us!
                    </Link>
                </div>
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
                        <MdOutlineExplore size={30} color="blue"  />
                    </Link>
                </li>
                <li className=" p-4 font-medium hover:cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition  duration-300  ">
                    <Link href="/">
                        <MdOutlineBookmark size={30} color="gray" className="" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
