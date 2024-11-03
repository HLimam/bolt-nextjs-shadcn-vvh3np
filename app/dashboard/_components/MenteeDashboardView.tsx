'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calendar, Target, Clock } from 'lucide-react';
import { MenteeDashboard } from '@/src/domain/model/Dashboard';

interface MenteeDashboardViewProps {
  stats: MenteeDashboard;
}

export function MenteeDashboardView({ stats }: MenteeDashboardViewProps) {
  const overviewStats = [
    {
      label: 'Active Programs',
      value: stats.activePrograms,
      icon: BookOpen,
      change: '1 completing soon',
    },
    {
      label: 'Sessions Completed',
      value: stats.completedSessions,
      icon: Calendar,
      change: '24 total hours',
    },
    {
      label: 'Learning Goals',
      value: `${stats.learningGoals.completed}/${stats.learningGoals.total}`,
      icon: Target,
      change: '2 in progress',
    },
    {
      label: 'Next Session',
      value: stats.nextSession.time,
      icon: Clock,
      change: stats.nextSession.date,
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

      <Card>
        <CardHeader>
          <CardTitle>Current Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {stats.currentPrograms.map((program) => (
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
        </CardContent>
      </Card>
    </div>
  );
}