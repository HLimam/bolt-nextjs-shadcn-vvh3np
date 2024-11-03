'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Availability } from '@/src/domain/model/Mentor';
import { Clock } from 'lucide-react';

interface MentorAvailabilityProps {
  availability: Availability[];
}

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export function MentorAvailability({ availability }: MentorAvailabilityProps) {
  const sortedAvailability = [...availability].sort((a, b) => a.dayOfWeek - b.dayOfWeek);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {sortedAvailability.map((slot) => (
        <Card key={`${slot.dayOfWeek}-${slot.startTime}`} className="group hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{daysOfWeek[slot.dayOfWeek]}</h3>
                <p className="text-sm text-muted-foreground">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}