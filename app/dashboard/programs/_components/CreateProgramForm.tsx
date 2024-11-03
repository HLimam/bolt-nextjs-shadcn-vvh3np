'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const programSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  topics: z.array(z.string()).min(1, 'At least one topic is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().min(0, 'Price cannot be negative'),
  maxMentees: z.number().min(1, 'Maximum mentees must be at least 1'),
  sessionsPerWeek: z.number().min(1, 'Must have at least 1 session per week'),
});

type ProgramFormData = z.infer<typeof programSchema>;

interface CreateProgramFormProps {
  onSuccess: () => void;
}

export function CreateProgramForm({ onSuccess }: CreateProgramFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      level: 'intermediate',
      price: 0,
      maxMentees: 10,
      sessionsPerWeek: 1,
      topics: [],
    },
  });

  const onSubmit = async (data: ProgramFormData) => {
    try {
      setIsSubmitting(true);
      // Here you would typically make an API call to create the program
      // await programService.createProgram(data);
      toast.success('Program created successfully');
      onSuccess();
      router.refresh();
    } catch (error) {
      toast.error('Failed to create program');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Program Title</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Enter program title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Describe your program..."
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Select
            onValueChange={(value) => setValue('level', value as any)}
            defaultValue="intermediate"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          {errors.level && (
            <p className="text-sm text-red-500">{errors.level.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            {...register('duration')}
            placeholder="e.g., 12 weeks"
          />
          {errors.duration && (
            <p className="text-sm text-red-500">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maxMentees">Maximum Mentees</Label>
          <Input
            id="maxMentees"
            type="number"
            {...register('maxMentees', { valueAsNumber: true })}
          />
          {errors.maxMentees && (
            <p className="text-sm text-red-500">{errors.maxMentees.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessionsPerWeek">Sessions per Week</Label>
          <Input
            id="sessionsPerWeek"
            type="number"
            {...register('sessionsPerWeek', { valueAsNumber: true })}
          />
          {errors.sessionsPerWeek && (
            <p className="text-sm text-red-500">{errors.sessionsPerWeek.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Program'}
        </Button>
      </div>
    </form>
  );
}