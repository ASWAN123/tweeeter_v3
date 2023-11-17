import React from "react";

const Hashtags = () => {
    const tweetData = [
        { hashtag: "#programming", tweets: "213k Tweets" },
        { hashtag: "#devchallenges", tweets: "123k Tweets" },
        { hashtag: "#frontend", tweets: "34k Tweets" },
        { hashtag: "#helsinki", tweets: "11k Tweets" },
        { hashtag: "#100DaysOfCode", tweets: "5k Tweets" },
        { hashtag: "#learntocode", tweets: "1k Tweets" },
      ];
    return (
        <div
            className=" bg-[#FFFFFF] p-4 rounded-md  flex flex-col gap-2 shadow-md  mx-auto " >
            <h1 className="font-semibold  ">Trends for you</h1>
            <hr />
            <ul className=" space-y-4  mt-2">
                {
                    tweetData.map((elem  ,  index ) => {
                        return                  <li key={index} className="flex flex-col gap-2" >
                        <p className="text-[16px] font-semibold ">{elem.hashtag}</p>
                        <span className=" text-neutral-400 ">{elem.tweets}</span>
                    </li>
                    })
                }

            </ul>
        </div>
    );
};

export default Hashtags;
