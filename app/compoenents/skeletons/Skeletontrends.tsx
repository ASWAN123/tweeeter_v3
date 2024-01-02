import React from 'react'

const Skeletontrends = () => {
  return (
    <>
    <div className="flex items-start gap-2 ">
        
            <>
                <div
                    className="rounded h-[50px] w-[50px] skeleton bg-gray-100"
                    
                    
                    
                ></div>
                <div className="flex flex-col gap-1 ">
                    
                    <p className="font-semibold text-[14px] skeleton bg-gray-100 h-6 w-[100px]">
                        {/* name */}
                    </p>
                    
                    <span className="text-neutral-300 skeleton bg-gray-100 h-6 w-[100px]">
                        {/* followers */}
                    </span>
                </div>
                <button  className="skeleton bg-gray-100 flex h-8 w-[80px] gap-1  px-2 rounded-sm py-1 text-white ml-auto ">
                    
                    {/* follow  button */}
                </button>{" "}
            </>
        
    </div>
    
        <p className="col-span-3  h-4 w-full skeleton bg-gray-100">
            
        </p>
    
    
        <div className="w-full h-[200px] md:h-[200px] relative col-span-3 skeleton bg-gray-100">
           
        </div>
    
</>
  )
}

export default Skeletontrends
