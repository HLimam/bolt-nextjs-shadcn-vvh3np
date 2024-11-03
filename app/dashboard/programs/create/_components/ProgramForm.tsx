'use client';

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
import { CurriculumSection } from './CurriculumSection';
import { FeaturesSection } from './FeaturesSection';

const programSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  topics: z.array(z.string()).min(1, 'At least one topic is required'),
  duration: z.string().min(1, 'Duration is required'),
  price: z.number().min(0, 'Price cannot be negative'),
  curriculum: z.object({
    weeks: z.array(z.object({
      number: z.number(),
      title: z.string(),
      topics: z.array(z.string()),
    })),
  }),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
});

type ProgramFormData = z.infer<typeof programSchema>;

interface ProgramFormProps {
  onSubmit: (data: ProgramFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function ProgramForm({ onSubmit, isSubmitting }: ProgramFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      level: 'intermediate',
      price: 0,
      topics: [],
      features: [],
      curriculum: {
        weeks: [],
      },
    },
  });

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

      <CurriculumSection register={register} errors={errors} setValue={setValue} />
      <FeaturesSection register={register} errors={errors} setValue={setValue} />

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Program'}
        </Button>
      </div>
    </form>
  );
}