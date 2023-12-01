import Image from "next/image"
import { HeartIcon } from "../icons/Icons"


const Comment = ({comment}) => {


  return (
      <div className="w-full flex gap-2 items-start mb-2">
              
              <Image
                className="rounded"
                src="/profile.png"
                height={40}
                width={40}
                alt="profile"
                quality={100}
            />
      <div className="w-full  flex flex-col gap-2 ">
          <div className="flex  flex-col gap-2 bg-neutral-100 p-2 rounded-md">
              <div className="flex gap-2 items-center">
                  <p className="text-semibold ">jone mayer</p>
                  <span className="text-gray-400 text-[12px]">24 August at 20:43</span>
              </div>
              <div>
                  <p>
                     {comment.content}
                  </p>
              </div>
          </div>
          <div className="flex items-center gap-2">        
          <HeartIcon width={16} height={16} className=" text-neutral-500 "  /> Like ,  6 Likes</div>
      </div>
  </div>
  );
}

export default Comment
