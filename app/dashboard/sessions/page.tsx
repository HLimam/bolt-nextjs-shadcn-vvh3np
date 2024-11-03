'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const sessions = [
  {
    id: '1',
    mentee: {
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop',
    },
    date: '2024-03-01T10:00:00Z',
    duration: 60,
    type: 'video',
    status: 'upcoming',
    topic: 'React Performance Optimization',
  },
  {
    id: '2',
    mentee: {
      name: 'Michael Brown',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&auto=format&fit=crop',
    },
    date: '2024-03-02T15:00:00Z',
    duration: 45,
    type: 'video',
    status: 'upcoming',
    topic: 'JavaScript Fundamentals',
  },
  {
    id: '3',
    mentee: {
      name: 'Alex Thompson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop',
    },
    date: '2024-02-28T14:00:00Z',
    duration: 60,
    type: 'video',
    status: 'completed',
    topic: 'Code Review Session',
  },
];

export default function SessionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <Button>Schedule Session</Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6 mt-6">
          {sessions
            .filter((session) => session.status === 'upcoming')
            .map((session) => (
              <Card key={session.id}>
                <CardContent className="flex items-center gap-6 py-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.mentee.image} alt={session.mentee.name} />
                    <AvatarFallback>{session.mentee.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-semibold">{session.topic}</h3>
                    <p className="text-sm text-muted-foreground">with {session.mentee.name}</p>
                  </div>

                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      <span>Video Call</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Reschedule</Button>
                    <Button size="sm">Join Session</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6 mt-6">
          {sessions
            .filter((session) => session.status === 'completed')
            .map((session) => (
              <Card key={session.id}>
                <CardContent className="flex items-center gap-6 py-6">
                  {/* Similar structure to upcoming sessions */}
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}