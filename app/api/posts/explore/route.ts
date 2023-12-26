import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        
        // const session = await getServerSession(authOptions) ;

        // if (!session) {
        //     return NextResponse.json(
        //         { Error: " You are not authorized " } ,
        //         { status: 401 }
        //     );
        // }

        let data = await db.post.findMany({
            orderBy: {
                created_at: 'desc',
            },
            select: {
                id: true,
                saves: {
                    select: {
                        id: true,
                    },
                    
                },
                likes: {
                    select: {
                        id: true,
                    },
                    
                },
                comments: {
                    select: {
                        id: true,
                    },
                    
                    
                },
                Retweets: {
                    select: {
                        id: true,
                    },
                },
                media_url: true,
            },
        });

        let posts = data.map((x) => {
            return { ...x,
            saves: x.saves.length,
            likes: x.likes.length,
            comments: x.comments.length ,
            Retweets : x.Retweets.length}
        }) 

        

        return NextResponse.json( posts ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
