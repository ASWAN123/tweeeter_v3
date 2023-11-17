const Filter_card = () => {
    return (
        <div className=" bg-[#FFFFFF]  rounded-md  flex flex-col gap-2 shadow-md  mx-auto ">
            <ul className="  py-4 mt-2 font-semibold text-neutral-500 text-[14px] ">
                <li className="py-1  flex items-center hover:cursor-pointer text-blue-500">
                    {" "}
                    <span className="bg-blue-500 h-12 w-1 mr-6 rounded-r-md"></span>
                    top
                </li>
                <li className="py-1  flex items-center hover:cursor-pointer ">
                    {" "}
                    <span className="h-12 w-1 mr-6 rounded-r-md"></span>
                    Lastest
                </li>
                <li className="py-1  flex items-center hover:cursor-pointer ">
                    {" "}
                    <span className="h-12 w-1 mr-6 rounded-r-md"></span>
                    People
                </li>
                <li className="py-1  flex items-center  hover:cursor-pointer ">
                    {" "}
                    <span className=" h-12 w-1 mr-6 rounded-r-md"></span>
                    Media
                </li>
            </ul>
        </div>
    );
};

export default Filter_card;
