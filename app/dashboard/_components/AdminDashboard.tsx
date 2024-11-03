'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

interface AdminDashboardProps {
  stats: any;
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const overviewStats = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      change: stats.monthlyGrowth.users,
      icon: Users,
    },
    {
      label: 'Active Sessions',
      value: stats.activeSessions,
      change: stats.monthlyGrowth.sessions,
      icon: Calendar,
    },
    {
      label: 'Revenue',
      value: `$${stats.revenue}`,
      change: stats.monthlyGrowth.revenue,
      icon: DollarSign,
    },
    {
      label: 'Platform Growth',
      value: `+${stats.platformGrowth}%`,
      change: 'Year over year',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity: any) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.systemStatus).map(([key, value]: [string, any]) => (
                key !== 'lastChecked' && (
                  <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${value === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="capitalize">{key}</span>
                    </div>
                    <Badge variant={value === 'healthy' ? 'default' : 'destructive'}>
                      {value}
                    </Badge>
                  </div>
                )
              ))}
              <p className="text-sm text-muted-foreground text-center">
                Last checked: {new Date(stats.systemStatus.lastChecked).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}