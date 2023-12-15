const defaultStyle =  {
    control: {
        backgroundColor: "#fff",
        fontSize: 14,
        fontWeight: "normal",
    },

    "&multiLine": {
        control: {
            // fontFamily: "monospace",
            minHeight: 63,
        },
        highlighter: {
            padding: 9,
            border: "1px solid transparent",
        },
        input: {
            padding: 9,
            border: "1px solid transparent",
            outline:'none',
        },
    },

    "&singleLine": {
        display: "inline-block",
        width: 180,

        highlighter: {
            padding: 1,
            border: "2px inset transparent",
        },
        input: {
            padding: 1,
            border: "2px inset ",
        },

    },

    suggestions: {
        list: {
            backgroundColor: "white",
            border: "1px solid lightgray",
            fontSize: 14,
            borderRadius : '5px' ,
        },
        item: {
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            "&focused": {
                backgroundColor: "#f4f4f4" ,
            },
        },
    },
};


const defaultMentionStyle = {
  backgroundColor: "#cee4e5",
};

export  {
  defaultStyle ,
  defaultMentionStyle
}