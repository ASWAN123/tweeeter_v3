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
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }

        let id = session.sub;

        const posts = await db.save.findMany({
            where :{
                userId : Number(id),
            },
            select:{
                postId: true  ,
            }
        }) ;
        
        
        return NextResponse.json( posts ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
