"use client";
import Post from '../compoenents/post/Post'
import FilterCard from '../compoenents/FilterCard'
import SearchInput from './SearchInput'
import { useQuery } from '@tanstack/react-query'
import SkeletonPost from '../compoenents/skeletons/skeletonPost'
import { explorePostsConfig } from '../queryConfig'


const Page = () => {
  const options = ['Top' , 'Lastest' , 'People' , 'Media']
  const {data: explorePosts ,isFetched,isFetching,error, } = useQuery(explorePostsConfig);




  return (
    <main className=" w-[95%]  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
    <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  " >
        <FilterCard  options = {options} defaultvalue="Top" />


    </section>
    <section className="w-full md:w-[70%]  ">
        <SearchInput />
        
        {/* <div className="flex flex-col gap-4 mt-4" >
        <p>No posts yet ...</p>

        </div> */}
        <div className="flex flex-col gap-4 mt-4">
                    {isFetching && (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    )}

                    {isFetched &&
                        explorePosts?.map((post, index) => {
                            return <Post key={index} postid={post.id} />;
                        })}
                </div>
    </section>

</main>
  )
}

export default Page;
