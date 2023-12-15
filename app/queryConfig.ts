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





const homePosts = "homePosts" ;
const homePostsConfig = { queryKey: homePosts, queryFn: getHomePosts } ; 

const savedPosts = "bookmarksPosts" ;
const savedPostsConfig = { queryKey: savedPosts, queryFn: getSavedPosts } ; 

const explorePosts = "explorePosts" ;
const explorePostsConfig = { queryKey: explorePosts, queryFn: getExplorePosts } ; 

const userDetailsKey = "userDetails" ;
const userDetailsConfig = { queryKey: userDetailsKey, queryFn: getUser } ;

export { userDetailsConfig, savedPostsConfig  , homePostsConfig , explorePostsConfig };
