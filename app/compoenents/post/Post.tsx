import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { AiOutlineRetweet } from "react-icons/ai";

const Post = ({ image }) => {
    return (
        <div className="bg-[#ffffff] flex flex-col gap-3 p-4 shadow-md rounded-md  last:mb-8 ">
            <div className="flex items-center gap-4 ">
                <div className="relative w-[40px] h-[40px] ">
                    <Image
                        src="/profile.png"
                        layout="fill"
                        alt="Picture of the author"
                        className="rounded-md shadow-sm "
                    />
                </div>
                <div className="flex  flex-col gap-1">
                    <p className="font-semibold text-[16px]">Mikael Stanley</p>
                    <span className=" text-neutral-300 ">
                        24 August at 20:43
                    </span>
                </div>
            </div>
            <p className="text-[16px] md:text-[12px]">
                Traveling – it leaves you speechless, then turns you into a
                storyteller.
            </p>
            <div className="w-full h-[200px] md:h-[400px] relative">
                <Image
                    src={image}
                    alt="Picture of the author"
                    className="rounded-md shadow-sm  -z-0"
                    layout="fill"
                />
            </div>

            {/* stat information */}
            <div className="flex justify-end  space-x-3  text-neutral-400 -mb-2 md:mb-auto md:-mt-1 ">
                <span>449 Comments</span>
                <span>59k Retweets</span>
                <span>234 Saved</span>
            </div>

            {/* comment  engagement  and  comments */}
            <div className="flex flex-col gap-1">
                <hr />
                <div className="flex justify-between ">
                    <button className="flex gap-2 items-center px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md text-[14px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-gray-500 w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                            />
                        </svg>
                        Comment
                    </button>
                    <button className="flex gap-2 items-center px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md text-[14px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                        Retweet
                    </button>
                    <button className="flex gap-2 items-center px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md text-[14px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-gray-500 w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                        Like
                    </button>
                    <button className="flex gap-2 items-center px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md text-[14px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="text-gray-500 w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                            />
                        </svg>
                        Save
                    </button>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Post;
