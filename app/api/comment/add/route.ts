import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: "You are not allowed to Comment" },
                { status: 401 }
            );
        }

        const authorId = session?.user?.sub;
        let body = await req.json();
        const post_Id = body.postId;

        const createComment = await prisma.comment.create({
            data: {
                ...body,
                userId: Number(authorId),
                postId: Number(post_Id),
            },
        });

        if (createComment) {
            return NextResponse.json(
                { data: "Comment has been created" },
                { status: 201 }
            );
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { Error: "Internal Server Erorr" } ,
            { status: 500 }
        );
    }
}
