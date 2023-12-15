const defaultStylePost =  {
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

const defaultStyleComment =  {
    control: {
        fontSize: 14,
        fontWeight: "normal",
    },

    "&multiLine": {
        control: {
            minHeight: 40,
            // maxHeight: 40,
            width: "80%",
            maxWidth: "60ch",
            // borderRadius: '5px',
        },

        highlighter: {
            padding: 9,
            border: "1px solid transparent",
            color:"white"
        },
        input: {
            padding: 9,
            border: "1px solid transparent",
            outline:'none',
            width : "80%"
        },
    },

    "&singleLine": {
        display: "inline-block",
        width: 180,

        highlighter: {
            padding: 1,
            border: "2px inset transparent",
            color:"white"
        },
        input: {
            padding: 1,
            border: "2px inset ",
            color:"white"
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
            color:"white",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            "&focused": {
                backgroundColor: "#f4f4f4" ,
            },
        },
    },
};


const defaultMentionStyleComment = {
    backgroundColor: "green",
    color: "white",
  };

const defaultMentionStylePost = {
  backgroundColor: "#cee4e5",
};

export  {
  defaultStylePost ,
  defaultMentionStylePost ,
  defaultStyleComment,
  defaultMentionStyleComment
}