"use client";
import Post from '../compoenents/post/Post'
import FilterCard from '../compoenents/FilterCard'
import SearchInput from './SearchInput'
import { useQuery } from '@tanstack/react-query'
import SkeletonPost from '../compoenents/skeletons/skeletonPost'
import { explorePostsConfig } from '../queryConfig'
import { useState } from 'react';


const Page = () => {
  const options = ['Top' , 'Lastest' , 'People' , 'Media']
  const [filter , setFilter ] = useState( "Top" )
  const {data: explorePosts ,isFetched,isFetching,error, } = useQuery(explorePostsConfig);



  let AllPosts;

  switch (filter) {
      case 'Media':
          AllPosts = explorePosts?.filter((x:any) => x.media_url != null );
          break ;
      case 'Lastest':
        // latest is the  default  params  for  api
          AllPosts = explorePosts ;
          break;
      case 'People':
        // people  i only have  posts  for  people no group invoves in social  media app
          AllPosts = explorePosts ;
          break;
      default:
        // && b.likes - a.likes && b.saves - a.saves
          AllPosts = explorePosts?.sort((a, b) => b.comments - a.comments );
          console.log(AllPosts)
          break;
  }
  



  return (
    <main className=" w-[95%]  md:w-[80%] mx-auto mt-4 flex gap-4 flex-col md:flex-row ">
    <section className="w-full md:min-w-[30%] md:max-w-[30%]   md:block  " >

        <FilterCard  options = {options} filter={filter} setFilter={setFilter} />


    </section>
    <section className="w-full md:w-[70%]  ">
        <SearchInput />
        



        <div className="flex flex-col gap-4 mt-4">
                    {isFetching && (
                        <>
                            <SkeletonPost />
                            <SkeletonPost />
                            <SkeletonPost />
                        </>
                    )}

                    {isFetched &&
                        AllPosts?.map((post, index) => {
                            return <Post key={index} postid={post.id} />;
                        })}

                    {
                        !explorePosts == true && <div>
                            failed to fetch  data no post  found ,  please  refresh  the  page
                        </div>
                    }
                </div>
    </section>

</main>
  )
}

export default Page;
