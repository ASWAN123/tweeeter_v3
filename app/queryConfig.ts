import axios from "axios";

import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

//  you gonna  mentio  one  thing here is that  home post  only  with folowing  relation
const getHomePosts = async () => {
        try {
            const response = await axios.get("/api/posts");
            return response.data
        } catch (error) {
            console.error(error);
        }
};


const getUser = async () => {
    try {
        const response = await axios.get("/api/user/profile");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


const getSavedPosts = async () => {
    try {
        const response = await axios.get("/api/user/bookmarks");
        return response.data ;
    } catch (error) {
        console.error(error);
    }
};


const getExplorePosts = async () => {
    try {
        const response = await axios.get("/api/posts");
        return response.data ;
    } catch (error) {
        console.error(error);
    }
};



// const getStrangerPosts = (id) => async (key) => {
//     try {
//         const response = await axios.get("/api/posts");
//         return response.data ;
//     } catch (error) {
//         console.error(error);
//     }
// };







const homePosts = "homePosts" ;
const homePostsConfig = { queryKey: [homePosts], queryFn: getHomePosts } ; 

const savedPosts = "bookmarksPosts" ;
const savedPostsConfig = { queryKey: [savedPosts], queryFn: getSavedPosts } ; 

const explorePosts = "explorePosts" ;
const explorePostsConfig = { queryKey: [explorePosts], queryFn: getExplorePosts } ; 

const userDetailsKey = "userDetails" ;
const userDetailsConfig = { queryKey: [userDetailsKey], queryFn: getUser } ;

// const StrangerUserDetails = "StrangerUserDetails" ;
// const StrangeruserDetailsConfig = ( id:any ) => ({
//     queryKey: [StrangerUserDetails, id ] ,
//     queryFn: getStrangerPosts,
//   });

const getPostDetails = async( id ) => {
    const params = {
        id: id ,
    };
    const queryString = new URLSearchParams(params).toString() ;
    const requestURL = `/api/post?${queryString}` ;
    const response  = await axios.get(  requestURL ) ;
    console.log(response.data ,  'post details')
    return response.data


};



const postDetails = "postDetails" ;
const postDetailsConfig = ( id:any ) => {
    console.log(id ,  'id form config')
    return {
        queryKey: [ postDetails ,  `${id}`  ] ,
        queryFn: () => getPostDetails(id) ,
    }
}    

export { userDetailsConfig, savedPostsConfig  , homePostsConfig , explorePostsConfig , postDetailsConfig  };
