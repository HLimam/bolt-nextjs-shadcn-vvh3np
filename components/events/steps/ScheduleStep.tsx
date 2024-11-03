'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event } from '@/src/domain/model/Event';

interface ScheduleStepProps {
  data: Partial<Event>;
  onUpdate: (data: Partial<Event>) => void;
}

export function ScheduleStep({ data, onUpdate }: ScheduleStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={data.date ? new Date(data.date).toISOString().split('T')[0] : ''}
            onChange={(e) => onUpdate({ date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={data.time || ''}
            onChange={(e) => onUpdate({ time: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          value={data.duration || ''}
          onChange={(e) => onUpdate({ duration: parseInt(e.target.value) })}
          min={15}
          step={15}
        />
      </div>

      <div className="rounded-lg bg-muted p-4">
        <h4 className="font-medium mb-2">Time Zone Information</h4>
        <p className="text-sm text-muted-foreground">
          All times are shown in your local time zone. Attendees will see the event time converted to their local time zone.
        </p>
      </div>
    </div>
  );
}