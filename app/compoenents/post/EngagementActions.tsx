'use client'

import { CommentIcon, HeartIcon, RetweetIcon, SaveIcon } from "../icons/Icons";

import classNames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";




const EngagementActions = ({ post }) => {
    
    let postId = post.id  // this  is  the  post  id  
    let loggedInUser = post.sub // user that  is  logged in to get information
    const alreadyliked = post.likes.find( (x) => x.postId  == postId  && x.userId == loggedInUser  ) ;
    let likeID = alreadyliked?.id;


    
    
    
    
    
    
    
    let alreadyCommented = post.comments.find( (x) => x.postId  == postId  && x.userId == loggedInUser  )
    
    
    const alreadySaved = post.saves.find( (x) => x.postId  == postId  && x.userId == loggedInUser  ) ;
    let saveID = alreadySaved?.id
    
    
    const queryClient = useQueryClient();

    const handleToggleLike = async() => {

        if (alreadyliked) {

            const resposne  = await axios.post('/api/userIntraction/unlike' ,  {
                likeID 
            })
            console.log(resposne.data)
            queryClient.invalidateQueries({ queryKey: ['post' , postId ] });
            return 

        }else{
                        
            const resposne  = await axios.post('/api/userIntraction/like' ,  {
                postId
            })
            console.log(resposne.data)
            queryClient.invalidateQueries({ queryKey: ['post' , postId ] });
            return  

        }

        
    };


    const handleToggleSave = async() => {

        if (alreadySaved) {

            const resposne  = await axios.post('/api/userIntraction/unsave' ,  {
                 saveID
            })
            console.log(resposne.data)
            queryClient.invalidateQueries({ queryKey: ['post' , postId ] });
            return 

        }else{
                        
            const resposne  = await axios.post('/api/userIntraction/save' ,  {
                postId
            })
            console.log(resposne.data)
            queryClient.invalidateQueries({ queryKey: ['post' , postId ] });
            return  

        }

        
    };






    const LikeClass = classNames({
        "flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-red-500": alreadyliked ? true : false,
        "text-neutral-500": alreadyliked ? false : true,
    });

    const CommentClass = classNames({
        "flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-gray-900": alreadyCommented ? true : false,
        "text-neutral-500": alreadyCommented ? false : true,
    });


    const SaveClass = classNames({
        "flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-blue-900": alreadySaved ? true : false,
        "text-neutral-500": alreadySaved ? false : true,
    });

    return (
        <div className="flex justify-between ">
            <button className={CommentClass}>
                <CommentIcon
                    width={16}
                    height={16}
                    className=" md:w-6 md:h-6"
                />
                Comment
            </button>
            <button className="flex gap-2 items-center px-2 md:px-8 py-1 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]">
                <RetweetIcon
                    width={16}
                    height={16}
                    className="  md:w-6 md:h-6"
                />
                Retweet
            </button>
            <button onClick={ handleToggleLike} className={LikeClass}>
                <HeartIcon width={16} height={16} className=" md:w-6 md:h-6 " />
                { alreadyliked ? "Liked" : "Like"}
            </button>
            <button onClick={handleToggleSave} className={SaveClass}>
                <SaveIcon
                    width={16}
                    height={16}
                    className="  md:w-6 md:h-6"
                />
               { alreadySaved ? "Saved" : "Save"}
            </button>
        </div>
    );
};

export default EngagementActions;
