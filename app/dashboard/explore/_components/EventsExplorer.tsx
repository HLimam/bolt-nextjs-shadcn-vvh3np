'use client';

import { useState, useEffect } from 'react';
import { useEvent } from '@/src/providers/EventProvider';
import { Event } from '@/src/domain/model/Event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';

export function EventsExplorer() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const eventService = useEvent();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await eventService.searchEvents({});
      setEvents(data);
    } catch (error) {
      console.error('Failed to load events:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      await eventService.registerForEvent(eventId, 'current-user-id');
      toast.success('Successfully registered for event');
      loadEvents();
    } catch (error) {
      toast.error('Failed to register for event');
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
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-8" />
        </div>
      </div>

      <div className="space-y-4">
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
              <div className="flex items-center justify-between">
                <div className="space-y-4 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
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
                  </div>
                </div>
                <div className="ml-8 flex flex-col items-end gap-4">
                  <span className="font-semibold">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </span>
                  <Button 
                    onClick={() => handleRegister(event.id)}
                    disabled={event.spotsLeft === 0}
                  >
                    {event.spotsLeft === 0 ? 'Full' : 'Register'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}