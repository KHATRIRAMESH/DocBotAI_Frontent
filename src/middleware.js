// import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId, redirectToSignIn } = await auth();

//   if (!userId && isProtectedRoute(req)) {
//     // Add custom logic to run before redirecting

//     return redirectToSignIn();
//   }
// });

export default clerkMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],

  // beforeAuth: (req) => {
  //   // Add any logic you want to run before authentication
  // },

  afterAuth(auth, req) {
    const { userId, sessionClaims } = auth;
    const { pathname } = req.nextUrl;

    // If user is not signed in and trying to access protected routes
    if (!userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // If user is signed in
    if (userId) {
      const role = sessionClaims?.metadata?.role || "user";

      // Admin route protection
      if (pathname.startsWith("/admin")) {
        if (role !== "admin") {
          // Redirect non-admin users away from admin routes
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }

      // User route protection (optional - if you want to prevent admins from accessing user routes)
      if (pathname.startsWith("/user") || pathname.startsWith("/dashboard")) {
        if (role === "admin") {
          // Redirect admins away from user routes to admin dashboard
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
      }

      // Redirect to appropriate dashboard based on role
      if (pathname === "/") {
        if (role === "admin") {
          return NextResponse.redirect(new URL("/home", req.url));
        } else {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
