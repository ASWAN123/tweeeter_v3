
import Image from "next/image";
import { FriendIcon } from "../icons/Icons";

const User_card = ({image}) => {
  return <>
      <div className="flex items-center gap-2 ">
      <Image
                className="rounded"
                src="/profile.png"
                height={40}
                width={40}
                alt="cover author"
            />
          <div className="flex  flex-col ">
              <p className="font-semibold text-[14px]">
                  Mikael Stanley
              </p>
              <span className=" text-neutral-300 ">
                  230k followers
              </span>
          </div>
          <button className="flex items-center gap-1 bg-blue-500 w-fit rounded-sm py-1 px-4 text-white ml-auto ">
  < FriendIcon  width={16} height={16} className=" text-white " />
              Follow
          </button>
          </div>
          <p className="col-span-3">
              Photographer & Filmmaker based in Copenhagen,
              Denmark ✵ 🇩🇰
          </p>
          <div className="w-full h-[200px] md:h-[150px] relative col-span-3">
              <Image
                  src={image}
                  alt="Picture of the author"
                  className="rounded-md shadow-sm  -z-0"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
          </div>
      
          </>;
}

export default User_card
