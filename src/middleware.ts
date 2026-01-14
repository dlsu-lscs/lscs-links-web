import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/((?!api/auth|login|_next|_static|_vercel|favicon.ico|public|.*\\.(?:png|jpg|jpeg|gif|svg|css|js|ico|txt|webp)).*)",
  ],
};
