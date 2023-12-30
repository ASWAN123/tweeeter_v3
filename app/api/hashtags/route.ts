import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }

        let hashtags = await db.hashtags.findMany({
            where:{
                name:{
                    contains:"#",
                }
            },
            select:{
                id:true ,
                name: true ,
                userId:true
            }
            
        }) ;


        let hashtagCounts = {};

   
        hashtags.forEach(post => {

          let hashtag = post.name;
          hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1;

        });
        

        let hashtagList = Object.keys(hashtagCounts).map(name => ({
          name: name,
          count: hashtagCounts[name]
        }));

        hashtagList = hashtagList.sort((a, b) => b.count - a.count)

        const top10 = hashtagList.slice(0, 10);


        return NextResponse.json( top10 ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
