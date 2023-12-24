import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    let id = url.searchParams.get("id");

    try {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }



        const user = await db.user.findUnique({
            where : {
                id : Number(id),
            } ,
            select:{
                id:true ,
                name:true ,
                bio : true ,
                media_url:true ,
                cover : true ,
            }
        });

        

        return NextResponse.json(
            user,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
