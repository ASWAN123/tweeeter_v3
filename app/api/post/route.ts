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

        // if (!session) {
        //     return NextResponse.json(
        //         { Error: " You are not authorized " },
        //         { status: 401 }
        //     );
        // }

        // const id: number = Number(route.params.id)
        // console.log( router   ,  'hada  id  man route')

        const post = await db.post.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                content: true,
                media_url: true,
                id: true,
                everyone_can_reply: true,
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
                    where: {
                        postId: Number(id),
                    },
                    orderBy: {
                        created_at: "desc",
                    },
                },
                likes: {
                    where: {
                        postId: Number(id),
                    },
                    select: {
                        id: true,
                        postId: true,
                        userId: true,
                    },
                },
                saves: {
                    where: {
                        postId: Number(id),
                    },
                },
                Retweets: {
                    where: {
                        postId: Number(id),
                    },
                },
            },
        });

        console.log(post)

        return NextResponse.json(
            post,
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Serverorororor Erorr" },
            { status: 500 }
        );
    }
}
