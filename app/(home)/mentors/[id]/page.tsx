'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useMentor } from '@/src/providers/MentorProvider';
import { Mentor } from '@/src/domain/model/Mentor';
import { MentorProfile } from './_components/MentorProfile';
import { MentorPrograms } from './_components/MentorPrograms';
import { MentorReviews } from './_components/MentorReviews';
import { MentorAvailability } from './_components/MentorAvailability';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function MentorPage({ params }: { params: { id: string } }) {
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mentorService = useMentor();

  useEffect(() => {
    const loadMentor = async () => {
      try {
        const data = await mentorService.getMentorById(params.id);
        setMentor(data);
      } catch (error) {
        console.error('Failed to load mentor:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMentor();
  }, [params.id, mentorService]);

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

  if (!mentor) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <MentorProfile mentor={mentor} />

      <div className="container py-8">
        <Tabs defaultValue="programs" className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-6">
            <MentorPrograms programs={mentor.programs} />
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <MentorReviews reviews={mentor.reviews} />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <MentorAvailability availability={mentor.availability} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}