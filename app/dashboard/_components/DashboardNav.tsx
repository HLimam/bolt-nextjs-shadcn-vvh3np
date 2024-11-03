'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  DollarSign,
  Settings,
  School,
  Compass,
  Globe,
  FileText,
} from 'lucide-react';

const roleNavItems = {
  MENTOR: [
    { title: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Explore', href: '/dashboard/explore', icon: Compass },
    { title: 'My Mentees', href: '/dashboard/mentees', icon: Users },
    { title: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { title: 'Sessions', href: '/dashboard/sessions', icon: Calendar },
    { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { title: 'My Programs', href: '/dashboard/programs', icon: BookOpen },
    { title: 'Events', href: '/dashboard/events', icon: Globe },
    { title: 'Earnings', href: '/dashboard/earnings', icon: DollarSign },
    { title: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  MENTEE: [
    { title: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Explore', href: '/dashboard/explore', icon: Compass },
    { title: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
    { title: 'Sessions', href: '/dashboard/sessions', icon: Calendar },
    { title: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
    { title: 'My Programs', href: '/dashboard/programs', icon: BookOpen },
    { title: 'Events', href: '/dashboard/events', icon: Globe },
    { title: 'Resources', href: '/dashboard/resources', icon: FileText },
    { title: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
  ADMIN: [
    { title: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Mentors', href: '/dashboard/mentors', icon: School },
    { title: 'Users', href: '/dashboard/users', icon: Users },
    { title: 'Programs', href: '/dashboard/programs', icon: BookOpen },
    { title: 'Events', href: '/dashboard/events', icon: Globe },
    { title: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
};

interface DashboardNavProps {
  role: keyof typeof roleNavItems;
}

export function DashboardNav({ role }: DashboardNavProps) {
  const pathname = usePathname();
  const navItems = roleNavItems[role] || [];

  return (
    <nav className="w-64 min-h-[calc(100vh-4rem)] border-r px-3 py-4">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}