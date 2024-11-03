'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Event } from '@/src/domain/model/Event';
import { useEvent } from '@/src/providers/EventProvider';
import Link from 'next/link';
import { toast } from 'sonner';

interface EventsListProps {
  searchQuery: string;
}

export function EventsList({ searchQuery }: EventsListProps) {
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

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="h-6 w-1/3 bg-muted rounded" />
                <div className="h-4 w-2/3 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No events found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredEvents.map((event) => (
        <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge>{event.type}</Badge>
                    <Badge variant="outline">{event.format}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </div>
                  {event.spotsLeft <= 5 && (
                    <p className="text-sm text-red-500">
                      Only {event.spotsLeft} spots left!
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground">{event.description}</p>

              {/* Event Details */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.format === 'online' ? 'Online Event' : event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{event.spotsLeft} spots available</span>
                </div>
              </div>

              {/* Speaker */}
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={event.speaker.image} alt={event.speaker.name} />
                  <AvatarFallback>{event.speaker.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{event.speaker.name}</p>
                  <p className="text-sm text-muted-foreground">{event.speaker.role}</p>
                </div>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-2">
                {event.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-4">
                  <Button variant="outline">Add to Calendar</Button>
                  <Button variant="outline">Share Event</Button>
                </div>
                <Button asChild disabled={event.spotsLeft === 0}>
                  <Link href={`/events/${event.id}`}>
                    {event.spotsLeft === 0 ? 'Sold Out' : 'Register Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}