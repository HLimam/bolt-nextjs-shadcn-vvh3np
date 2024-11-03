'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useProgram } from '@/src/providers/ProgramProvider';
import { Program } from '@/src/domain/model/Program';
import { ProgramHero } from './ProgramHero';
import { Curriculum } from './Curriculum';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProgramContentProps {
  id: string;
}

export function ProgramContent({ id }: ProgramContentProps) {
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const programService = useProgram();

  useEffect(() => {
    loadProgram();
  }, [id]);

  const loadProgram = async () => {
    try {
      const data = await programService.getProgramById(id);
      setProgram(data);
    } catch (error) {
      console.error('Failed to load program:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Tabs defaultValue="curriculum" className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum">
            <Curriculum curriculum={program.curriculum} />
          </TabsContent>

          <TabsContent value="mentors">
            <div className="text-center py-12 text-muted-foreground">
              Mentor information coming soon
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-12 text-muted-foreground">
              Reviews coming soon
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}