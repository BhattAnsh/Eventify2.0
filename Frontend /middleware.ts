import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// Define protected routes
const isProtectedRoute = createRouteMatcher([
  "/my-events(.*)",
  "/create-event(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const userId = (await auth()).userId
  if (isProtectedRoute(req) && !userId){
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }
  return NextResponse.next();
    
})

export const config = {
  matcher: [
    "/(.*)",
    "/create-event/(.*)", 
    "/api/(.*)" // Protect API routes as needed
  ],
};