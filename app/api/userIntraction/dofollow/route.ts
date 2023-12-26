import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: "You are not allowed to Like" },
                { status: 401 }
            );
        }

        let body = await req.json();
        
        let follower_id  = body.userId ;

        const  follower   = await db.follower.create({
            data : {
                followerId: Number(follower_id),
                userId : Number(session?.user?.sub) 
            }
        })



        return NextResponse.json({
            message: "follow",
            addedfollower: follower ,
            status: 201 ,
        });





    } catch (error) {
        console.log(error) 
        return NextResponse.json(
            { Error: "Internal Server Erorr" } ,
            { status: 500 }
        );
    }
}
