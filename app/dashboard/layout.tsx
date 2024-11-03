'use client';

import { useAuth } from '@/src/providers/AuthProvider';
import { Sidebar } from './_components/Sidebar';
import { DashboardHeader } from './_components/DashboardHeader';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden">
        <div className="h-16 border-b px-4 flex items-center justify-between">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="font-semibold">MentHunt</span>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="hidden lg:block">
            <DashboardHeader />
          </div>
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}