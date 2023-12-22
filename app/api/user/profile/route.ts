import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";



// get user info 
export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });



        if(!session){
            return NextResponse.json(
                { Error: " You are not authorized " } ,
                { status: 401  }
            );
        }



        let id = session.sub

        const user = await db.user.findUnique({
            where: { id : Number(id) } ,
            select: { email: true, username: true , name:true , bio: true, avatar: true  ,  media_url:true  , cover:true}
        });


        return NextResponse.json({ ...user });






    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
