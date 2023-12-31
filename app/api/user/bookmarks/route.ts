import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


const  LIMIT = 3

export async function GET(req: NextRequest, res: NextResponse) {

    try {

        const url = new URL(req.url);
        const pageN = url.searchParams.get("cursor");
        const filter = url.searchParams.get("filter");
        
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized fuck" },
                { status: 401 }
            ) ;
        }

        let user_id = session?.user?.sub ;
        console.log(user_id)
        const  data  = await  db.post.findMany({

            select: {
                id: true,
                media_url: true,
                likes: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                        userId: true,
                        postId: true,
                    },
                },
                saves:{
                    where:{
                        userId : Number(user_id)
                    },
                    select:{
                        userId:true ,
                        postId:true , 
                        id:true ,
                    }
                }
            },
            orderBy: {
                created_at: "desc",
            },

        })

        
        const saved_posts = data.filter((post) => post.saves.length > 0) ;
        

        let myPosts : any = [];

        switch (filter) {
            
            case "Tweets":
                myPosts = saved_posts
                break;
            case "Tweets & replies" :
                myPosts = saved_posts ;
                break;
            case "Media":
                myPosts = saved_posts.filter((x: any) => x.media_url != null);
                break;
            case "Likes":
                myPosts = saved_posts.filter((x: any) =>  x.likes && x.likes.length > 0 );
                break;
        }

        console.log("myPosts ===> ", myPosts);

        const count = myPosts.length;
        const skip = (+pageN - 1) * LIMIT;
        let posts = myPosts.slice(skip, skip + LIMIT);









        
        
        return NextResponse.json( {
            posts,
            nextPage: +pageN * LIMIT < count ? +pageN + 1 : undefined,
        } ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
