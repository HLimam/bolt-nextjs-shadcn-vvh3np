'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useProgram } from '@/src/providers/ProgramProvider';
import { Program } from '@/src/domain/model/Program';
import { ProgramHero } from './_components/ProgramHero';
import { ProgramTabs } from './_components/ProgramTabs';
import { EnrollmentCard } from './_components/EnrollmentCard';
import { Skeleton } from '@/components/ui/skeleton';

// Add mock data for the enhanced curriculum
const mockTopicDetails = [
  {
    title: 'Introduction to Core Concepts',
    description: 'Learn the fundamental principles and core concepts of the topic',
    duration: '45 mins',
    type: 'video',
    resources: ['Video Tutorial', 'Slides', 'Documentation'],
    learningObjectives: [
      'Understand basic principles',
      'Learn key terminology',
      'Identify common use cases',
      'Master core concepts'
    ]
  },
  {
    title: 'Hands-on Practice',
    description: 'Apply your knowledge through practical exercises',
    duration: '1.5 hours',
    type: 'exercise',
    resources: ['Exercise Files', 'Solution Guide', 'Best Practices Doc'],
    learningObjectives: [
      'Implement basic features',
      'Debug common issues',
      'Write clean code',
      'Follow best practices'
    ]
  },
  {
    title: 'Real-world Project',
    description: 'Build a complete project using learned concepts',
    duration: '2 hours',
    type: 'project',
    resources: ['Project Template', 'Requirements Doc', 'Code Examples'],
    learningObjectives: [
      'Design system architecture',
      'Implement features',
      'Handle edge cases',
      'Deploy solution'
    ]
  }
];

export default function ProgramPage({ params }: { params: { id: string } }) {
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const programService = useProgram();

  useEffect(() => {
    const loadProgram = async () => {
      try {
        const data = await programService.getProgramById(params.id);
        // Enhance the curriculum with mock topic details
        const enhancedProgram = {
          ...data,
          curriculum: {
            ...data.curriculum,
            weeks: data.curriculum.weeks.map(week => ({
              ...week,
              description: `Master ${week.title} through comprehensive learning modules`,
              duration: '8 hours',
              topicDetails: mockTopicDetails,
              projectDescription: `Build a complete ${week.title.toLowerCase()} application implementing all concepts learned this week`
            }))
          }
        };
        setProgram(enhancedProgram);
      } catch (error) {
        console.error('Failed to load program:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgram();
  }, [params.id, programService]);

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

  if (!program) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <ProgramHero program={program} />

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProgramTabs program={program} />
          </div>
          <div>
            <EnrollmentCard program={program} />
          </div>
        </div>
      </div>
    </div>
  );
}