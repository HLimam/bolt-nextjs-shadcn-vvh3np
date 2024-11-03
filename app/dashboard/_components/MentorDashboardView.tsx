'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MessageSquare, DollarSign } from 'lucide-react';
import { MentorDashboard } from '@/src/domain/model/Dashboard';

interface MentorDashboardViewProps {
  stats: MentorDashboard;
}

export function MentorDashboardView({ stats }: MentorDashboardViewProps) {
  const overviewStats = [
    {
      label: 'Active Mentees',
      value: stats.activeMentees,
      icon: Users,
      change: '+2 this month',
    },
    {
      label: 'Upcoming Sessions',
      value: stats.upcomingSessions,
      icon: Calendar,
      change: 'Next: Today 2PM',
    },
    {
      label: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      change: '3 new today',
    },
    {
      label: 'Monthly Earnings',
      value: `$${stats.monthlyEarnings}`,
      icon: DollarSign,
      change: '+12% from last month',
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
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 border rounded-lg space-y-4"
                >
                  {/* First Row: Mentee Info */}
                  <div className="flex items-center justify-between">
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
                    <Badge
                      variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                    >
                      {session.status}
                    </Badge>
                  </div>

                  {/* Second Row: Date and Time */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{session.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}