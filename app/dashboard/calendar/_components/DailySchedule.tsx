'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarEvent } from './CalendarEvent';

interface DailyScheduleProps {
  selectedDate: Date;
}

export function DailySchedule({ selectedDate }: DailyScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            <CalendarEvent
              title="React Performance Workshop"
              type="event"
              time="10:00 AM"
              duration="2 hours"
              participants={15}
            />
            <CalendarEvent
              title="Mentoring Session with Sarah"
              type="session"
              time="2:00 PM"
              duration="1 hour"
            />
            <CalendarEvent
              title="Frontend Development Program"
              type="program"
              time="4:00 PM"
              duration="1.5 hours"
              participants={8}
            />
          </TabsContent>

          <TabsContent value="sessions" className="mt-4 space-y-4">
            <CalendarEvent
              title="Mentoring Session with Sarah"
              type="session"
              time="2:00 PM"
              duration="1 hour"
            />
          </TabsContent>

          <TabsContent value="events" className="mt-4 space-y-4">
            <CalendarEvent
              title="React Performance Workshop"
              type="event"
              time="10:00 AM"
              duration="2 hours"
              participants={15}
            />
          </TabsContent>

          <TabsContent value="programs" className="mt-4 space-y-4">
            <CalendarEvent
              title="Frontend Development Program"
              type="program"
              time="4:00 PM"
              duration="1.5 hours"
              participants={8}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}