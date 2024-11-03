'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Target, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface MenteeDashboardProps {
  stats: any;
}

export function MenteeDashboard({ stats }: MenteeDashboardProps) {
  const overviewStats = [
    {
      label: 'Active Programs',
      value: stats.activePrograms,
      change: `${stats.programs.length} total programs`,
      icon: BookOpen,
    },
    {
      label: 'Sessions Completed',
      value: stats.completedSessions,
      change: '24 total hours',
      icon: Calendar,
    },
    {
      label: 'Learning Goals',
      value: `${stats.learningGoals.completed}/${stats.learningGoals.total}`,
      change: '2 in progress',
      icon: Target,
    },
    {
      label: 'Next Session',
      value: stats.nextSession,
      change: 'Tomorrow 3PM',
      icon: Clock,
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
            <CardTitle>Active Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.programs.map((program: any) => (
                <div
                  key={program.id}
                  className="space-y-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={program.mentor.image}
                          alt={program.mentor.name}
                        />
                        <AvatarFallback>
                          {program.mentor.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{program.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Mentor: {program.mentor.name}
                        </p>
                      </div>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Next session:{' '}
                    {new Date(program.nextSession).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/dashboard/programs">View All Programs</Link>
            </Button>
          </CardContent>
        </Card>

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