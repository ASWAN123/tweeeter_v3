


const Filter_card = () => {
    return (
        <div className=" bg-[#FFFFFF]  rounded-md  flex flex-col gap-2 shadow-md   col-span-1 mt-4">
            <ul className="  md:py-4 mt-2 font-semibold text-neutral-500 text-[14px] flex px-4 md:px-0 justify-between  md:block">
                <li className="pt-2 md:py-1   flex md:flex-row flex-col-reverse  justify-between md:justify-start items-center hover:cursor-pointer text-blue-500">
                    {" "}
                    <span className="bg-blue-500 w-12 h-1 md:h-12 md:w-1 md:mr-6 mt-4 md:mt-auto rounded-t-md  md:rounded-r-md"></span>
                    top
                </li>
                <li className="pt-2 md:py-1   flex md:flex-row flex-col-reverse  justify-between md:justify-start items-center hover:cursor-pointer text-blue-500 ">
                    {" "}
                    <span className="bg-blue-500 w-12 h-1 md:h-12 md:w-1 md:mr-6 mt-4 md:mt-auto rounded-t-md  md:rounded-r-md"></span>
                    Lastest
                </li>
                <li className="pt-2 md:py-1   flex md:flex-row flex-col-reverse  justify-between md:justify-start items-center hover:cursor-pointer text-blue-500 ">
                    {" "}
                    <span className="bg-blue-500 w-12 h-1 md:h-12 md:w-1 md:mr-6 mt-4 md:mt-auto rounded-t-md  md:rounded-r-md"></span>
                    People
                </li>
                <li className="pt-2 md:py-1   flex md:flex-row flex-col-reverse  justify-between md:justify-start items-center hover:cursor-pointer text-blue-500 ">
                    {" "}
                    <span className=" bg-blue-500 w-12 h-1 md:h-12 md:w-1 md:mr-6 mt-4 md:mt-auto  rounded-t-md md:rounded-r-md"></span>
                    Media
                </li>
            </ul>
        </div>
    );
};

export default Filter_card;
