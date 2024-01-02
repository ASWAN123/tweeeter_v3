import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";




// get user info
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    
    const session = await getServerSession(authOptions);



    if (!session) {
      return NextResponse.json(
        { Error: " You are not authorized " },
        { status: 401 }
      );
    }



    const user = await db.user.findMany({
      where:{
        id : {not : Number(session?.user?.sub)}
      } ,
      select: {
        id:true ,
      },
      take:2
      
    });


    return NextResponse.json(user);
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { Error: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}