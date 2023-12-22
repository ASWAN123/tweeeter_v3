import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // if (!session) {
        //     return NextResponse.json(
        //         { Error: " You are not authorized " },
        //         { status: 401 }
        //     );
        // }

        const hashtags = await db.hashtags.findMany() ;

        console.log(hashtags ,  'Hashtags')

        return NextResponse.json( hashtags ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
