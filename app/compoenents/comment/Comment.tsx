import Image from "next/image";
import { HeartIcon } from "../icons/Icons";

const Comment = ({ comment }) => {
    // create  like  function  for  a  comment

    return (
        <div className="w-full flex gap-2 items-start mb-2">
            <Image
                className="rounded"
                src={comment.User.media_url ?? "/profile.png"}
                height={40}
                width={40}
                alt="profile"
                quality={100}
            />
            <div className="w-full  flex flex-col gap-2 ">
                <div className="flex  flex-col gap-2 bg-neutral-100 p-2 rounded-md">
                    <div className="flex gap-2 items-center">
                        <p className="text-semibold ">{comment.User.name}</p>
                        <span className="text-gray-400 text-[12px]">
                            {new Date(comment.created_at).toLocaleString(
                                "en-GB",
                                {
                                    day: "numeric",
                                    month: "long",
                                    hour: "numeric",
                                    minute: "numeric",
                                }
                            )}
                        </span>
                    </div>
                    <div>
                        <p>{comment.content}</p>
                        { comment.media_url  &&
                        <Image
                        className="rounded"
                        src={comment.media_url}
                        height={150}
                        width={250}
                        alt="profile"
                        quality={100}
                    />
                        }

                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <HeartIcon
                        width={16}
                        height={16}
                        className=" text-neutral-500 "
                    />{" "}
                    Like , 6 Likes
                </div>
            </div>
        </div>
    );
};

export default Comment;
