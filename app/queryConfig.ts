import axios from "axios";


//  you gonna  mentio  one  thing here is that  home post  only  with folowing  relation
const getExplorePosts = async (pageParam, filter) => {
    try {
        const response = await axios.get(
            "/api/posts/explore?cursor=" + pageParam + "&filter=" + filter
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const explorePosts = "explorePosts";
const explorePostsConfig = (filter) => ({
    queryKey: [explorePosts, filter],
    queryFn: async ({ pageParam = 1 }) =>
        await getExplorePosts(pageParam, filter),
    getNextPageParam: (lastPage: any) => {
        // console.log(lastPage);
        return lastPage?.nextPage;
    },
});

const getHomePosts = async ({ pageParam = 1 }) => {
    try {
        const response = await axios.get("/api/posts/home?cursor=" + pageParam);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getUser = async (id: string | undefined) => {
    try {
        const url =
            "/api/user/profile" + (id ? `?id=${id}` : "");
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getSavedPosts = async (pageParam, filter) => {
    try {
        const response = await axios.get("/api/user/bookmarks?cursor=" + pageParam + "&filter=" + filter);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const getPostDetails = async (id: any) => {
    // console.log();
    const requestURL = `/api/post?id=${id}`;
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

const getUserPosts = async (pageParam, id: any | undefined, filter) => {
    const response = await axios.get(
        "/api/user/posts?cursor=" +
            pageParam +
            (id ? `&id=${id}` : "") +
            "&filter=" +
            filter
    );
    return response.data;
};

const userPosts = "userPosts";
const userPostsConfig = (id, filter) => {
    return {
        queryKey: [userPosts, id, filter],
        queryFn: async ({ pageParam = 1 }) =>
            await getUserPosts(pageParam, id, filter),
        getNextPageParam: (lastPage: any) => {
            // console.log(lastPage);
            return lastPage?.nextPage;
        },
    };
};

const homePosts = "homePosts";
const homePostsConfig = {
    queryKey: [homePosts],
    queryFn: getHomePosts,
    getNextPageParam: (lastPage: any) => {
        // console.log(lastPage);
        return lastPage?.nextPage;
    },
};

const savedPosts = "bookmarksPosts";
const savedPostsConfig = (filter) => {
    return {
        queryKey: [savedPosts, filter],
        queryFn: async ({ pageParam = 1 }) =>
            await getSavedPosts(pageParam, filter),
        getNextPageParam: (lastPage: any) => {
            console.log(lastPage);
            return lastPage?.nextPage;
        },
    };
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
        queryFn: async () => await getPostDetails(id),
    };
};

const hashTags = "hashTags";
const hashTagsConfig = { queryKey: [hashTags], queryFn: getHashTags };

export {
    userDetailsConfig,
    savedPostsConfig,
    homePostsConfig,
    explorePostsConfig,
    postDetailsConfig,
    hashTagsConfig,
    userPostsConfig,
};
