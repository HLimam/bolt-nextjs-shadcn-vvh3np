'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar as CalendarIcon, Users } from 'lucide-react';

interface CalendarEventProps {
  title: string;
  type: 'session' | 'event' | 'program';
  time: string;
  duration: string;
  participants?: number;
}

export function CalendarEvent({
  title,
  type,
  time,
  duration,
  participants,
}: CalendarEventProps) {
  const getTypeColor = () => {
    switch (type) {
      case 'session':
        return 'bg-blue-500';
      case 'event':
        return 'bg-green-500';
      case 'program':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:bg-muted/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`w-1 h-full self-stretch ${getTypeColor()} rounded-full`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-medium truncate">{title}</h3>
              <Badge variant="secondary" className="shrink-0">
                {type}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                <span>{duration}</span>
              </div>
              {participants && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{participants} participants</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}