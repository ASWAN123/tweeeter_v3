import Image from "next/image";
import Filter_card from "../compoenents/Filter_card";
import Post from "../compoenents/post/Post";
import Profile_user_card from "./Profile_user_card";
import { AiTwotoneEdit } from "react-icons/ai"

const page = () => {
    const options = ['Tweets' , 'Tweets & replies' , 'Media' , 'Likes' ]
    return (
        <main className=" w-full  mx-auto  ">
            <div className="relative min-w-full h-[250px]  bg-gradient-to-r from-blue-300 to-pink-400 block ">
                {/* add some shit to make the user uplaod his cover  */}
                <AiTwotoneEdit size={26} color="white"  />
            </div>
            <div className="w-[95%]  md:w-[80%] mx-auto mt-4 flex flex-col md:grid md:grid-cols-3    md:items-start gap-4 relative">
                <Profile_user_card />
                <Filter_card  options={options} defaultvalue="Tweets"/>
                <div className="flex flex-col gap-4 mt-4 col-span-2 ">
                    <Post image="/post_image.jpg" />
                    <Post image="/post_image1.jpg" />
                    <Post image="/post_image2.jpg" />
                </div>
            </div>
        </main>
    );
};

export default page ;