import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: "You are not allowed to Like" },
                { status: 401 }
            );
        }

        let body = await req.json();
        const authorId = session?.user?.sub;
        const post_Id = body.postId;

        const save = await db.save.create({
            data: {
                userId: Number(authorId),
                postId: Number(post_Id),
            },
        });

        return NextResponse.json({
            message: "saved",
            saved: save,
            status: 200,
        });
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
