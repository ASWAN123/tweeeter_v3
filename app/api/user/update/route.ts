import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const session = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });


        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }


        let id = session.sub;

        const body = await req.json()

        const updatemedia = await db.user.update({
            where: {
                id:Number(id) ,
            },
            data:body
        });

     
        return NextResponse.json( updatemedia ,  { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
