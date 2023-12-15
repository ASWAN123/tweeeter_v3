"use client";
import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { defaultMentionStyle, defaultStyle } from "./inputStyles/inputStyles";


const HashtagInput = ( { setContent } ) => {
    const [ contentx, setContentx ] = useState('') 



    const users = [
        {
            id: "1",
            display: "#fun",
        },
        {
            id: "2",
            display: "#programming",
        },
    ];




    const handleInputChange = (event:any, newValue:any) => {
        console.log(newValue);
        setContentx(newValue);
        setContent(newValue)
      };





    return (
        <MentionsInput
            value={contentx}
            onChange={handleInputChange}
            style={defaultStyle}
            placeholder="Write something"
        >
            <Mention trigger="#" data={users} style={defaultMentionStyle} className="text-white" />
        </MentionsInput>
        
    );
};

export default HashtagInput;
