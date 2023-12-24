import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
    
    const url = new URL(req.url);
    let id = url.searchParams.get("id");

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }



        const post = await db.post.findUnique({
            where: {
                id: Number(id),
                everyone_can_reply : true ,
            },
            select: {
                content: true,
                media_url: true,
                id: true,
                authorId: true,
                created_at: true,
                author: {
                    select: {
                        id:true , 
                        name: true ,
                        username: true ,
                        media_url: true ,
                        created_at: true ,
                    },
                },
                comments: {
                    orderBy: {
                        created_at: "desc",
                    },
                    select: {
                        id: true,
                        content: true,
                        created_at: true,
                        media_url: true,
                        User: {
                            select:{
                                media_url: true,
                                name :true,
                            }
                        }
                    },
                    
                },
                likes: {
                    select: {
                        id: true,
                        postId: true,
                        userId: true,
                    },
                },
                saves:true ,
                Retweets: true , 

            },
        });

        

        return NextResponse.json(
            post,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
