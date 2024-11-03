'use client';

import { useState, useEffect } from 'react';
import { useEvent } from '@/src/providers/EventProvider';
import { Event } from '@/src/domain/model/Event';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/src/providers/AuthProvider';
import { toast } from 'sonner';

export function MyEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const eventService = useEvent();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      loadEvents();
    }
  }, [user?.id]);

  const loadEvents = async () => {
    try {
      // In a real app, we would filter events by creator
      const data = await eventService.searchEvents({});
      setEvents(data.filter(event => event.createdBy.id === user?.id));
    } catch (error) {
      console.error('Failed to load events:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id} className="w-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    by {event.speaker.name}
                  </p>
                </div>
                <Badge>{event.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {event.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{event.format === 'online' ? 'Online Event' : event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{event.spotsLeft} spots left</span>
                </div>
                <div className="ml-auto font-semibold">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/events/${event.id}`}>
                    View Details
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/events/${event.id}/edit`}>
                    Edit
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No events yet</h3>
          <p className="text-muted-foreground mb-4">Create your first event to get started</p>
        </div>
      )}
    </div>
  );
}