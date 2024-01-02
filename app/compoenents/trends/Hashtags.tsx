import React from "react";

const Hashtags = ({ hashTags }) => {
    return (
        <div className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md  mx-auto ">
            <h1 className="font-semibold  font-poppins text-[12px] leading-[18px] ">
                Trends for you
            </h1>
            <hr />
            <ul className=" space-y-4  mt-2">
                {hashTags.map((elem, index) => {
                    return (
                        <li key={elem.name} className="flex flex-col gap-2">
                            <p className="text-[16px] font-semibold font-notoSans text-[#333333] leading-[21px] ">
                                {elem.name}
                            </p>
                            <span className=" text-[#828282] font-notoSans font-normal  text-[12px]  ">
                                {" "}
                                {elem.count} tweets
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Hashtags;
