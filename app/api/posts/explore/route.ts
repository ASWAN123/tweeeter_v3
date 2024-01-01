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
            case "Top":
                let allPosts = await db.post.findMany({
                    where: {
                        authorId: { not: Number(user_id) },
                        everyone_can_reply: true,
                    },

                    select: {
                        id: true,
                        media_url: true,
                        created_at: true,
                        authorId: true,
                        _count: {
                            select: {
                                comments: true,
                                Retweets: true,
                                saves: true,
                                likes: true,
                            },
                        },
                    },
                });

                let sortedData = allPosts.sort((a, b) => {
                    if (b._count.comments !== a._count.comments) {
                        return b._count.comments - a._count.comments;
                    }

                    if (b._count.likes !== a._count.likes) {
                        return b._count.likes - a._count.likes;
                    }

                    if (b._count.saves !== a._count.saves) {
                        return b._count.saves - a._count.saves;
                    }

                    return b._count.Retweets - a._count.Retweets;
                });

                const skip = (+pageN - 1) * LIMIT;
                posts = sortedData.slice(skip, skip + LIMIT);
                posts = posts.map(({ _count, ...rest }) => rest);

                return NextResponse.json(
                    {
                        posts,
                        nextPage:
                            +pageN * LIMIT < sortedData.length
                                ? +pageN + 1
                                : undefined,
                    },
                    { status: 200 }
                );



            case "Lastest":
                posts = await db.post.findMany({
                    where: {
                        authorId: { not: Number(user_id) },
                        everyone_can_reply: true,
                    },

                    select: {
                        id: true,
                        media_url: true,
                        created_at: true,
                        authorId: true,
                    },
                    orderBy: {
                        created_at: "desc",
                    },
                    take: 3,
                    skip: (+pageN - 1) * LIMIT,
                });

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

            case 'Media' :
              posts = await db.post.findMany({
                where: {
                    authorId: { not: Number(user_id) },
                    everyone_can_reply: true,
                    media_url : { not : null }
                },

                select: {
                    id: true,
                    media_url: true,
                    created_at: true,
                    authorId: true,
                    
                },
                take : 3 ,
                skip: (+pageN - 1) * LIMIT, 
            });

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


        }


    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
