'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Event } from '@/src/domain/model/Event';
import { useEvent } from '@/src/providers/EventProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const eventService = useEvent();

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await eventService.getEventById(params.id);
        setEvent(data);
      } catch (error) {
        console.error('Failed to load event:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [params.id, eventService]);

  const handleDelete = async () => {
    if (!event) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (!confirmed) return;

    try {
      // Add delete functionality here
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-muted-foreground mt-2">{event.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/events/${event.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Event
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Event
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="attendees">Attendees</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.format === 'online' ? 'Online Event' : event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{event.spotsLeft} spots left</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge>{event.type}</Badge>
                <Badge variant="outline">{event.format}</Badge>
                {event.topics.map((topic) => (
                  <Badge key={topic} variant="secondary">{topic}</Badge>
                ))}
              </div>

              {event.agenda && event.agenda.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Agenda</h3>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                        <div className="font-medium min-w-[100px]">{item.time}</div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {event.speaker && (
            <Card>
              <CardHeader>
                <CardTitle>Speaker Information</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <img
                  src={event.speaker.image}
                  alt={event.speaker.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{event.speaker.name}</h3>
                  <p className="text-muted-foreground">{event.speaker.role}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="attendees">
          <Card>
            <CardHeader>
              <CardTitle>Registered Attendees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {event.registrations.length} people have registered for this event
              </p>
              {/* Add attendee list component here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Event Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{event.registrations.length}</div>
                  <div className="text-sm text-muted-foreground">Total Registrations</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{event.spotsLeft}</div>
                  <div className="text-sm text-muted-foreground">Spots Remaining</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold">${event.price}</div>
                  <div className="text-sm text-muted-foreground">Ticket Price</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}