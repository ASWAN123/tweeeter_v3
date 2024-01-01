// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/app/lib/db";

// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";

// const LIMIT = 3;
// export async function GET(req: NextRequest, res: NextResponse) {
//     try {
//         const url = new URL(req.url);
//         const id = url.searchParams.get("id");
//         const pageN = url.searchParams.get("cursor");
//         const filter = url.searchParams.get("filter");

//         const session = await getServerSession(authOptions);

//         if (!session) {
//             return NextResponse.json(
//                 { Error: " You are not authorized " },
//                 { status: 401 }
//             );
//         }

//         const user_id = id || session?.user?.sub;

//         const data0 = await db.post.findMany({
//             where: {
//                 authorId: Number(user_id),
//             },

//             select: {
//                 id: true,
//                 media_url: true,
//                 created_at:true ,
//                 likes: {
//                     select: {
//                         id: true,
//                         userId: true,
//                         postId: true,
//                     },
//                 },
//                 comments: {
//                     select: {
//                         id: true,
//                         userId: true,
//                         postId: true,
//                     },
//                 },
//             },
//             orderBy: {
//                 created_at: "desc",
//             },
//         });

//         const data1 = await db.retweet.findMany({
//             where: {
//                 userId: Number(user_id),
//             },

//             select: {
//                 Post:{
//                     select:{
//                         id: true,
//                         media_url: true,
//                         created_at:true ,
//                         likes: {
//                             select: {
//                                 id: true,
//                                 userId: true,
//                                 postId: true,
//                             },
//                         },
//                         comments: {
//                             select: {
//                                 id: true,
//                                 userId: true,
//                                 postId: true,
//                             },
//                         },
//                     },
//                 }
                
//             },

//         });

//         const data = data1.map((elem) => {
//             let newobj = {...elem.Post} ; 
//             newobj['retweeted'] = true  ; 
//             return newobj
//         } ).concat(data0)
        
        
        
//         // { ...elem.Post ,  'retweeted':true  } ).concat(data0)
        

//         let myPosts : any = [];

//         switch (filter) {
            
//             case "Tweets":
//                 myPosts = data.sort((a:any ,  b:any ) =>  new Date(b.created_at) - new Date(a.created_at) ) 
//                 break;
//             case "Tweets & replies" :
//                 myPosts = data ;
//                 break;
//             case "Media":
//                 myPosts = data.filter((x: any) => x.media_url != null);
//                 break;
//             case "Likes":
//                 myPosts = data.filter((x: any) =>  x.likes && x.likes.length > 0 );
//                 break;
//         }

//         console.log("myPosts ===> ", myPosts);

//         const count = myPosts.length;
//         const skip = (+pageN - 1) * LIMIT;
//         let posts = myPosts.slice(skip, skip + LIMIT);

//         // set up config of  filtering  with this  part

//         return NextResponse.json(
//             {
//                 posts,
//                 nextPage: +pageN * LIMIT < count ? +pageN + 1 : undefined,
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json(
//             { Error: "Internal Server Erorr" },
//             { status: 500 }
//         );
//     }
// }




import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


const LIMIT = 3;
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        const pageN = url.searchParams.get("cursor");
        const filter = url.searchParams.get("filter");

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }

        const user_id = id || session?.user?.sub;
        // const user_id = 2;
        let posts;
        switch (filter) {
            case "Tweets":
                posts = await db.$queryRaw`SELECT
                    "Post".id,
                    "Post".media_url,
                    "Post".created_at,
                    -- COALESCE("Retweet"."userId", ${user_id})
                    FALSE AS is_retweet
                  FROM
                    "User"
                  JOIN
                    "Post" ON "User"."id" = "Post"."authorId"
                  WHERE
                    "User"."id" = ${Number(user_id)} 
                  
                  UNION ALL
                  
                  SELECT
                    "Post".id,
                    "Post".media_url,
                    "Post".created_at,
                    TRUE AS is_retweet
                    -- COALESCE("Retweet"."userId", ${user_id})
                    
                  FROM
                    "Retweet"
                  JOIN
                    "Post" ON "Retweet"."postId" = "Post"."id"
                  WHERE
                    "Retweet"."userId" = ${Number(user_id)}
                  
                  ORDER BY
                    created_at DESC 
                  
                  LIMIT ${LIMIT} OFFSET ${(+pageN - 1) * LIMIT};
                  
                  `;
                break ; 

            case "Media":
                posts = await db.$queryRaw`
                SELECT
                    "Post".id,
                    "Post".media_url,
                    "Post".created_at
                  FROM
                    "User"
                  JOIN
                    "Post" ON "User"."id" = "Post"."authorId"
                  WHERE
                    "User"."id" = ${Number(user_id)}  AND "Post".media_url IS NOT NULL
                  
                  UNION ALL
                  
                  SELECT
                    "Post".id,
                    "Post".media_url,
                    "Post".created_at
                    
                  FROM
                    "Retweet"
                  JOIN
                    "Post" ON "Retweet"."postId" = "Post"."id"
                  WHERE
                    "Retweet"."userId" = ${Number(user_id)} AND "Post".media_url IS NOT NULL
                  
                  ORDER BY
                    created_at DESC 
                  
                  LIMIT ${LIMIT} OFFSET ${(+pageN - 1) * LIMIT};


              
                  
                  `;
                break ; 




            case 'Likes' :
                let likedPosts = await  db.like.findMany({
                    where : {
                        userId: Number(user_id), 
                    },
                    select:{
                        Post : {
                            select:{
                                id:true ,
                                media_url: true ,
                                created_at : true ,
                            },
                        }
                    },

                    take : LIMIT ,
                    skip : (+pageN - 1) * LIMIT ,
                    
                })

                posts = likedPosts.reverse().map((elem) => elem.Post )
                break ;

        }





        return NextResponse.json(
            {
                posts,
                nextPage:
                    +pageN * LIMIT < posts.length
                        ? +pageN + 1
                        : undefined,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
