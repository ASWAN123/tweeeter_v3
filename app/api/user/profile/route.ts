import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";




export async function GET(req: NextRequest, res: NextResponse) {
    // try {

        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        // console.log('session' , session  )


        if(!session){
            return NextResponse.json(
                { Error: " You are not authorized " } ,
                { status: 401  }
            );
        }



        let id = session.sub
        // console.log(id ,  'this  is  user id')
        const user = await db.user.findUnique({
            where: { id : Number(id) } ,
            select: { email: true, username: true , name:true , bio: true, avatar: true  ,  media_url:true  , cover:true}
        });
        // console.log(user)
        // console.log({...user} ,  'userrrrr')

        return NextResponse.json({ ...user });






    // } catch (error) {
    //     return NextResponse.json(
    //         { Error: "Internal Serverorororor Erorr" },
    //         { status: 500 }
    //     );
    // }
}
