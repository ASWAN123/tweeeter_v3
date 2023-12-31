import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const LIMIT = 3;
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = new URL(req.url);
        const pageN = url.searchParams.get("cursor");
        const filter = url.searchParams.get("filter");
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { Error: " You are not authorized " },
                { status: 401 }
            );
        }

        let data = await db.post.findMany({

            select: {
                id: true,
                saves: {
                    select: {
                        id: true,
                    },
                },
                likes: {
                    select: {
                        id: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                    },
                },
                Retweets: {
                    select: {
                        id: true,
                    },
                },
                media_url: true,
            },
            orderBy: {
                created_at: "desc",
            },
        });

        let Formated_posts = data.map((x) => {
            return {
                ...x,
                saves: x.saves.length,
                likes: x.likes.length,
                comments: x.comments.length,
                Retweets: x.Retweets.length,
            };
        });

        let posts: any = [];

        switch (filter) {
            case "Top":
                posts = Formated_posts.sort((a, b) => {
                    if (b.comments !== a.comments) {
                        return b.comments - a.comments;
                    }

                    if (b.likes !== a.likes) {
                        return b.likes - a.likes;
                    }

                    return b.Retweets - a.Retweets;
                });

                break;
            case "Media":
                posts = Formated_posts.filter((x: any) => x.media_url != null);
                break;
            case "Lastest":
                posts = Formated_posts;
                break;
            case "People":
                // people  i only have  posts  for  people no group invoves in social  media app
                posts = Formated_posts;
                break;
        }

        const count = posts.length;
        const skip = (+pageN - 1) * LIMIT;
        posts = posts.slice(skip, skip + LIMIT);

        

        return NextResponse.json(
            {
                posts,
                nextPage: +pageN * LIMIT < count ? +pageN + 1 : undefined,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { Error: "Internal Server Erorr" },
            { status: 500 }
        );
    }
}
