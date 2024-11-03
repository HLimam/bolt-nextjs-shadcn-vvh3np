'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/src/providers/AuthProvider';
import { MyEvents } from './_components/MyEvents';
import { EventsExplorer } from '../explore/_components/EventsExplorer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateDialog } from '@/components/shared/CreateDialog';
import { Card, CardContent } from '@/components/ui/card';
import { CreateEventForm } from './_components/CreateEventForm';

export default function EventsPage() {
  const { user } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const isMentor = user?.role === 'MENTOR';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-muted-foreground">
            {isMentor ? 'Manage your events and discover others' : 'Discover and join events'}
          </p>
        </div>
        {isMentor && (
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        )}
      </div>

      {isMentor ? (
        <Tabs defaultValue="my-events">
          <TabsList>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="discover">Discover Events</TabsTrigger>
          </TabsList>

          <TabsContent value="my-events" className="space-y-6">
            <MyEvents />
          </TabsContent>

          <TabsContent value="discover" className="space-y-6">
            <EventsExplorer />
          </TabsContent>
        </Tabs>
      ) : (
        <EventsExplorer />
      )}

      <CreateDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        title="Create New Event"
      >
        <CardContent>
          <CreateEventForm onSuccess={() => setShowCreateDialog(false)} />
        </CardContent>
      </CreateDialog>
    </div>
  );
}