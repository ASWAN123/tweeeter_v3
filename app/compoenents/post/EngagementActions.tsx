'use client'

import { CommentIcon, HeartIcon, RetweetIcon, SaveIcon } from "../icons/Icons";

import classNames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";


/// you need  big  update  make  sure  to return  only  important  data  from the  api no need  to  return  all saves  stuff 


const EngagementActions = ({ post }) => {
    
    let postId = post.id  // this  is  the  post  id  
    let loggedInUser = post.author.id // user that  is  logged in to get information
    const alreadyliked = post.likes.find( (x) => x.postId  == postId  && x.userId == loggedInUser  ) ;
    let likeID = alreadyliked?.id ;



    
    let alreadyCommented = post.comments.find( (x) => x.userId == loggedInUser  ) 
    const alreadySaved = post.saves.find( (x) => x.userId == loggedInUser  ) ;
    const alreadyRetweeted = post.Retweets.find( x => x.userId == loggedInUser )
    let saveID = alreadySaved?.id



    
    
    const queryClient = useQueryClient();

    const handleToggleLike = async() => {

        if (alreadyliked) {

            const resposne  = await axios.post('/api/userIntraction/unlike' ,  {
                likeID 
            })
            // console.log(resposne.data)
            queryClient.invalidateQueries({ queryKey: ['post' , postId ] });
            return 

        }else{
                        
            const resposne  = await axios.post('/api/userIntraction/like' ,  {
                postId
            })
            // console.log(resposne.data)
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


    const handleToggleRetweet = async() => {
        
        const resposne  = await axios.post('/api/userIntraction/retweet' ,  {
            postId
        })
        console.log(resposne.data)
        queryClient.invalidateQueries({ queryKey: ['post' , postId ] });
        return 
        // if (alreadyRetweeted) {


        // }else{
                        
        //     const resposne  = await axios.post('/api/userIntraction/save' ,  {
        //         postId
        //     })
        //     console.log(resposne.data)
        //     queryClient.invalidateQueries({ queryKey: ['post' , postId ] });
        //     return  

        // }

        
    };










    const LikeClass = classNames({
        "flex gap-2  items-center  px-2 md:px-6 md:py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-red-500": alreadyliked ? true : false,
        "text-neutral-500": alreadyliked ? false : true,
    });

    const CommentClass = classNames({
        "flex gap-2  items-center  px-2 md:px-6 py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-gray-900": alreadyCommented ? true : false,
        "text-neutral-500": alreadyCommented ? false : true,
    });


    const SaveClass = classNames({
        "flex gap-2  items-center  px-2 md:px-6 py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-blue-500": alreadySaved ? true : false,
        "text-neutral-500": alreadySaved ? false : true,
    });

    const RetweetClass = classNames({
        "flex gap-2  items-center  px-2 md:px-6 py-2 flex-1  justify-center hover:bg-neutral-100 rounded-md  md:text-[14px]":
            true,
        "text-green-300": alreadyRetweeted ? true : false,
        "text-neutral-500": alreadyRetweeted ? false : true,
    });

    return (
        <div className="flex justify-between  md:gap-6">
            <button className={CommentClass}>
                <CommentIcon
                    width={16}
                    height={16}
                    className=" md:w-[20px] md:h-[20px]"
                />
                Comment
            </button>
            <button onClick={handleToggleRetweet} className={RetweetClass}>
                <RetweetIcon
                    width={16}
                    height={16}
                    className="  md:w-[20px] md:h-[20px]"
                />
            { alreadyRetweeted ? "Retweeted" : "Retweet"}
            </button>
            <button onClick={ handleToggleLike} className={LikeClass}>
                <HeartIcon width={16} height={16} className=" md:w-[20px] md:h-[20px] " />
                { alreadyliked ? "Liked" : "Like"}
            </button>
            <button onClick={handleToggleSave} className={SaveClass}>
                <SaveIcon
                    width={16}
                    height={16}
                    className="  md:w-[20px] md:h-[20px]"
                />
               { alreadySaved ? "Saved" : "Save"}
            </button>
        </div>
    );
};

export default EngagementActions;
