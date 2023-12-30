import Image from "next/image";
import React from "react";
import User_card from "./UserCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PepoleToFollow = () => {


    const getUserToFollow = async () => {
        const response = await axios.get('/api/peopletofollow')
        return response.data
    }

    const { data: usersToFollow , isLoading, isFetched  } = useQuery({
        queryKey: ['usersToFollow'],
        queryFn: async () => await getUserToFollow() ,
      } );






    return (
        <div className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md  mx-auto ">
            <h1 className=" font-semibold  font-poppins text-[12px] leading-[18px]  ">Who to follow</h1>
            <hr />
            <ul className=" space-y-4  mt-2">
                <li className="flex flex-col gap-4">
                    {
                        isFetched && usersToFollow.map(( user ,  index) => {
                            return  <>< User_card   key={index} user = {user} /><hr /></>
                        })
                    }
                    {/* < User_card  image = "/post_image3.jpg" /> */}
                </li>
                    
                
            </ul>
        </div>
    );
};

export default PepoleToFollow ;
