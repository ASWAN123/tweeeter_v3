import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// get user info
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");


        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }


        const user_id = id || session?.user?.sub;
  

        const posts = await db.user.findMany({
            where: {
                id: Number(user_id),
            },
            select: {
                posts: {
                    select: {
                        id: true,
                        likes : {
                            select:{
                                id: true,
                            }
                        },
                        media_url:true ,
                        
                    },
                    orderBy: {
                        created_at: "desc",
                    },
                },
            },
        });




        return NextResponse.json( posts[0]['posts'] , { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
