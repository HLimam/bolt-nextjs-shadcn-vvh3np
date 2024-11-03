'use client';

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
      title="Sign out"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}