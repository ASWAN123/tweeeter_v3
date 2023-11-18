import Image from "next/image"


const Comment = () => {
  return (
    <div className="w-full flex gap-2 items-start">
            
    <Image
        className="rounded row-span-2"
        src="/profile.png"
        height={40}
        width={40}
        alt="cover author"
    />
    <div className="w-full  flex flex-col gap-2 h-[100px] ">
        <div className="flex  flex-col gap-2 bg-neutral-100 p-2 rounded-md">
            <div className="flex gap-2 items-center">
                <p className="text-semibold ">jone mayer</p>
                <span className="text-gray-400 text-[12px]">24 August at 20:43</span>
            </div>
            <div>
                <p>
                    I’ve seen awe-inspiring things that I thought I’d never
                    be able to explain to another person.
                </p>
            </div>
        </div>
        <div className="flex items-center gap-2">        <svg
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
        </svg>Like ,  6 Likes</div>
    </div>
</div>
  )
}

export default Comment
