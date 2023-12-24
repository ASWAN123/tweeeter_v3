import axios from "axios";

import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

//  you gonna  mentio  one  thing here is that  home post  only  with folowing  relation
const getHomePosts = async () => {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUser = async (id: string | undefined) => {
  try {
    const url =
      "http://localhost:3000/api/user/profile" + (id ? `?id=${id}` : "");
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getSavedPosts = async () => {
  try {
    const response = await axios.get("/api/user/bookmarks");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getExplorePosts = async () => {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getPostDetails = async (id: any) => {
  const params = {
    id: id,
  };
  const queryString = new URLSearchParams(params).toString();
  const requestURL = `/api/post?${queryString}`;
  const response = await axios.get(requestURL);

  return response.data;
};

const getHashTags = async () => {
  try {
    const response = await axios.get("/api/hashtags");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getUserPosts = async () => {
  try {
    const response = await axios.get("/api/user/posts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const homePosts = "homePosts";
const homePostsConfig = { queryKey: [homePosts], queryFn: getHomePosts };

const savedPosts = "bookmarksPosts";
const savedPostsConfig = { queryKey: [savedPosts], queryFn: getSavedPosts };

const explorePosts = "explorePosts";
const explorePostsConfig = {
  queryKey: [explorePosts],
  queryFn: getExplorePosts,
};

const userDetailsKey = "userDetails";
const userDetailsConfig = (id: string | undefined) => ({
  queryKey: [userDetailsKey, id],
  queryFn: async () => await getUser(id),
});

const postDetails = "postDetails";
const postDetailsConfig = (id: any) => {
  return {
    queryKey: [postDetails, `${id}`],
    queryFn: () => getPostDetails(id),
  };
};

const hashTags = "hashTags";
const hashTagsConfig = { queryKey: [hashTags], queryFn: getHashTags };

const userPosts = "userPosts";
const userPostsConfig = { queryKey: [userPosts], queryFn: getUserPosts };

export {
  userDetailsConfig,
  savedPostsConfig,
  homePostsConfig,
  explorePostsConfig,
  postDetailsConfig,
  hashTagsConfig,
  userPostsConfig,
};