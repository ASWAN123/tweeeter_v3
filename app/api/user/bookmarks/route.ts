import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


// get all the  saved posts
export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const session = await getServerSession(authOptions);
        


        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized fuck" },
                { status: 401 }
            ) ;
        }

        let user_id = session?.user?.sub;

        const data = await db.post.findMany({

            select:{
                saves : {
                    where : {
                        userId : Number(user_id)
                    },
                    select:{
                        postId:true ,
                    }
                },
                media_url:true ,
                likes:true ,
                 
            },
            orderBy: {
                created_at: "desc",
            },
            

        });

        const posts = data.filter((post) => post.saves.length > 0) ;
        
        
        return NextResponse.json( posts ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
