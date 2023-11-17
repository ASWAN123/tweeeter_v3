import Image from "next/image";
import React from "react";
import User_card from "./User_card";

const To_follow = () => {
    return (
        <div className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md  mx-auto ">
            <h1 className="font-semibold  ">Who to follow</h1>
            <hr />
            <ul className=" space-y-4  mt-2">
                <li className="flex flex-col gap-4">
                    < User_card  image = "/post_image3.jpg" />
                    <hr />
                    < User_card image = "/post_image4.jpg" />
                </li>
                <hr />
            </ul>
        </div>
    );
};

export default To_follow;
