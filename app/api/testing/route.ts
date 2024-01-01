import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


const LIMIT = 3;
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        const pageN = url.searchParams.get("cursor");
        const filter = url.searchParams.get("filter");

        const session = await getServerSession(authOptions);

        // if (!session) {
        //     return NextResponse.json(
        //         { Error: " You are not authorized " },
        //         { status: 401 }
        //     );
        // }

        // const user_id = id || session?.user?.sub;

        const user_id = 2 ;

        let posts = await db.post.findMany({
          where: {
            everyone_can_reply: true,
            author: {
              following: {
                some: {
                  followerId :  user_id
                }
              }
            }
          },
          select: {
            id: true,
            media_url: true,
            created_at: true,
            authorId: true,
          },
        });
        


      return NextResponse.json(
        {
            posts
            
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
