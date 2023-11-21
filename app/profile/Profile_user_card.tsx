import Image from 'next/image'


// starts  fixing  from this  point  where  the  image  in the  mobile  its  size  is not  good  enough

const Profile_user_card = () => {
  return (
    <div className="flex gap-4 items-start bg-white rounded-md w-full p-4 -mt-24 col-span-3 shadow-md" >
    <div className="md:w-[150px] md:h-[150px] w-[100px] h-[100px] relative" >
        <Image
            src="/profile.png"
            alt="Picture of the author"
            className="rounded-md   -z-0 -mt-20 border-4 border-dashed border-white"
            layout="fill"
        />
    </div>
    <div className="md:grid md:grid-cols-3 flex flex-col  md:justify-between md:items-center w-[70%]  flex-wrap ">
        <p className="text-[16px] font-semibold ">
            Abderrahim Assoune
        </p>
        <span className="text-[14px] font-semibold text-neutral-400">
            33k Following
        </span>
        <span className="text-[14px] font-semibold text-neutral-400">
            23 k follower
        </span>
        <p className="mt-12 w-full col-span-3  text-start">
            This is my bio i am offline write now and i don`t
            have anything to write exacpt this
        </p>
    </div>
    <button className="bg-blue-500 px-4 py-1 rounded-md ml-auto text-white text-[16px]">
        + Follow
    </button>
</div>
  )
}

export default Profile_user_card
