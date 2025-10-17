export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!api/auth|login|_next|_static|favicon.ico|public|.*\\.(?:png|jpg|jpeg|gif|svg|css|js)).*)",
  ],
};
