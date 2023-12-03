import axios from "axios"

const HandleLike  = async (postID) => {
    const resposne  = await axios.post('/api/userIntraction/like' ,  {
        postID 
    })

    console.log(resposne.data)



    return 
}



export  {HandleLike}