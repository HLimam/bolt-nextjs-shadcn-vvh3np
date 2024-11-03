'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const mainNavItems = [
  {
    title: 'Find Mentors',
    href: '/mentors',
  },
  {
    title: 'Programs',
    href: '/programs',
  },
  {
    title: 'Events',
    href: '/events',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'About',
    href: '/about',
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex gap-6 items-center">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}