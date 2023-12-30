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


        const  count = await db.post.count() ;

        console.log(count)

        const posts = await db.post.findMany({
            orderBy : {
                created_at:'desc',
            } ,
            where : {
                everyone_can_reply:true ,
            },
            select: {
                id: true  ,
            },
            take : LIMIT ,
            skip : ( +pageN - 1) * LIMIT
        }) ;

        console.log(posts)


        

        return NextResponse.json( {   posts , 'nextPage':  +pageN * LIMIT < count ? +pageN+1 : undefined } ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
