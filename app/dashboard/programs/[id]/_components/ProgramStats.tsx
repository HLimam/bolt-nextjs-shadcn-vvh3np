'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, Clock, BookOpen, Calendar } from 'lucide-react';

interface ProgramStatsProps {
  enrolledMentees: number;
  maxMentees: number;
  duration: string;
  sessionsPerWeek: number;
  progress: number;
}

export function ProgramStats({
  enrolledMentees,
  maxMentees,
  duration,
  sessionsPerWeek,
  progress,
}: ProgramStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>
              {enrolledMentees}/{maxMentees} mentees
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{sessionsPerWeek} sessions/week</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Next session: Tomorrow</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
}