import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

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
    console.log(body  ,  '*****************************************')

    // todos   : handle  the  stuff  already  likes  ,  or  its a  comment  like  
    const like = await  prisma.like.delete({
        where :{
            id : Number(body.id) ,
        }
    })

    return NextResponse.json(
        {
            message: 'unlike',
            deletedLike: like, // Include information from the deleted like if needed
            status: 201
        }
    );











    


}
