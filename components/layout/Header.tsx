'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';
import { UserNav } from './UserNav';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '@/src/providers/AuthProvider';

export function Header() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">MentHunt</span>
          </Link>
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            !pathname.startsWith('/auth') && (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}