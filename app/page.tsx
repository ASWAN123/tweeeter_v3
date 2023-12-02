"use client";
import Create_new_post from "./compoenents/post/PostForm";
import Post from "./compoenents/post/Post";
import Hashtags from "./compoenents/trends/Hashtags";
import PepoleToFollow from "./compoenents/trends/PepoleToFollow";
import { useQuery, useQueryClient} from "@tanstack/react-query"
import axios from "axios";
import SkeletonPost from "./compoenents/skeletons/skeletonPost";


export default function Home() {
    const queryClient = useQueryClient();


    const getUserPosts  = async () =>{ 
        try {
            const response = await axios.get("/api/user/posts");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const {
        data: posts,
        isPending,
        error,
        isLoading ,
        isFetching
    } = useQuery({
        queryKey: ["posts"] ,
        queryFn: getUserPosts ,
    });

    console.log( 'posts' ,  posts )

    return (
        <main className=" w-[95%]  md:w-[80%] mx-auto mt-8 flex gap-4 ">

            <section className="w-full md:w-[70%] h-[50px] ">
                {/* <div>{session?.user?.email}</div> */}
                <Create_new_post queryClient ={ queryClient }  />
                {/* posts */}
                <div className="flex flex-col gap-4 mt-8" >
                    {
                       isFetching   &&   <SkeletonPost  />
                    }

                    {
                        !isPending && posts?.map(( post ,  index) => {
                            return <Post key={index}  post = {post} />
                        })
                    }
                </div>
            </section>
            <section className=" min-w-[30%] max-w-[30%]  hidden md:block space-y-4 " >
                
                <Hashtags />
                <PepoleToFollow />
                

            </section>

        </main>
    );
}
