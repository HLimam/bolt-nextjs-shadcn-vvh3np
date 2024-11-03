'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/src/providers/AuthProvider';
import { CreateDialog } from '@/components/shared/CreateDialog';
import { DailySchedule } from './_components/DailySchedule';
import { UpcomingEvents } from './_components/UpcomingEvents';
import { ScheduleEventForm } from './_components/ScheduleEventForm';
import { CreateProgramForm } from '../programs/_components/CreateProgramForm';

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [showProgramDialog, setShowProgramDialog] = useState(false);
  const { user } = useAuth();
  const isMentor = user?.role === 'MENTOR';

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>

        {isMentor && (
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setShowSessionDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
            <Button onClick={() => setShowScheduleDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Event
            </Button>
            <Button onClick={() => setShowProgramDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Program
            </Button>
          </div>
        )}
      </div>

      {/* Calendar Section */}
      <Card>
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Content Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingEvents />
        <DailySchedule selectedDate={date} />
      </div>

      {/* Dialogs */}
      <CreateDialog
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        title="Schedule New Event"
      >
        <CardContent>
          <ScheduleEventForm
            selectedDate={date}
            onSuccess={() => setShowScheduleDialog(false)}
          />
        </CardContent>
      </CreateDialog>

      <CreateDialog
        open={showSessionDialog}
        onOpenChange={setShowSessionDialog}
        title="Schedule New Session"
      >
        <CardContent>
          <ScheduleEventForm
            selectedDate={date}
            onSuccess={() => setShowSessionDialog(false)}
          />
        </CardContent>
      </CreateDialog>

      <CreateDialog
        open={showProgramDialog}
        onOpenChange={setShowProgramDialog}
        title="Schedule New Program"
      >
        <CardContent>
          <CreateProgramForm onSuccess={() => setShowProgramDialog(false)} />
        </CardContent>
      </CreateDialog>
    </div>
  );
}