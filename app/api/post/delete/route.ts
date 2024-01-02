import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req: NextRequest) {


    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }

        let body  = await req.json() ;
        console.log(body)
        let id  = body.data.postid ;



        const deletePost = await db.post.delete({
            where: {
                id: Number(id),
            }
        });

        

        return NextResponse.json(
            {
                message : 'delete',
                post : id ,
            },
            { status: 201 }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
