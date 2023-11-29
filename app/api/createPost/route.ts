import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

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


    const createPost = await prisma.post.create({
        data: {
            ...body,
            authorId: Number(authorId),
        },
    });

    if(createPost) {
        return NextResponse.json(
            { data: "Post has been created" },
            { status: 201  }
        );
    }

    


}
