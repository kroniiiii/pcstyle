// ============================================================
// Middleware - Role-based access control
// /admin/*  -> vetëm ADMIN
// /dashboard, /checkout -> vetëm përdorues të kyçur
// ============================================================
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Përdoruesit pa rol ADMIN nuk hyjnë në panel
    if (isAdminRoute && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // duhet të jesh i kyçur
    },
    pages: { signIn: "/login" },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/checkout"],
};
