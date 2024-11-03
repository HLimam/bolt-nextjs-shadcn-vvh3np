'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Event } from '@/src/domain/model/Event';
import { EventDetails } from './EventDetails';
import { EventAgenda } from './EventAgenda';
import { EventSpeaker } from './EventSpeaker';
import { EventRequirements } from './EventRequirements';

interface EventTabsProps {
  event: Event;
}

export function EventTabs({ event }: EventTabsProps) {
  if (!event) return null;

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="agenda">Agenda</TabsTrigger>
        <TabsTrigger value="speaker">Speaker</TabsTrigger>
        <TabsTrigger value="requirements">Requirements</TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-6">
        <EventDetails event={event} />
      </TabsContent>

      <TabsContent value="agenda" className="mt-6">
        <EventAgenda agenda={event.agenda || []} />
      </TabsContent>

      <TabsContent value="speaker" className="mt-6">
        {event.speaker && <EventSpeaker speaker={event.speaker} />}
      </TabsContent>

      <TabsContent value="requirements" className="mt-6">
        <EventRequirements requirements={event.requirements || []} />
      </TabsContent>
    </Tabs>
  );
}