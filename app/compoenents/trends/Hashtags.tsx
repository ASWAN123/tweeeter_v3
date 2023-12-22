import React from "react";

const Hashtags = ({hashTags}) => {

    return (
        <div
            className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md  mx-auto " >
            <h1 className="font-semibold  ">Trends for you</h1>
            <hr />
            <ul className=" space-y-4  mt-2">
                {
                    hashTags.map((elem  ,  index ) => {
                        return                  <li key={index} className="flex flex-col gap-2" >
                        <p className="text-[16px] font-semibold ">{elem.name}</p>
                        <span className=" text-neutral-400 "> 100k tweets</span>
                    </li>
                    })
                }

            </ul>
        </div>
    );
};

export default Hashtags;
