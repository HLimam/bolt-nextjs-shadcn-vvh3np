'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Event } from '@/src/domain/model/Event';
import { EventHero } from './_components/EventHero';
import { EventTabs } from './_components/EventTabs';
import { RegistrationCard } from './_components/RegistrationCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useEvent } from '@/src/providers/EventProvider';

export default function EventPage({ params }: { params: { id: string } }) {
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
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      loadEvent();
    }
  }, [params.id, eventService]);

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8 animate-pulse">
        <div className="h-64 bg-muted rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!event) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <EventHero event={event} />

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EventTabs event={event} />
          </div>
          <div>
            <RegistrationCard event={event} />
          </div>
        </div>
      </div>
    </div>
  );
}