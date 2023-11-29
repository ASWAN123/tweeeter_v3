

const Skeleton_post = () => {
    return (
        <div className="bg-[#ffffff] flex flex-col gap-3 p-4 shadow-md rounded-md  last:mb-8 ">
            <div className="flex items-center gap-4 ">
                {/* profile image */}
                <div className=" rounded w-[40px] h-[40px] bg-gray-100 skeleton"></div>
                <div className="flex  flex-col gap-1">
                    {/* name  and  date */}
                    <div className="rounded h-4 bg-gray-100 w-24 skeleton"></div>
                    <div className=" w-24 h-4 rounded   bg-gray-100  skeleton "></div>
                </div>
            </div>
            {/*  description   */}
            <div className=" md:w-[200px] rounded  md:h-4 skeleton bg-gray-100 "></div>
            <div className=" md:w-[200px] rounded md:h-4 skeleton bg-gray-100 "></div>
            {/* image  of the  post */}
            <div className="w-full h-[200px] rounded md:h-[400px] skeleton bg-gray-100 "></div>

            {/* status information */}
            <div className="flex justify-end  space-x-3   -mb-2 md:mb-auto md:-mt-1 ">
                <span className=" w-20 h-4 bg-gray-100 skeleton "></span>
                <span className=" w-20 h-4 bg-gray-100 skeleton "></span>
                <span className=" w-20 h-4 bg-gray-100 skeleton "></span>
            </div>

            {/* comment  engagement  and  comments */}
            <div className="flex flex-col gap-2">
                <hr />
                <div className="flex justify-between ">
                    <button className=" w-24 h-6 bg-gray-100 skeleton  px-2 md:px-8 py-1  rounded  "></button>
                    <button className=" w-24 h-6 bg-gray-100 skeleton  px-2 md:px-8 py-1  rounded  "></button>{" "}
                    <button className=" w-24 h-6 bg-gray-100 skeleton  px-2 md:px-8 py-1  rounded  "></button>{" "}
                    <button className=" w-24 h-6 bg-gray-100 skeleton  px-2 md:px-8 py-1  rounded  "></button>
                </div>
            </div>
        </div>
    );
};

export default Skeleton_post;
