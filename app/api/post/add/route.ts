import { NextRequest, NextResponse } from "next/server" ;

import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    try {

    
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json(
            { Error: "You are not allowed to post" },
            { status: 401  }
        );
    }

    
    const authorId = session?.user?.sub;
    let body = await req.json();
    let  { hashtags , content  , media_url ,  ...rest } = body ;

    if (!(content?.length > 0) && !(media_url?.length > 0)) {
        return NextResponse.json(
            { data: "Please add content or a media file" },
            { status: 500 }
        );
    }
    
    const createPost = await db.post.create({
        data: {
            ...(content && { content }),  
            ...(media_url && { media_url }),  
            author: {
                connect: { id: Number(authorId) }
            },
            hashtags: {
                create: hashtags.map((x: any) => {
                    return { ...x, userId: Number(authorId) };
                }),
            },
            ...rest,  
        },
    });




    if(createPost) {
        return NextResponse.json(
            { data: "Post has been created" },
            { status: 201  }
        );
    }
} catch (error) {
    // console.log(error);
    return NextResponse.json(
      { Error: "Internal Server Erorr" },
      { status: 500 }
    );
  }

    


}
