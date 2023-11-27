import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";




export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        console.log('session' , session  )

        if (session){

            let userEmail = session.email
            const user = await db.user.findUnique({
                where: { email : userEmail } ,
                select: { email: true, username: true , name:true , bio: true, avatar: true }
            });
    
            return NextResponse.json({ ...user });

        }




    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Serverorororor Erorr" },
            { status: 500 }
        );
    }
}
