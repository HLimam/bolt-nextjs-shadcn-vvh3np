'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MessageSquare, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface MentorDashboardProps {
  stats: any;
}

export function MentorDashboard({ stats }: MentorDashboardProps) {
  if (!stats) return null;

  const overviewStats = [
    {
      label: 'Active Mentees',
      value: stats.activeMentees,
      change: '+2 this month',
      icon: Users,
    },
    {
      label: 'Upcoming Sessions',
      value: stats.upcomingSessions,
      change: `Next: ${stats.nextSession}`,
      icon: Calendar,
    },
    {
      label: 'Unread Messages',
      value: stats.unreadMessages,
      change: '3 new today',
      icon: MessageSquare,
    },
    {
      label: 'Monthly Earnings',
      value: `$${stats.monthlyEarnings}`,
      change: stats.monthlyGrowth,
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
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
        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentSessions.map((session: any) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={session.mentee.image}
                        alt={session.mentee.name}
                      />
                      <AvatarFallback>
                        {session.mentee.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.mentee.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.topic}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">
                      {new Date(session.date).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                    <Badge
                      variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                      className="mt-2"
                    >
                      {session.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/dashboard/sessions">View All Sessions</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
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
      </div>
    </div>
  );
}