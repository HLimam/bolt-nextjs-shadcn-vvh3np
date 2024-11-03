'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

interface EventAgendaProps {
  agenda: AgendaItem[];
}

export function EventAgenda({ agenda = [] }: EventAgendaProps) {
  if (agenda.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Agenda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {agenda.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{item.time}</p>
                <div className="w-2 h-2 rounded-full bg-primary/50" />
                <p className="font-medium">{item.title}</p>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}