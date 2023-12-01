import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        console.log("session", session);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }

        let id = session.sub;

        const posts = await db.post.findMany({
            orderBy:{
                created_at:'desc'
            },
            select:{
                content : true , 
                media_url : true , 
                id: true  ,
                everyone_can_reply:true ,
                authorId : true ,
                created_at :true ,
                comments :true ,

            }
        });

        return NextResponse.json( [...posts] ,  { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Serverorororor Erorr" },
            { status: 500 }
        );
    }
}
