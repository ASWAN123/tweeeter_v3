
import Image from "next/image";

const User_card = ({image}) => {
  return (
<>
    <div className="flex items-center gap-2 ">
        <div className="relative w-[40px] h-[40px] ">
            <Image
                src="/profile.png"
                layout="fill"
                alt="Picture of the author"
                className="rounded-md shadow-sm "
            />
        </div>
        <div className="flex  flex-col ">
            <p className="font-semibold text-[14px]">
                Mikael Stanley
            </p>
            <span className=" text-neutral-300 ">
                230k followers
            </span>
        </div>
        <button className="flex items-center gap-1 bg-blue-500 w-fit rounded-md py-1 px-4 text-white ml-auto ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
            </svg>
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
                layout="fill"
            />
        </div>
    
        </>
  )
}

export default User_card
