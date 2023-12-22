"use client";
import React, { useEffect, useState } from "react";
import { MentionsInput, Mention, DataFunc, SuggestionDataItem } from "react-mentions";



const HashtagInput = ({ hashtags ,  setContent , defaultStyle ,  defaultMentionStyle }) => {
    const [contentx, setContentx] = useState("");
    let hashTagsList: SuggestionDataItem[] | DataFunc = []

    useEffect(() => {
        if (hashtags) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            hashTagsList = hashtags.map((x:String ,  index:Number) => {
                return { id : index ,  display : "#"+x }
            })
            
        }
      }, [hashtags]);



    const handleInputChange = (event: any, newValue: any) => {
        setContentx(newValue);
        setContent(newValue);
    };

  

    return (
        <MentionsInput
            // className="bg-red-300"
            value={contentx}
            onChange={handleInputChange}
            style={ defaultStyle }
            placeholder="Write something"
        >
            <Mention
                trigger="#"
                data={hashTagsList}
                style={ defaultMentionStyle }
                className="text-white"
            />
        </MentionsInput>
    );
};

export default HashtagInput;
