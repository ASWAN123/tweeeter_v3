import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { number } from "zod";

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


        // const  count = await db.post.count() ;
        const  followers = await db.follower.findMany({
            where:{
                userId: Number(session?.user?.sub)
            },
            select:{
                followerId:true ,
            }
        })

        const data = await db.post.findMany({
            orderBy : {
                created_at:'desc',
            } ,
            where : {
                everyone_can_reply:true ,
            },
            select: {
                id: true  ,
                authorId:true ,
            },

        }) ;


        // filter based posts  from friends  only
        let followersArray  = followers.map((x) => x.followerId )
        let posts = data.filter((post) => {
            // if  auther  id  of  this  post  exist  in the  follower  array  that  mean  good
            if ( followersArray.find( (flw_id) => flw_id == post.authorId )  || post.authorId == session?.user?.sub ){
                return post
            }
            
        })




        const count = posts.length ;
        const skip = (+pageN - 1) * LIMIT ;
        posts = posts.slice(skip, skip + LIMIT );

        


        

        return NextResponse.json( {   posts , 'nextPage':  +pageN * LIMIT < count ? +pageN+1 : undefined } ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
