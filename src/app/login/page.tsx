"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    // Use NextAuth to start Google OAuth flow
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
      <div className="w-full max-w-sm border rounded-xl p-6 bg-card text-card-foreground shadow-sm">
        <h1 className="text-xl font-semibold mb-2">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Use your DLSU Google account to continue.
        </p>
        <Button className="w-full" onClick={handleGoogleLogin}>
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
