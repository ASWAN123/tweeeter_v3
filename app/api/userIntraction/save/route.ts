import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/app/lib/db";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!session) {
            return NextResponse.json(
                { Error: "You are not allowed to Like" },
                { status: 401 }
            );
        }

        let body = await req.json();
        const authorId = session.sub;
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
            status: 201,
        });
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
