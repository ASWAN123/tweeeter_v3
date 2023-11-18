import React from "react";
import Filter_card from "../compoenents/Filter_card";
import Post from "../compoenents/post/Post";

const page = () => {
    const options = [ 'Tweets' , 'Tweets & replies' , 'Media' , 'Likes' ] 


    return (
        <main className=" w-[95%]  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
            <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  ">
                <Filter_card options={options} defaultvalue="Tweets" />
            </section>
            <section className="w-full md:w-[70%]  ">

                <div className="flex flex-col gap-4 mt-4">
                    <Post image="/post_image.jpg" />
                    <Post image="/post_image1.jpg" />
                    <Post image="/post_image2.jpg" />
                </div>
            </section>
        </main>
    );
};

export default page;
