import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {db} from "@/app/lib/db"

export async function POST(req: NextRequest, res: NextResponse) {
    
    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if(!session){
        return NextResponse.json(
            { Error: "You are not allowed to Like" } ,
            { status: 401  }
        );
    }


    let body = await req.json();


    // todos   : handle  the  stuff  already  likes  ,  or  its a  comment  like  
    const save = await  db.save.delete({
        where :{
            id : Number(body.saveID) ,
        }
    })

    return NextResponse.json(
        {
            message: 'unsaved',
            deletedLike: save, // Include information from the deleted like if needed
            status: 201
        }
    );











    


}
