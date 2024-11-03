'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/src/providers/AuthProvider';
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
  PenTool,
} from 'lucide-react';

const roleBasedNavItems = {
  MENTOR: [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/explore', label: 'Explore', icon: Compass },
    { href: '/dashboard/mentees', label: 'My Mentees', icon: Users },
    { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
    { href: '/dashboard/sessions', label: 'Sessions', icon: Calendar },
    { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/programs', label: 'My Programs', icon: BookOpen },
    { href: '/dashboard/events', label: 'Events', icon: Globe },
    { href: '/dashboard/blogs', label: 'Blogs', icon: PenTool },
    { href: '/dashboard/earnings', label: 'Earnings', icon: DollarSign },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ],
  MENTEE: [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/explore', label: 'Explore', icon: Compass },
    { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar },
    { href: '/dashboard/sessions', label: 'Sessions', icon: Calendar },
    { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/programs', label: 'My Programs', icon: BookOpen },
    { href: '/dashboard/events', label: 'Events', icon: Globe },
    { href: '/dashboard/resources', label: 'Resources', icon: FileText },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ],
  ADMIN: [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/mentors', label: 'Mentors', icon: School },
    { href: '/dashboard/users', label: 'Users', icon: Users },
    { href: '/dashboard/programs', label: 'Programs', icon: BookOpen },
    { href: '/dashboard/events', label: 'Events', icon: Globe },
    { href: '/dashboard/blogs', label: 'Blogs', icon: PenTool },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ],
};

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user?.role) return null;

  const navItems = roleBasedNavItems[user.role as keyof typeof roleBasedNavItems];

  return (
    <div className="w-64 border-r bg-muted/10 py-8">
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold">MentHunt</h1>
      </div>
      <nav className="space-y-2 px-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}