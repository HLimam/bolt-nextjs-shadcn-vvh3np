'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProgramsExplorer } from './_components/ProgramsExplorer';
import { EventsExplorer } from './_components/EventsExplorer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateDialog } from '@/components/shared/CreateDialog';
import { CreateEventForm } from '../events/_components/CreateEventForm';
import { CreateProgramForm } from '../programs/_components/CreateProgramForm';
import { CardContent } from '@/components/ui/card';

export default function ExplorePage() {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateProgram, setShowCreateProgram] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-muted-foreground">Discover programs and events from other mentors</p>
      </div>

      <Tabs defaultValue="programs">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button onClick={() => setShowCreateProgram(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
            <Button onClick={() => setShowCreateEvent(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        <TabsContent value="programs" className="space-y-6">
          <ProgramsExplorer />
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <EventsExplorer />
        </TabsContent>
      </Tabs>

      {/* Create Event Dialog */}
      <CreateDialog 
        open={showCreateEvent} 
        onOpenChange={setShowCreateEvent}
        title="Create New Event"
      >
        <CardContent>
          <CreateEventForm onSuccess={() => setShowCreateEvent(false)} />
        </CardContent>
      </CreateDialog>

      {/* Create Program Dialog */}
      <CreateDialog 
        open={showCreateProgram} 
        onOpenChange={setShowCreateProgram}
        title="Create New Program"
      >
        <CardContent>
          <CreateProgramForm onSuccess={() => setShowCreateProgram(false)} />
        </CardContent>
      </CreateDialog>
    </div>
  );
}