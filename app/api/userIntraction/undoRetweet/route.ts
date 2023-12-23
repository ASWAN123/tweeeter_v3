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
                { Error: "You are not allowed to post" },
                { status: 401 }
            );
        }

        const authorId = session.sub;
        let body = await req.json();

        const underretweet = await db.retweet.delete({
            where : {
                ...body
            }
        });

        if (underretweet) {
            return NextResponse.json(
                { data: "Post has been undo retweeted " },
                { status: 201 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
