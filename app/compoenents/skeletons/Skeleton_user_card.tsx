const Skeleton_User_Card = () => {
    return (
        <div className=" min-h-[163px]  flex flex-col  md:flex-row items-center gap-4 md:items-start bg-white rounded-md w-full py-4 px-6  -mt-24 col-span-3 shadow-md ">
            <div className="min-w-[160px]  rounded-md p-2 bg-white min-h-[160px] md:min-w-[150px] md:min-h-[150px] w-[100px] h-[100px] relative  shadow-sm -z-0 -mt-32 md:-mt-20">
                {/* profile image  */}
                <div role="status" className=" skeleton w-full h-full bg-gray-100 rounded-md"></div>
            
            </div>
            <div className=" flex flex-col gap-2 md:flex-row md:gap-6 items-center w-[70%]  flex-wrap ">
                <div className="text-center w-fit text-[24px] font-semibold  ">
                    
                    {/* name */}
                    <div  role="status" className="skeleton  min-w-[150px] h-4 bg-gray-100 rounded-md"></div>
                
                </div>
                <div className="flex flex-row  items-center gap-6" >

                    {/* follower and  following */}
                    <div role="status" className="skeleton w-24 h-4 bg-gray-100 rounded-md"></div>
                    <div role="status" className="skeleton w-24 h-4 bg-gray-100 rounded-md"></div>
                
                </div>
                <div className=" w-full col-span-3 text-center text-[18px] md:text-start flex flex-col gap-1">
                    {/* user bio */}
                    <div role="status" className="skeleton w-[90%] h-4 bg-gray-100 rounded-md "></div>
                    <div role="status" className="skeleton w-[60%] h-4 bg-gray-100 rounded-md "></div>
                    <div role="status" className="skeleton w-[30%] h-4 bg-gray-100 rounded-md "></div>
                
                </div>
            </div>

            {/* follow  button */}
            <div role="status" className="skeleton w-24 h-8 bg-gray-100 rounded-md"></div>
        
        </div>
    );
};

export default Skeleton_User_Card;
