const Skeleton_User_Card = () => {
    return (
        <div className=" min-h-[163px]  flex flex-col  md:flex-row items-center gap-4 md:items-start bg-white rounded-md w-full p-4 -mt-24 col-span-3 shadow-md ">
            <div className="min-w-[160px] rounded-md bg-white min-h-[160px] md:min-w-[150px] md:min-h-[150px] w-[100px] h-[100px] relative  shadow-sm -z-0 -mt-32 md:-mt-20">
                <div role="status" className="  animate-pulse w-full h-full bg-gray-200 rounded-md"></div>
            </div>
            <div className=" flex flex-col gap-2 md:flex-row md:gap-6 items-center w-[70%]  flex-wrap ">
                <div className="text-center w-fit text-[24px] font-semibold  ">
                
                    <div  role="status" className="animate-pulse w-20 h-6 bg-gray-200 rounded-md"></div>
                
                </div>
                <div className="flex flex-row  items-center gap-6">
                
                    <div role="status" className="animate-pulse w-24 h-6 bg-gray-200 rounded-md"></div>
                    <div role="status" className="animate-pulse w-24 h-6 bg-gray-200 rounded-md"></div>
                
                </div>
                <div className=" w-full col-span-3 text-center text-[18px] md:text-start ">

                    <div role="status" className="animate-pulse w-full h-12 bg-gray-200 rounded-md "></div>
                
                </div>
            </div>

            <div role="status" className="animate-pulsew-24 h-10 bg-gray-200 rounded-md"></div>
        
        </div>
    );
};

export default Skeleton_User_Card;
