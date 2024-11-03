'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/src/providers/AuthProvider';
import { useDashboard } from '@/src/providers/DashboardProvider';
import { MentorDashboard, MenteeDashboard, AdminDashboard } from '@/src/domain/model/Dashboard';
import { MentorDashboardView } from './MentorDashboardView';
import { MenteeDashboardView } from './MenteeDashboardView';
import { AdminDashboardView } from './AdminDashboardView';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function DashboardOverview() {
  const { user } = useAuth();
  const dashboard = useDashboard();
  const [stats, setStats] = useState<MentorDashboard | MenteeDashboard | AdminDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      try {
        let data = null;
        switch (user.role) {
          case 'MENTOR':
            data = await dashboard.getMentorStats(user.id);
            break;
          case 'MENTEE':
            data = await dashboard.getMenteeStats(user.id);
            break;
          case 'ADMIN':
            data = await dashboard.getAdminStats(user.id);
            break;
        }
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [user, dashboard]);

  if (!user?.role || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No dashboard data available</p>
      </Card>
    );
  }

  const dashboardComponents = {
    MENTOR: () => <MentorDashboardView stats={stats as MentorDashboard} />,
    MENTEE: () => <MenteeDashboardView stats={stats as MenteeDashboard} />,
    ADMIN: () => <AdminDashboardView stats={stats as AdminDashboard} />,
  };

  const DashboardComponent = dashboardComponents[user.role as keyof typeof dashboardComponents];
  return <DashboardComponent />;
}