import { NextRequest, NextResponse } from "next/server" ;
import { getToken } from "next-auth/jwt" ;
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
    
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if(!session){
        return NextResponse.json(
            { Error: "You are not allowed to post" },
            { status: 401  }
        );
    }

    
    const authorId = session.sub;
    let body = await req.json();

    const  newHashtags = body['hashtags']
    delete body['hashtags']

    const createPost = await db.post.create({
        data: {
            ...body,
            authorId: Number(authorId),
            hashtags : {
                create : newHashtags.map((x:any) => {
                    return { ...x ,  userId:Number(authorId)}
                }) ,
            }
        },
    });




    if(createPost) {
        return NextResponse.json(
            { data: "Post has been created" },
            { status: 201  }
        );
    }

    


}
