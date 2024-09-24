"use client";

import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(2).max(50),
});

export const LogIn = () => {
  return (
    <>
      <div className="bg-black min-h-screen text-white">test</div>
    </>
  );
};
