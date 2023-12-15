import Image from "next/image";
import EngagementActions from "./EngagementActions";
import CreateNewComment from "../comment/CommentForm";
import Comment from "../comment/Comment";
import SkeletonComment from "../skeletons/SkeletonComment";
import SkeletonPost from "../skeletons/skeletonPost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";





const Post =  ({ postid   }) => {

    const { data : post , isFetched , isLoading  , error  } = useQuery({
        queryKey : ['post' ,  postid ] ,
        queryFn : async () => {
            const params = {
                id: postid ,
            };
            const queryString = new URLSearchParams(params).toString();
            const requestURL = `/api/post?${queryString}`;
            const response  = await axios.get(  requestURL )
            return response.data
        }
    })


    if(isLoading ){
        return <SkeletonPost />
    }

    console.log(post.author.created_at)

    






    return (
        <div className="bg-[#ffffff] flex flex-col gap-3 p-4 shadow-md rounded-md  last:mb-8 ">
            <div className="flex items-center gap-4 ">
                <div className="relative w-[40px] h-[40px] ">
                <Image
                className="rounded"
                src={ post.author.media_url ?? "/profile.png" }
                height={40}
                width={40}
                alt="cover author"
            />
                        
                </div>
                <div className="flex  flex-col gap-1">
                    <p className="font-semibold text-[16px]">{post.author.name}</p>
                    <span className=" text-neutral-400 ">
                        {/* 24 August at 20:43 */}
                        {new Date(post.created_at).toLocaleString('en-GB' ,  { 'day': 'numeric' , 'month':'long'  ,  'hour':'numeric'  ,  'minute' : 'numeric'})}
                    </span>
                </div>
            </div>
            <p className="text-[16px] md:text-[12px]">
                {post.content}
            </p>
            { post.media_url && 
            <div className="w-full h-[200px] md:h-[500px] relative">
                <Image
                    src={post.media_url }
                    alt="Picture of the author"
                    className="rounded-md shadow-sm  -z-0 "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                     />
            </div>
            }

            {/* stat information note :  // export  this  into  a  component  later */}
            <div className="flex justify-end  space-x-3  text-neutral-400 -mb-2 md:mb-auto md:-mt-1 ">
                <span>{post.comments.length} Comments</span>
                <span>{post.Retweets.length} Retweets</span>
                <span>{post.saves.length} Saved</span>
            </div>

            {/* comment  engagement  and  comments */}
            <div className="flex flex-col gap-2">
                <hr />
                < EngagementActions post  = {post}   />
                <hr />
                <CreateNewComment  postId = {post.id}/>
                <div>
                    {/* < SkeletonComment /> */}
                    {
                        post.comments.map((comment  ,  index) => {
                            return  (
                                <Comment  comment={comment} key={index}  />
                            )
                        })
                    }
                    {
                        [...post.comments].length === 0 && <div className="w-full flex items-center justify-center my-4">
                            <p>No comments for this post</p>
                        </div>
                    }

                </div>
                
            </div>
        </div>
    );
};

export default Post;
