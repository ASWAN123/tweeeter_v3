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

        const like = await db.like.delete({
            where: {
               ...body
            },
        });

        return NextResponse.json({
            message: "unlike",
            deletedLike: like,
            status: 201,
        });
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
