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
        
        let posts: {
            id: number;
            media_url: string;
            created_at: Date;
            is_retweet?: boolean;
        }[] = [];
        let count;
        switch (filter) {
            case "Tweets":
                count = await db.$queryRaw`SELECT
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

                  

                  `;
                posts = await db.$queryRaw`SELECT
                    "Post".id,
                    "Post".media_url,
                    "Post".created_at,
                    
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

                return NextResponse.json(
                    {
                        posts,
                        nextPage:
                            +pageN * LIMIT < count.length ? +pageN + 1 : undefined,
                    },
                    { status: 200 }
                );

            // break;

            case "Media":
                count = await db.$queryRaw`
                SELECT
                    "Post".id,
                    "Post".media_url,
                    "Post".created_at
                  FROM
                    "User"
                  JOIN
                    "Post" ON "User"."id" = "Post"."authorId"
                  WHERE
                    "User"."id" = ${Number(
                        user_id
                    )}  AND "Post".media_url IS NOT NULL
                  
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
                    "Retweet"."userId" = ${Number(
                        user_id
                    )} AND "Post".media_url IS NOT NULL
                  
                  

                  `;
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
                    "User"."id" = ${Number(
                        user_id
                    )}  AND "Post".media_url IS NOT NULL
                  
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
                    "Retweet"."userId" = ${Number(
                        user_id
                    )} AND "Post".media_url IS NOT NULL
                  
                  ORDER BY
                    created_at DESC 
                  
                  LIMIT ${LIMIT} OFFSET ${(+pageN - 1) * LIMIT};


              
                  
                  `;

                return NextResponse.json(
                    {
                        posts,
                        nextPage:
                            +pageN * LIMIT < count.length ? +pageN + 1 : undefined,
                    },
                    { status: 200 }
                );

            // break;

            case "Likes":
                let likedPostsCount = await db.like.findMany({
                    where: {
                        userId: Number(user_id),
                    },
                });
                let likedPosts = await db.like.findMany({
                    where: {
                        userId: Number(user_id),
                    },
                    select: {
                        Post: {
                            select: {
                                id: true,
                                media_url: true,
                                created_at: true,
                            },
                        },
                    },

                    take: LIMIT,
                    skip: (+pageN - 1) * LIMIT,
                });

                posts = likedPosts
                    .reverse()
                    .map((elem) => ({ ...elem.Post, is_retweet: false }));

                return NextResponse.json(
                    {
                        posts,
                        nextPage:
                            +pageN * LIMIT < likedPostsCount.length
                                ? +pageN + 1
                                : undefined,
                    },
                    { status: 200 }
                );
                
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
