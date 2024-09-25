"use client";
import { NextResponse } from "next/server";
import { getUser } from "./commonServices/token.services";

const protectedRoutes = [
  "open-visa-application",
  "visa-app",
  "profile",
  "edit-profile",
];
const authRoutes = ["/", "/auth/login", "/auth/register"];

export default async function middleware(req) {
  const isAuth = getUser();
  console.log("isAuth middleware", isAuth);
  if (
    isAuth &&
    protectedRoutes?.includes(req.nextUrl.pathname?.split("/dashboard")[1])
  ) {
    NextResponse.next();
  } else if (
    !isAuth &&
    protectedRoutes?.includes(req.nextUrl.pathname?.split("/dashboard")[1])
  ) {
    return NextResponse.redirect("/dashboard");
  } else if (isAuth && authRoutes?.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(
      `/dashboard`
    );
  } else {
    return NextResponse.next();
  }
}
