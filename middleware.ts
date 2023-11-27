import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname ;

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });


    if ( !session && path !== "/login" && path !== '/register'  ) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if( session  &&  path === "/register" ){
        return NextResponse.redirect(new URL('/profile', req.url ))
    }


    if ( session &&  path === "/login"  ){
      return NextResponse.redirect(new URL('/profile', req.url ))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/api" , "/", "/bookmarks", "/explore"  , "/login" , "/register" , "/profile" ],
};
