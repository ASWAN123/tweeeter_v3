import axios from "axios";

import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

//  fetch  function

const fetchPosts = async () => {
    const response = await axios.get("/api/posts");
    return response.data;
};

const postQueryKey = "posts";
const getPosts = async (context: QueryFunctionContext) => {
    const { queryKey } = context;
    return fetchPosts();
};

const postsQueryConfig = { queryKey: postQueryKey, queryFn: getPosts };

const userDetailsKey = "userDetails";
const getUser = async () => {
    try {
        const response = await axios.get("/api/user/profile");
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const userDetailsConfig = { queryKey: userDetailsKey, queryFn: getUser };

export { postsQueryConfig, userDetailsConfig };
