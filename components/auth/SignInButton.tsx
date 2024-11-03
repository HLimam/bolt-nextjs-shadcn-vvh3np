'use client';

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export function SignInButton({ children }: { children: React.ReactNode }) {
  return (
    <Button 
      className="w-full" 
      onClick={() => signIn('github', { callbackUrl: '/' })}
    >
      {children}
    </Button>
  );
}