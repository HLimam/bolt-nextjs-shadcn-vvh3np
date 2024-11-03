'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Event } from '@/src/domain/model/Event';
import { useEvent } from '@/src/providers/EventProvider';
import { EventForm } from './_components/EventForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function EditEventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
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

  const handleSubmit = async (data: Partial<Event>) => {
    try {
      // Add update functionality here
      toast.success('Event updated successfully');
      router.push('/dashboard/events');
    } catch (error) {
      toast.error('Failed to update event');
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
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Event</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm event={event} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}