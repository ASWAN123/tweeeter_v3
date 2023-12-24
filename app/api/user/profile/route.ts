import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
// import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// get user info
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    // const session = await getToken({
    //   req,
    //   secret: process.env.NEXTAUTH_SECRET,
    // });

    const session = await getServerSession(authOptions);

    console.log(session);

    if (!session) {
      return NextResponse.json(
        { Error: " You are not authorized " },
        { status: 401 }
      );
    }

    // let id = session.sub;

    const user = await db.user.findUnique({
      where: { id: Number(id ?? session?.user?.sub) },
      //   where: { id: Number(id) },
      select: {
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        media_url: true,
        cover: true,
      },
    });
    console.log(user)

    return NextResponse.json({ ...user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { Error: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}