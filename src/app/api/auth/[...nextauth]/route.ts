import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session, Account } from "next-auth";

type BackendLoginResponse = {
  jwtToken?: string; // primary expected field from backend
};

const BASE = (process.env.SERVER_API_URL || "").replace(/\/$/, "");
const REQUIRE_BACKEND_LOGIN =
  (process.env.REQUIRE_BACKEND_LOGIN || process.env.NEXT_PUBLIC_REQUIRE_BACKEND_LOGIN) === "true";

async function exchangeBackendToken(accessToken: string): Promise<{ ok: boolean; token?: string }> {
  try {
    console.log("[auth] Exchanging Google access_token with backend", { url: `${BASE}/login` });
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: accessToken }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[auth] Backend /login non-OK response", { status: res.status, statusText: res.statusText, body: text });
      return { ok: false };
    }
    const data = (await res.json()) as BackendLoginResponse;
    const apiToken = data.jwtToken;
    if (!apiToken) {
      console.error("[auth] Backend /login response missing jwtToken", { data });
      return { ok: false };
    }
    console.log("[auth] Received backend jwtToken");
    return { ok: true, token: apiToken };
  } catch (err) {
    console.error("[auth] Failed to reach backend /login", err);
    return { ok: false };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  debug: process.env.NODE_ENV !== "production",
  logger: {
    error(code, metadata) {
      console.error("[next-auth:error]", code, metadata);
    },
    warn(code) {
      console.warn("[next-auth:warn]", code);
    },
    debug(code, metadata) {
      console.log("[next-auth:debug]", code, metadata);
    },
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google" && account.access_token) {
        console.log("[auth] signIn: attempting backend exchange");
        const result = await exchangeBackendToken(account.access_token);
        if (REQUIRE_BACKEND_LOGIN && !result.ok) {
          console.error("[auth] signIn blocked: backend exchange failed and REQUIRE_BACKEND_LOGIN is true");
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      // On first sign in, exchange Google's access_token for our backend JWT
      if (account?.provider === "google" && account.access_token) {
        console.log("[auth] jwt: attempting backend exchange");
        const result = await exchangeBackendToken(account.access_token);
        if (result.ok && result.token) {
          token.apiToken = result.token;
        } else {
          console.error("[auth] jwt: backend exchange failed");
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.apiToken = token.apiToken as string | undefined;
      if (!session.apiToken) {
        console.warn("[auth] session: apiToken missing on session");
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
