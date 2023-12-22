import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest, res: NextResponse) {
    
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if(!session){
        return NextResponse.json(
            { Error: "You are not allowed to Comment" } ,
            { status: 401  }
        );
    }


    const authorId = session.sub;
    let body = await req.json();
    const post_Id = body.postId ;


    const createComment = await prisma.comment.create({
        data: {
            ...body,
            userId: Number(authorId),
            postId : Number(post_Id),
        },
    });
    


    if(createComment) {
        return NextResponse.json(
            { data: "Comment has been created" },
            { status: 201  }
        );
    }

    


}
