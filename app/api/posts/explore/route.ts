import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const  LIMIT = 3
export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const url = new URL(req.url);
        const pageN = url.searchParams.get("cursor");
        
        const session = await getServerSession(authOptions) ;

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " } ,
                { status: 401 }
            );
        }

        const count = await db.post.count() ;

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


        posts = posts.sort((a, b) => {
            // First, compare by comments in descending order
            if (b.comments !== a.comments) {
              return b.comments - a.comments;
            }
          
            // If comments are equal, compare by likes in descending order
            if (b.likes !== a.likes) {
              return b.likes - a.likes;
            }
          
            // If likes are also equal, compare by Retweets in descending order
            return b.Retweets - a.Retweets;
          });


        console.log(  'data  filtered for  explore' , posts )
        // take : LIMIT ,
        //     skip : ( +pageN - 1) * LIMIT ,
        const skip = (+pageN - 1) * LIMIT ;
        posts = posts.slice(skip, skip + LIMIT );

        console.log('pagination' ,  posts.length )





        

        return NextResponse.json( {   posts , 'nextPage':  +pageN * LIMIT < count ? +pageN+1 : undefined } ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
