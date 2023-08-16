import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    // get path from request
    const path = request.nextUrl.pathname;

    // login and signup are public path
    const isPublicPath = (path === "/login" || path === "/signup")

    // get token
    const token = request.cookies.get("token")?.value || "";


    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup"
    ],
}