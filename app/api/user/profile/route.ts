import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";



// get user info
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const session = await getServerSession(authOptions);



    if (!session) {
      return NextResponse.json(
        { Error: " You are not authorized " },
        { status: 401 }
      );
    }


    const user_id = id || session?.user?.sub;

    const user = await db.user.findUnique({
      where: { id: Number(user_id) },

      select: {
        id:true ,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        media_url: true,
        cover: true,
        following : true 


      },
    });


   const  followers = await  db.follower.findMany({
        where :{
          followerId:Number(user_id) ,
        },
    })


 






    const reformaData  = {...user  , followers:followers };


    return NextResponse.json(reformaData);
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { Error: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}