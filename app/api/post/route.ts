import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";

export async function GET(req: NextRequest    ) {
    // const router = useRouter();
    console.log( req.url ,  'this  is  my  req  ')
    // console.log(slugValue ,  'slug')
    const url = new URL(req.url);
    let id = url.searchParams.get('id');
    console.log(id , 'id')

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

        // const id: number = Number(route.params.id)
        // console.log( router   ,  'hada  id  man route')


        const posts = await db.post.findUnique({
            where :{
                id : Number(id) ,
            },
            select:{
                content : true , 
                media_url : true , 
                id: true  ,
                everyone_can_reply:true ,
                authorId : true ,
                created_at :true ,
                comments : {
                    orderBy :{
                        created_at:'desc',
                    }
                } ,
                likes: {
                    select : {
                        id:true ,
                        postId : true 
                    }
                }
            }
        }) ;

        return NextResponse.json( posts ,  { status: 200 } );

    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Serverorororor Erorr" },
            { status: 500 }
        );
    }
}
