import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    console.log(pathname)

    const isAuth = await getToken({ req });
    const signInPage = "/login";
    const isLoginPage = signInPage ? pathname.startsWith(signInPage) : false;
    
    const homePage = '/home';

    const sensetiveRoutes = ["/home"];
    const isAccessingSensetiveRoute = sensetiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL(homePage, req.url));
      }

      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensetiveRoute) {
      return NextResponse.redirect(new URL(signInPage, req.url));
    }

    
    if (!pathname) {
      return NextResponse.redirect(new URL(homePage, req.url));
    }
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
