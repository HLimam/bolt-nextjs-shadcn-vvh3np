'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UpcomingEvent {
  id: string;
  title: string;
  type: 'session' | 'event' | 'program';
  date: string;
  time: string;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'React Performance Workshop',
    type: 'event',
    date: '2024-03-01',
    time: '10:00 AM',
  },
  {
    id: '2',
    title: 'Mentoring Session with Sarah',
    type: 'session',
    date: '2024-03-01',
    time: '2:00 PM',
  },
  {
    id: '3',
    title: 'Frontend Development Program',
    type: 'program',
    date: '2024-03-01',
    time: '4:00 PM',
  },
];

export function UpcomingEvents() {
  const getTypeColor = (type: string) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="px-4 pb-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              >
                <div className={`w-1 h-12 rounded-full ${getTypeColor(event.type)} self-stretch`} />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <time>{new Date(event.date).toLocaleDateString()}</time>
                    <span>•</span>
                    <time>{event.time}</time>
                  </div>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}