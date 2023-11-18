import Image from "next/image"


const Create_new_comment = () => {
  return (
    <div className="flex items-center w-full  min-h-[50px] max-h-[50px] gap-2  ">
    <Image
        className="rounded"
        src="/profile.png"
        height={40}
        width={40}
        alt="cover author"
    />
    <div className="flex w-full flex-col text-[14px]">
                  <input
    type="email"
    id="email"

    className=" bg-neutral-100 border outline-none  text-gray-900 text-sm rounded-md w-full p-2.5 "
    placeholder="tweet your reply"
    
  />
    </div>
</div>
  )
}

export default Create_new_comment
