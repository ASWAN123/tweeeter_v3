"use client" ;

const SkeletonCreate = () => {


    return (
        <>
            <div className=" bg-[#FFFFFF] p-4 rounded-md  flex  gap-2  shadow-md min-h-[200px] ">
                <div className="w-full h-40 skeleton bg-gray-100 rounded"></div>
            </div>
        </>
    );
};

export default SkeletonCreate;
