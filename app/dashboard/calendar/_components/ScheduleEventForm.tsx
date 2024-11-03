'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCalendar } from '@/src/providers/CalendarProvider';
import { useAuth } from '@/src/providers/AuthProvider';
import { toast } from 'sonner';

const scheduleEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  duration: z.string().min(1, 'Duration is required'),
  format: z.enum(['video', 'in-person']),
  location: z.string().optional(),
  participantId: z.string().min(1, 'Participant is required'),
});

type ScheduleEventFormData = z.infer<typeof scheduleEventSchema>;

interface ScheduleEventFormProps {
  selectedDate?: Date;
  onSuccess?: () => void;
}

export function ScheduleEventForm({ selectedDate, onSuccess }: ScheduleEventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const calendarService = useCalendar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ScheduleEventFormData>({
    resolver: zodResolver(scheduleEventSchema),
    defaultValues: {
      date: selectedDate?.toISOString().split('T')[0],
      format: 'video',
    },
  });

  const format = watch('format');

  const onSubmit = async (data: ScheduleEventFormData) => {
    try {
      setIsSubmitting(true);
      const dateTime = new Date(`${data.date}T${data.time}`);
      
      await calendarService.createEvent({
        title: data.title,
        type: 'session',
        date: dateTime.toISOString(),
        duration: parseInt(data.duration),
        format: data.format,
        location: data.location,
        participant: {
          id: data.participantId,
          name: 'John Doe', // This should come from a user lookup
        },
      });

      toast.success('Event scheduled successfully');
      reset();
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to schedule event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Enter event title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            {...register('date')}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            {...register('time')}
          />
          {errors.time && (
            <p className="text-sm text-red-500">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Select onValueChange={(value) => register('duration').onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
          {errors.duration && (
            <p className="text-sm text-red-500">{errors.duration.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Select onValueChange={(value) => register('format').onChange({ target: { value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="video">Video Call</SelectItem>
              <SelectItem value="in-person">In Person</SelectItem>
            </SelectContent>
          </Select>
          {errors.format && (
            <p className="text-sm text-red-500">{errors.format.message}</p>
          )}
        </div>
      </div>

      {format === 'in-person' && (
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            {...register('location')}
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-sm text-red-500">{errors.location.message}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="participantId">Participant</Label>
        <Select onValueChange={(value) => register('participantId').onChange({ target: { value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select participant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">John Doe</SelectItem>
            <SelectItem value="2">Jane Smith</SelectItem>
          </SelectContent>
        </Select>
        {errors.participantId && (
          <p className="text-sm text-red-500">{errors.participantId.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Scheduling...' : 'Schedule'}
        </Button>
      </div>
    </form>
  );
}