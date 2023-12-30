import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const LIMIT = 3;
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        const pageN = url.searchParams.get("cursor");
        const filter = url.searchParams.get("filter");

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }

        const user_id = id || session?.user?.sub;

        const count_posts = await db.post.findMany({
            where: {
                authorId: Number(user_id),
            },
        });

        const count = count_posts.length;

        const posts = await db.post.findMany({
            where: {
                authorId: Number(user_id),
            },

            select: {
                id: true,
                media_url: true,
                likes: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },

            take: LIMIT,
            skip: (+pageN - 1) * LIMIT,
        }) ;


        console.log(posts)
 

        // set up config of  filtering  with this  part

        return NextResponse.json(
            {
                posts,
                nextPage: +pageN * LIMIT < count ? +pageN + 1 : undefined,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
