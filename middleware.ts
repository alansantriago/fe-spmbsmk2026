import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // ─── Guest-only pages: /login, /register ───────────────────────
  // If user is already logged in → redirect to their dashboard
  if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
    const redirectTo = userRole === "siswa" ? "/siswa" : "/admin";
    return NextResponse.redirect(new URL(redirectTo, req.nextUrl));
  }

  // ─── Protected: /admin/* ───────────────────────────────────────
  // Must be logged in + must have admin role
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    const adminRoles = ["admin-dinas", "admin-dinas-kab", "admin-sekolah"];
    if (!userRole || !adminRoles.includes(userRole)) {
      // Logged in but wrong role → redirect to correct dashboard
      return NextResponse.redirect(new URL("/siswa", req.nextUrl));
    }
  }

  // ─── Protected: /siswa/* ───────────────────────────────────────
  // Must be logged in + must have siswa role
  if (pathname.startsWith("/siswa")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    if (userRole !== "siswa") {
      // Logged in but wrong role → redirect to admin
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin/:path*",
    "/siswa/:path*",
  ],
};
